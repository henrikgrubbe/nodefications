import {Alert, EvalMatch, RuleDictionary, Tags} from './alert.interface';
import * as NotificationService from "../notification/notification.service";
import {Notification} from '../notification/notification.interface';

const ruleDictionary: RuleDictionary = {
    greenhouse_temp: {
        ok: {
            title: 'Greenhouse OK',
            body: 'Average temperature over the last {{period}} was below {{threshold}} °C'
        },
        alerting: {
            title: 'Greenhouse too hot',
            body: 'Average temperature over the last {{period}} was above {{threshold}} °C ({{eval_match_0}} °C)'
        }
    }
}

export async function sendNotification(alert: Alert): Promise<any> {
    const topics: string[] = extractTopics(alert.tags);
    if (topics.length === 0) {
        return Promise.reject("Alert missing topic(s)");
    }

    const notification: Notification = buildNotification(alert);

    const promises = [];
    topics
        .forEach((topic) => {
            promises.push(
                NotificationService.sendToTopic(topic, notification)
            )
        })

    return Promise.all(promises);
}

function extractTopics(tags: Tags): string[] {
    const topicString = tags['topics'];
    if (!topicString) {
        return [];
    }

    return topicString.split(';')
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0);
}

function buildNotification(alert: Alert): Notification {
    const alertRule = ruleDictionary[alert.ruleName];
    let title: string = alert.title;
    let body: string = alert.message;

    if (alertRule && alertRule[alert.state]) {
        title = alertRule[alert.state].title;
        body =  alertRule[alert.state].body;
    }

    return {
        title,
        body: parseBody(body, alert.evalMatches, alert.tags),
        data: {
            raw: JSON.stringify(alert)
        },
    }
}


function parseBody(message: string, evalMatches: EvalMatch[], tags: Tags): string {
    let result = (' ' + message).slice(1);
    result = replaceEvalMatches(result, evalMatches);
    result = replaceTags(result, tags);

    return result;
}

function replaceEvalMatches(message: string, evalMatches: EvalMatch[]): string {
    const regex = /{{eval_match_(\d+)}}/;

    for (let match = message.match(regex); match !== null; match = message.match(regex)) {
        const index = parseInt(match[1]);
        const evalMatch = evalMatches[index].value;
        message = message.replace(match[0], evalMatch.toFixed(1));
    }

    return message;
}

function replaceTags(message: string, tags: Tags) {
    const regex = /{{(\w+)}}/;

    for (let match = message.match(regex); match !== null; match = message.match(regex)) {
        message = message.replace(match[0], tags[match[1]]);
    }

    return message;
}
