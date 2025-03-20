import Router from '@koa/router';
import Ingredients from '../models/Ingredients.js';

const ingredientsRouter = new Router({ prefix: '/ingredients' });

ingredientsRouter.get('/', async (ctx) => {
    try {
        const ingredients = await Ingredients.find();
        ctx.status = 200;
        ctx.body = ingredients;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener los ingredientes', details: err.message };
    }
});

ingredientsRouter.get('/:id', async (ctx) => {
    try {
        const ingredient = await Ingredients.findById(ctx.params.id);
        if (!ingredient) {
            ctx.status = 404;
            ctx.body = { error: 'El ingrediente no existe.' };
            return;
        }
        ctx.status = 200;
        ctx.body = ingredient;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al obtener el ingrediente', details: err.message };
    }
});

ingredientsRouter.post('/', async (ctx) => {
    try {
        const newIngredient = new Ingredients(ctx.request.body);
        const createdIngredient = await newIngredient.save();
        ctx.status = 201;
        ctx.body = createdIngredient;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al crear el ingrediente', details: err.message };
    }
});

ingredientsRouter.post('/multiples-ingredients', async (ctx) => {
    try {
        if (!Array.isArray(ctx.request.body)) {
            ctx.status = 400;
            ctx.body = { error: "Se esperaba un array de ingredientes." };
            return;
        }

        const invalidIngredients = ctx.request.body.filter(ingredient =>
            !ingredient.name ||
            typeof ingredient.price !== 'number' ||
            !Number.isInteger(ingredient.price) ||
            ingredient.price < 1 ||
            ingredient.price > 4
        );

        if (invalidIngredients.length > 0) {
            ctx.status = 400;
            ctx.body = { error: "Cada ingrediente debe tener un nombre y un precio válido entre 1 y 4." };
            return;
        }

        const existingNames = await Ingredients.find({ name: { $in: ctx.request.body.map(i => i.name) } });
        if (existingNames.length > 0) {
            ctx.status = 400;
            ctx.body = { error: "Algunos ingredientes ya existen.", existing: existingNames.map(i => i.name) };
            return;
        }

        const newIngredients = await Ingredients.insertMany(ctx.request.body);
        ctx.status = 201;
        ctx.body = { message: "Ingredientes creados con éxito", count: newIngredients.length, newIngredients };
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al crear múltiples ingredientes', details: err.message };
    }
});

ingredientsRouter.put('/:id', async (ctx) => {
    try {
        const updatedIngredient = await Ingredients.findByIdAndUpdate(
            ctx.params.id,
            ctx.request.body,
            { new: true }
        );

        if (!updatedIngredient) {
            ctx.status = 404;
            ctx.body = { error: 'El ingrediente no existe.' };
            return;
        }

        ctx.status = 200;
        ctx.body = updatedIngredient;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al actualizar el ingrediente', details: err.message };
    }
});

ingredientsRouter.delete('/:id', async (ctx) => {
    try {
        const deletedIngredient = await Ingredients.findByIdAndDelete(ctx.params.id);
        if (!deletedIngredient) {
            ctx.status = 404;
            ctx.body = { error: 'El ingrediente no existe.' };
            return;
        }

        ctx.status = 200;
        ctx.body = { message: 'El ingrediente se ha eliminado correctamente.' };
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al eliminar el ingrediente', details: err.message };
    }
});

export default ingredientsRouter;