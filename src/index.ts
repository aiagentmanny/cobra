import { getTopCryptos } from './services/cryptoService';
import cron from 'node-cron';

// Run the task every hour (you can adjust the cron expression)
cron.schedule('0 * * * *', async () => {  // This runs every hour
  try {
    console.log('Fetching top 10 cryptocurrencies...');
    const cryptoData = await getTopCryptos();
    console.log('Top 10 Crypto Data:', cryptoData);
  } catch (error: unknown) {
    console.error('Error occurred while fetching crypto data');
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
});

console.log('Crypto data fetcher started...');
