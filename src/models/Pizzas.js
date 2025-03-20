import mongoose from 'mongoose';

const pizzasSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        mass: { type: [String], enum: ["fina", "normal"] },
        size: { type: [String], enum: ["pequeña", "mediana", "familiar"]},
        dip: {type: [String], enum: ["barbacoa", "carbonara", "tomate", "napolitana"]},
        ingredients: [{type: mongoose.Types.ObjectId, required: true, ref:"Ingredients"}],
        price: { type: Number, required: true},
        account: {type: Number},
        picture: String,
        isCustom: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

const Pizzas = mongoose.model('Pizzas', pizzasSchema);

export default Pizzas;
