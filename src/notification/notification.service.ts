const firebaseAdmin = require("firebase-admin");
import {TokenMessage, TopicMessage} from "firebase-admin/lib/messaging";
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

    if (debug()) {
        console.log('Topic message', message);
    }

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

    if (debug()) {
        console.log('Token message', message);
    }

    return firebaseAdmin.messaging().send(message);
}

function debug(): boolean {
    return (process.env.DEBUG as string).toLowerCase() === 'true';
}