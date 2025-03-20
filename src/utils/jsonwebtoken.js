import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getJWT = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' } 
  );
};

export default getJWT;
