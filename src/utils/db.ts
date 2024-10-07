import pkg from 'pg'; // Import the whole package
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

// Destructure the Client from the imported package

export const connectToDB = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    await client.connect();
    return client;
};
