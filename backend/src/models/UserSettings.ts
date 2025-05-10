import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  user: mongoose.Types.ObjectId;
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
}

const UserSettingsSchema = new Schema<ISettings>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  language: { type: String, default: 'en' },
  notificationsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ISettings>('UserSettings', UserSettingsSchema);
