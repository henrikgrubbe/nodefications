export type AlertState = 'ok' | 'paused' | 'alerting' | 'pending' | 'no_data';

export interface Alert {
    "dashboardId": number;
    "evalMatches": object[];
    "imageUrl": string;
    "message": string;
    "orgId": number,
    "panelId": number;
    "ruleId": number;
    "ruleName": string;
    "ruleUrl": string;
    "state": AlertState;
    tags: {
        [tagName: string]: string;
    };
    "title": string;
}
