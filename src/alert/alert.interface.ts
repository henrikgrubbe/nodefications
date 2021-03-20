export type EvalMatch = {
    value: number;
}

export type AlertState = 'ok' | 'paused' | 'alerting' | 'pending' | 'no_data';

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

export interface AlertRule {
    ok: AlertRuleState;
    alerting: AlertRuleState;
}

export interface AlertRuleState {
    title: string;
    body: string;
}
