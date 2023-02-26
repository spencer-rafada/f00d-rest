import dotenv from 'dotenv';
dotenv.config();

export default {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:3030/`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};
