import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();  // Load environment variables from .env file

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';  // API URL for listings
const API_KEY = process.env.CRYPTO_API_KEY;  // Load API key from environment variable

export const getTopCryptos = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
      params: {
        limit: 10,  // Get top 10 cryptocurrencies
        convert: 'USD',
      },
    });
    return response.data.data;  // Return the data of the top 10 cryptos
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching crypto data:', error.response?.data || error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    throw error;
  }
};
