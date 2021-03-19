import * as dotenv from 'dotenv';
import {initFirebase} from './firebase';

export function init() {
    dotenv.config();
    const envVars: Record<string, string | undefined> = {
        'PORT': process.env.PORT,
        'FIREBASE_DB': process.env.FIREBASE_DB
    };
    checkEnvVars(envVars);

    initFirebase(process.env.FIREBASE_DB);
}

function checkEnvVars(envVars: Record<string, string | undefined>) {
    let allEnvVarsFound = true;
    for (const envVar of Object.keys(envVars)) {
        if (envVars[envVar] === undefined) {
            console.warn(`Environment variable ${envVar} not found`);
            allEnvVarsFound = false;
        }
    }
    if (!allEnvVarsFound) {
        console.error("Not all environment variables where found, quitting")
        process.exit(1);
    }
}
