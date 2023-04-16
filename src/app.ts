
import triggerDictionary from "./services/dictionaries/trigger-dictionary";
import { trackedCascades, trackedTriggers } from "./services/tracked-services";
import Cascade from "./classes/cascade";
import client from "./config/mongodb";

async function main() {
    console.clear();
    console.log("dirname:", __dirname);

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
            const triggerObject = new triggerDictionary.TriggerHTTP(trigger.method, endpoint);
            triggerObject.cascades = trackedCascades.filter(cascade => trigger.cascades.includes(cascade.id));
            triggerObject.id = trigger._id.toString();
            trackedTriggers.push(triggerObject);
        }
    }

    console.log(`Instantiated ${trackedTriggers.length} triggers and ${trackedCascades.length} cascades from ${teams.length} team(s).`)
}

main();