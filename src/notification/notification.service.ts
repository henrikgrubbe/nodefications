const firebaseAdmin = require("firebase-admin");
import {messaging} from 'firebase-admin/lib/messaging';
import TopicMessage = messaging.TopicMessage;
import TokenMessage = messaging.TokenMessage;
import {Notification} from './notification.interface';

export async function sendToTopic(topic: string, notification: Notification): Promise<any> {
    const message: TopicMessage = {
        notification,
        topic
    };

    return firebaseAdmin.messaging().send(message)
        .then((val) => console.log(val))
        .catch((err) => console.error(err));
}

export async function sendToToken(token: string, notification: Notification): Promise<any> {
    const message: TokenMessage = {
        notification,
        token
    };

    return firebaseAdmin.messaging().send(message);
}
