import express, {Request, Response} from 'express';
import * as NotificationService from "./notification.service";
import {Notification} from './notification.interface';

export const notificationRouter = express.Router();

notificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const notification: Notification = req.body;
        await NotificationService.send(notification);

        res.status(204).send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});
