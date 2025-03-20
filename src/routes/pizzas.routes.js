import Router from '@koa/router';
import Pizzas from '../models/Pizzas.js';
import mongoose from 'mongoose';




const pizzasRouter = new Router({ prefix: '/pizzas' });

pizzasRouter.get("/", async (ctx) => {
  try {
    const pizzas = await Pizzas.find({
      $or: [{ isCustom: false }, { isCustom: { $exists: false } }]
    }).populate("ingredients");

    ctx.status = 200;
    ctx.body = pizzas;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener las pizzas', details: err.message };
  }
});


pizzasRouter.get('/:id', async (ctx) => {
  try {
    const pizza = await Pizzas.findById(ctx.params.id);
    if(!pizza) {
      ctx.status = 404;
      ctx.body = { error: 'Pizza no encontrada' };
      return;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener la pizza', details: error.message };
  }
});

pizzasRouter.post("/", async (ctx) => {
  try {

    const { name, price, ingredients } = ctx.request.body;

    if (!name || typeof name !== "string") {
      ctx.status(400);
      ctx.body = { error: "El nombre de la pizza es obligatorio y debe ser un string." };
      return;
    }

    if (!price || typeof price !== "number") {
      ctx.status(400)
      ctx.body = { error: "El precio es obligatorio y debe ser un número." };
      return;
    }

    if (!Array.isArray(ingredients) || ingredients.length < 1) {
      ctx.status(400);
      ctx.body = { error: "Debe haber al menos un ingrediente en la pizza." };
      return;
    }

    const ingredientIds = ingredients.map(id => mongoose.Types.ObjectId.createFromHexString(id));

    const newPizza = new Pizzas({ ...ctx.body, ingredients: ingredientIds });
    const savedPizza = await newPizza.save();

    ctx.status = 201;
    ctx.body = savedPizza;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al crear la pizza', details: err.message };
  }
});

pizzasRouter.put('/:id', async (ctx) => {
  try {
      const id = ctx.params.id;
      const updates = ctx.request.body;

      const pizza = await Pizzas.findById(id);
      if (!pizza) {
          ctx.status = 404;
          ctx.body = { error: 'Pizza no encontrada' };
          return;
      }

      const updatedPizza = await Pizzas.findByIdAndUpdate(id, updates, { new: true });
      ctx.status = 200;
      ctx.body = {
          message: 'Pizza actualizada con éxito',
          pizza: updatedPizza
      };
  } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Error al actualizar la pizza', details: err.message };
  }
});

pizzasRouter.put('/add-ingredients', async (ctx) => {
  try {
      const { pizzasId, ingredientsId } = ctx.request.body;

      if (!pizzasId) {
          ctx.status = 400;
          ctx.body = { error: 'Se necesita un id de pizza para añadir ingredientes' };
          return;
      }
      if (!ingredientsId) {
          ctx.status = 400;
          ctx.body = { error: 'Se necesita un id de ingrediente para añadirlo a la pizza' };
          return;
      }

      const updatedPizza = await Pizzas.findByIdAndUpdate(
          pizzasId,
          { $push: { ingredients: ingredientsId } },
          { new: true }
      );

      ctx.status = 200;
      ctx.body = updatedPizza;
  } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Error al agregar ingredientes', details: err.message };
  }
});

pizzasRouter.put('/multiples-update', async (ctx) => {
  try {
      if (!Array.isArray(ctx.request.body)) {
          ctx.status = 400;
          ctx.body = { error: "Se esperaba un array de pizzas." };
          return;
      }

      const updatePromises = ctx.request.body.map(async (pizzaData) => {
          const { _id, ...updateFields } = pizzaData;

          if (!_id) {
              throw new Error("Cada objeto debe contener el ID de la pizza a actualizar.");
          }

          return await Pizzas.findByIdAndUpdate(_id, updateFields, { new: true });
      });

      const updatedPizzas = await Promise.all(updatePromises);

      ctx.status = 200;
      ctx.body = { message: "Pizzas actualizadas con éxito", updatedPizzas };
  } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Error al actualizar múltiples pizzas', details: err.message };
  }
});

pizzasRouter.delete('/:id', async (ctx) => {
  try {
      const pizza = await Pizzas.findByIdAndDelete(ctx.params.id);
      if (!pizza) {
          ctx.status = 404;
          ctx.body = { error: 'Pizza no encontrada' };
          return;
      }
      ctx.status = 200;
      ctx.body = { message: 'Pizza eliminada correctamente' };
  } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Error al eliminar la pizza', details: err.message };
  }
});

pizzasRouter.delete('/delete-many', async (ctx) => {
  try {
      const { pizzaIds } = ctx.request.body;

      if (!Array.isArray(pizzaIds) || pizzaIds.length === 0) {
          ctx.status = 400;
          ctx.body = { error: 'Debes proporcionar un array de IDs válido.' };
          return;
      }

      const result = await Pizzas.deleteMany({ _id: { $in: pizzaIds } });

      if (result.deletedCount === 0) {
          ctx.status = 404;
          ctx.body = { error: 'No se encontraron pizzas con los IDs proporcionados.' };
          return;
      }

      ctx.status = 200;
      ctx.body = { message: 'Pizzas eliminadas con éxito.', deletedCount: result.deletedCount };
  } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al eliminar múltiples pizzas', details: error.message };
  }
});

export default pizzasRouter;