import dotenv from 'dotenv';
dotenv.config();

export default {
  authRequired: false,
  auth0Logout: true,
  baseURL: `https://f00d-rest.onrender.com/`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};
