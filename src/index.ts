import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {notificationRouter} from './notification/notification.controller';

dotenv.config();

const envVars: Record<string, string | undefined> = {
    'PORT': process.env.PORT,
};
checkEnvVars(envVars);

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/* Configuration */
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationRouter);

/* Activation */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

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
