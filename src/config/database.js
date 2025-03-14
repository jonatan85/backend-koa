import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URL; 
    if (!dbURI) throw new Error('❌ No se encontró DATABASE_URL en .env');

    await mongoose.connect(dbURI);

    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
