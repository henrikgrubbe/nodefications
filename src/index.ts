import express from 'express';
import cors from 'cors';
import {notificationRouter} from './notification/notification.controller';
import {init} from './startup/init';

init();

const app = express();

// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationRouter);

const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
