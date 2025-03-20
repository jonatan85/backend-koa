import mongoose from 'mongoose';

const ingredientsSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        price: { type: Number, required: true},
        account: { type: Number},
        picture: String,
    },
    {
        timestamps: true
    }
)

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

export default Ingredients;