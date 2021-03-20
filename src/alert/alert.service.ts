import {Alert} from './alert.interface';
import * as NotificationService from "../notification/notification.service";
import {Notification} from '../notification/notification.interface';

export async function sendNotification(alert: Alert): Promise<any> {
    const notification: Notification = {
        title: alert.title,
        body: alert.message,
        data: {
            raw: JSON.stringify(alert)
        },
    }

    return NotificationService.sendToTopic('tests', notification);
}
