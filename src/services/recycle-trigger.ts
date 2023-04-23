import { client } from "../config/mongodb";
import { trackedTriggers, trackedCascades } from "../services/tracked-services";
import { ObjectId } from 'mongodb';
import triggerDictionary from '../services/dictionaries/trigger-dictionary';

async function recycleTrigger(triggerID: string) {
    let trigger = new triggerDictionary.TriggerHTTP("", "", "");

    // Get list of all databases belonging to any team
    const databases = await client.db().admin().listDatabases();
    const globalDatabases = ["global", "admin", "local"];
    const teamDatabases = databases.databases.filter((database: any) => !globalDatabases.includes(database.name.toLowerCase())).map((database: any) => database.name);

    // Loop over all databases, loop over all trigger collections,
    // find the trigger with matching ID
    try {
        for (const teamDatabase of teamDatabases) {
            const triggersCollection = await client.db(teamDatabase).collection("triggers");
            const foundTrigger = await triggersCollection.findOne({ _id: new ObjectId(triggerID) });
            if (foundTrigger) {
                let endpoint: string;
                if (foundTrigger.endpoint) {
                    endpoint = `/${teamDatabase.toLowerCase()}/${foundTrigger.endpoint}`;
                } else {
                    endpoint = `/${teamDatabase.toLowerCase()}`;
                }

                trigger = new triggerDictionary.TriggerHTTP(foundTrigger.method, endpoint, teamDatabase);
                trigger.id = String(foundTrigger._id);
                trigger.cascades = trackedCascades.filter(cascade => foundTrigger.cascades.includes(cascade.id));
                break;
            }
        }
    // Catch invalid triggerID
    } catch (error) {
        return false;
    }
    
    const index = trackedTriggers.findIndex(_trigger => _trigger.id == triggerID);

    // Upsert if added or modified, delete if deleted
    if (trigger.id) {
        if (index > -1) {
            // Update trigger
            trackedTriggers[index] = trigger;
        } else {
            // Insert trigger
            trackedTriggers.push(trigger);
        }
        return true;
    } else {
        if (index > -1) {
            // Remove trigger
            trackedTriggers[index].deleteRoute();
            trackedTriggers.splice(index, 1);
            return true;
        }
    }

    // Couldn't find trigger anywhere
    return false;
}

export default recycleTrigger;