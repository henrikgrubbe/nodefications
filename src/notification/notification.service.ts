import {Notification} from './notification.interface';

export async function send(notification: Notification): Promise<any> {
    console.log('If only I could send this...', notification);

    return true;
}
