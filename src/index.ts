import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {notificationRouter} from './notification/notification.controller';

dotenv.config();

/* Variables */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/* Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationRouter);

/* Activation */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
