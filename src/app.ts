
import TriggerHTTP from "./services/triggers/trigger-HTTP";

import client from "./config/mongodb";

import { trackedCascades, trackedTriggers } from "./services/trackedServices";

import Cascade from "./classes/cascade";

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