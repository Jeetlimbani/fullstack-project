import { OAuth2Client } from 'google-auth-library';
import * as config from '../config/index.js';

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload; // Contains user info like email, name, sub (Google ID)
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return null;
  }
};
