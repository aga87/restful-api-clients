import dotenv from 'dotenv';
import express, { Application } from 'express';

dotenv.config();
const app: Application = express();

const { PORT } = process.env;
const port = PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
