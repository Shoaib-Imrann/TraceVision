import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';  // Don't forget the .js extension

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = await User.findById(decoded.user_id); // Get user from database using user_id from token
      next();
    });
  };

export default authenticate;