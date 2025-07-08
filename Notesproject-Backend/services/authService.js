import prisma from '../models/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateOTP from '../utils/otpGenerator.js';
import { sendOTP } from '../utils/mailer.js';
import { verifyGoogleToken } from '../utils/googleAuth.js';
import config from '../config/index.js';

const generateAuthToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: '1h' });
};

export const signupWithEmailOTP = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await prisma.user.findUnique({ where: { email } });

  if (user && user.password) {
    throw new Error('User with this email already exists and has a password. Please log in.');
  }

  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + config.OTP_EXPIRY_MINUTES * 60 * 1000);

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otp: {
          upsert: {
            create: { code: otpCode, expiresAt },
            update: { code: otpCode, expiresAt },
          },
        },
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        otp: {
          create: { code: otpCode, expiresAt },
        },
      },
    });
  }

  const emailSent = await sendOTP(email, otpCode);
  if (!emailSent) {
    throw new Error('Failed to send OTP email. Please try again.');
  }

  return { message: 'OTP sent to your email for verification.' };
};

export const verifyEmailOTP = async (email, otp) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { otp: true },
  });

  if (!user || !user.otp) {
    throw new Error('User not found or no OTP generated.');
  }

  if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
    throw new Error('Invalid or expired OTP.');
  }

  await prisma.oTP.delete({ where: { id: user.otp.id } });

  const token = generateAuthToken(user);
  return { message: 'Email verified successfully', user: { id: user.id, email: user.email, name: user.name }, token };
};

export const loginWithEmail = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  const token = generateAuthToken(user);
  return { message: 'Logged in successfully', user: { id: user.id, email: user.email, name: user.name }, token };
};

export const googleAuth = async (token) => {
  const googlePayload = await verifyGoogleToken(token);

  if (!googlePayload) {
    throw new Error('Invalid Google token.');
  }

  const googleId = googlePayload.sub;
  const email = googlePayload.email;
  const name = googlePayload.name;

  let user = await prisma.user.findUnique({ where: { googleId } });

  if (!user) {
    const existingEmailUser = await prisma.user.findUnique({ where: { email } });

    if (existingEmailUser && existingEmailUser.password) {
      throw new Error('An account with this email already exists. Please log in with your email and password, or consider linking your Google account from your profile settings.');
    } else if (existingEmailUser && !existingEmailUser.password) {
      user = await prisma.user.update({
        where: { id: existingEmailUser.id },
        data: { googleId, name: name || existingEmailUser.name },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name,
        },
      });
    }
  }

  const authToken = generateAuthToken(user);
  return { message: 'Logged in successfully with Google', user: { id: user.id, email: user.email, name: user.name }, token: authToken };
};


