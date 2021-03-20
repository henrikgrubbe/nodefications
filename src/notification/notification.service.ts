const firebaseAdmin = require("firebase-admin");
import {messaging} from 'firebase-admin/lib/messaging';
import TopicMessage = messaging.TopicMessage;
import TokenMessage = messaging.TokenMessage;
import {Notification} from './notification.interface';

export async function sendToTopic(topic: string, notification: Notification): Promise<any> {
    const message: TopicMessage = {
        topic,
        notification: {
            title: notification.title,
            body: notification.body
        },
        data: {
            topic,
            ...notification.data
        }
    };

    return firebaseAdmin.messaging().send(message);
}

export async function sendToToken(token: string, notification: Notification): Promise<any> {
    const message: TokenMessage = {
        token,
        notification: {
            title: notification.title,
            body: notification.body
        },
        data: {
            ...notification.data
        }
    };

    return firebaseAdmin.messaging().send(message);
}
