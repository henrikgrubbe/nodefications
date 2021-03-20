export type EvalMatch = {
    value: number;
}

export enum AlertState {
    OK = 'ok',
    // PAUSED = 'paused',
    ALERTING = 'alerting',
    // PENDING = 'pending',
    NO_DATA = 'no_data'
}

export type Tags = {
    [tagName: string]: string;
};

export interface Alert {
    "dashboardId": number;
    "evalMatches": EvalMatch[];
    "imageUrl": string;
    "message": string;
    "orgId": number,
    "panelId": number;
    "ruleId": number;
    "ruleName": string;
    "ruleUrl": string;
    "state": AlertState;
    tags: Tags;
    "title": string;
}

export interface RuleDictionary {
    [ruleName: string]: AlertRule;
}

export type AlertRule = {
    [state in AlertState]: AlertRuleState;
}

export interface AlertRuleState {
    title: string;
    body: string;
}
