import * as dotenv from "dotenv";
const { MongoClient } = require("mongodb");

import TriggerHTTP from "./services/triggers/trigger-HTTP";

dotenv.config();

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_BASE_URL = process.env.MONGODB_BASE_URL;
const MONGODB_OPTIONS = process.env.MONGODB_OPTIONS;
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_BASE_URL}/${MONGODB_OPTIONS}`
const client = new MongoClient(MONGODB_URL);

class Cascade {
    id = "";
    modules = [];
}

let trackedTriggers: Array<any> = [];
let trackedCascades: Array<any> = [];

async function main() {
    console.clear();
    await client.connect();
    console.log("Connected successfully to MongoDB.");

    const teamsCollection = client.db("global").collection("teams");
    const teams = await teamsCollection.find({}).toArray();

    for (const team of teams) {
        const teamName = team.teamName;
        const cascadesCollection = client.db(teamName).collection("cascades");
        const cascades = await cascadesCollection.find({}).toArray();

        const triggersCollection = client.db(teamName).collection("triggers");
        const triggers = await triggersCollection.find({}).toArray();

        for (let cascade of cascades) {
            let cascadeObject = new Cascade;
            cascadeObject.id = cascade._id.toString();
            cascadeObject.modules = cascade.modules;
            trackedCascades.push(cascadeObject);
        }

        for (let trigger of triggers) {
            let endpoint: string;
            if (trigger.endpoint) {
                endpoint = `/${teamName.toLowerCase()}/${trigger.endpoint}`;
            } else {
                endpoint = `/${teamName.toLowerCase()}`;
            }
            const triggerObject = new TriggerHTTP(trigger.method, endpoint);
            triggerObject.cascades = trackedCascades.filter(cascade => trigger.cascades.includes(cascade.id));
            triggerObject.id = trigger._id.toString();
            trackedTriggers.push(triggerObject);
        }
    }

    console.log(`Instantiated ${trackedTriggers.length} triggers and ${trackedCascades.length} cascades from ${teams.length} team(s).`)
}

main();