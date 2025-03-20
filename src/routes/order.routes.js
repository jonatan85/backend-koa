import Router from '@koa/router';
import Order from '../models/Order.js';
import Pizzas from '../models/Pizzas.js';
import UserDos from '../models/UserDos.js';

const router = new Router({ prefix: '/orders' });

router.post('/', async (ctx) => {
    try {
        const { user, pizzas, total } = ctx.request.body;

        const foundUser = await UserDos.findById(user);
        if (!foundUser) {
            ctx.status = 404;
            ctx.body = { message: 'Usuario no encontrado' };
            return;
        }

        let orderPizzas = [];

        for (const item of pizzas) {
            let pizzaId = item.pizza;

            if (typeof item.pizza === 'object') {
                const newPizza = new Pizzas({ ...item.pizza, isCustom: true });
                const savedPizza = await newPizza.save();
                pizzaId = savedPizza._id;
            }

            orderPizzas.push({
                pizza: pizzaId,
                quantity: item.quantity,
                subtotal: item.quantity * (item.pizza.price || 0)
            });
        }

        const newOrder = new Order({ user, pizzas: orderPizzas, total });
        const savedOrder = await newOrder.save();

        if (!savedOrder) {
            ctx.status = 500;
            ctx.body = { message: "Error inesperado al guardar la orden" };
            return;
        }

        ctx.status = 201;
        ctx.body = { message: "Pedido guardado con éxito", order: savedOrder };
    } catch (error) {
        console.error("❌ Error en el servidor:", error);
        ctx.status = 500;
        ctx.body = { message: 'Error al crear la comanda', error };
    }
});

router.post('/dos', async (ctx) => {
    try {
        const { user, items, total } = ctx.request.body;

        if (!user || !items || !total) {
            ctx.status = 400;
            ctx.body = { message: "Faltan campos obligatorios" };
            return;
        }

        const itemsWithPizzas = await Promise.all(
            items.map(async (item) => {
                if (typeof item.pizza === "string") {
                    return { pizza: item.pizza, quantity: item.quantity };
                } else {
                    const newPizza = new Pizzas({ ...item.pizza, isCustom: true });
                    const savedPizza = await newPizza.save();
                    return { pizza: savedPizza._id, quantity: item.quantity };
                }
            })
        );

        const newOrder = new Order({ user, items: itemsWithPizzas, total });
        const createdOrder = await newOrder.save();
        ctx.status = 201;
        ctx.body = createdOrder;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Error al crear la orden', details: err.message };
    }
});

router.get('/', async (ctx) => {
    try {
        const orders = await Order.find()
            .populate('user', 'email name')
            .populate('pizzas.pizza', 'name price');
        ctx.status = 200;
        ctx.body = orders;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error al obtener las comandas', error };
    }
});

router.get('/:id', async (ctx) => {
    try {
        const order = await Order.findById(ctx.params.id)
            .populate('user', 'email name')
            .populate('pizzas.pizza', 'name price');
        if (!order) {
            ctx.status = 404;
            ctx.body = { message: 'Comanda no encontrada' };
            return;
        }
        ctx.status = 200;
        ctx.body = order;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error al obtener la comanda', error };
    }
});

export default router;