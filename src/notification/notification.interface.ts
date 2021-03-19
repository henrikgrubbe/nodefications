export interface Notification {
    title: string;
    body: string;
    data?: {
        [key: string]: string;
    };
}
