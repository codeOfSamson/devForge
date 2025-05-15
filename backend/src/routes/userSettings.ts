import express, { Request, Response } from 'express';
import passport from 'passport';
import UserSettings from '../models/UserSettings';

const router = express.Router();

// Get current user's settings
router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const settings = await UserSettings.findOne({ user: userId });

    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save or update current user's settings
router.put('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const { theme, language, notificationsEnabled } = req.body;

    const settings = await UserSettings.findOneAndUpdate(
      { user: userId },
      { theme, language, notificationsEnabled },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(settings);
  } catch (error) {
    console.error('Error saving user settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;
