import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = express.Router();

// JWT Authentication
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, image: user.image } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    // Save user (this will trigger the password hashing)
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        image: user.image 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Protected route example
router.get('/me', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  res.json(req.user);
});

// Guest login route
router.post('/guest', async (req: Request, res: Response) => {
  try {
    // Generate a random guest username
    const guestUsername = `guest_${Math.random().toString(36).substring(2, 8)}`;
    
    // Create a new guest user
    const guestUser = new User({
      email: `${guestUsername}@guest.com`,
      password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
      name: 'Guest User',
      isGuest: true
    });

    await guestUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: guestUser._id, isGuest: true },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: guestUser._id,
        email: guestUser.email,
        name: guestUser.name,
        isGuest: true
      }
    });
  } catch (error) {
    console.error('Guest login error:', error);
    res.status(500).json({ message: 'Error creating guest account' });
  }
});

export default router; 