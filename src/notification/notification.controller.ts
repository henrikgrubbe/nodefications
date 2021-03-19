import express, {Request, Response} from 'express';
import * as NotificationService from "./notification.service";
import {Notification} from './notification.interface';

export const notificationRouter = express.Router();

notificationRouter.post('/topic/:topic', async (req: Request, res: Response) => {
    const notification: Notification = req.body;
    NotificationService.sendToTopic(req.params.topic, notification)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err))
});

notificationRouter.post('/token/:token', async (req: Request, res: Response) => {
    const notification: Notification = req.body;
    await NotificationService.sendToToken(req.params.topic, notification)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err))
});
