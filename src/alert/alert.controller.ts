import express, {Request, Response} from 'express';
import * as AlertService from "./alert.service";
import {Alert} from './alert.interface';

export const alertRouter = express.Router();

alertRouter.post('/', async (req: Request, res: Response) => {
    const alert: Alert = req.body;

    AlertService.sendNotification(alert)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err))
});
