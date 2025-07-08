import { z } from 'zod';


const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});


const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});


const noteSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  content: z.string().optional(),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errors = error.errors.map((err) => err.message);
    res.status(400).json({ message: 'Validation failed', errors });
  }
};

export const validateAuth = validate(authSchema);
export const validateOtp = validate(otpSchema);
export const validateNote = validate(noteSchema);
