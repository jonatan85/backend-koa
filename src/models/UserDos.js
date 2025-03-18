import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userDosSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
    unique: true,  
    trim: true,
    lowercase: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'El email no tiene un formato válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: { 
    type: String,
    trim: true,
    maxlength: 50
  },
  surnames: { 
    type: String,
    trim: true,
    maxlength: 100
  },
  address: { 
    type: String,
    trim: true,
    maxlength: 200
  },
  postalCode: { 
    type: String,
    trim: true,
    match: [/^\d{5}$/, 'El código postal debe tener 5 dígitos']
  },
  city: { 
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String, 
    trim: true,
    match: [/^\d{9}$/, 'El número de teléfono debe tener 9 dígitos']
  },
  avatar: { 
    type: String,  // URL de la imagen de perfil en Cloudinary
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'moderador', 'admin', 'superadmin'],
    default: 'user'
  },
}, {
  timestamps: true
});

// 🔒 Encriptar contraseña antes de guardar
userDosSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Método para comparar contraseñas
userDosSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserDos = mongoose.model('UserDos', userDosSchema);
export default UserDos;
