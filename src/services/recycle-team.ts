import { client } from "../config/mongodb";
import { trackedTriggers, trackedCascades } from "../services/tracked-services";
import triggerDictionary from '../services/dictionaries/trigger-dictionary';
import Cascade from "../classes/cascade";

async function recycleTeam(teamName: string) {
    let updatedCascades: Array<any> = [];
    let updatedTriggers: Array<any> = [];

    // Find all cascades owned by team
    const cascadesCollection = client.db(teamName).collection("cascades");
    const cascades = await cascadesCollection.find({}).toArray();

    // Find all triggers owned by team
    const triggersCollection = client.db(teamName).collection("triggers");
    const triggers = await triggersCollection.find({}).toArray();

    // Create objects for each found cascade
    for (let cascade of cascades) {
        let cascadeObject = new Cascade;
        cascadeObject.teamName = teamName;
        cascadeObject.id = cascade._id.toString();
        cascadeObject.modules = cascade.modules;
        updatedCascades.push(cascadeObject);
    }

    // Create objects for each found trigger
    for (let trigger of triggers) {
        let endpoint: string;
        if (trigger.endpoint) {
            endpoint = `/${teamName.toLowerCase()}/${trigger.endpoint}`;
        } else {
            endpoint = `/${teamName.toLowerCase()}`;
        }
        const triggerObject = new triggerDictionary.TriggerHTTP(trigger.method, endpoint, teamName);
        triggerObject.cascades = trackedCascades.filter(cascade => trigger.cascades.includes(cascade.id));
        triggerObject.id = trigger._id.toString();
        updatedTriggers.push(triggerObject);
    }

    // Delete deleted cascades
    for (const [index, cascade] of trackedCascades.entries()) {
        if (trackedCascades[index].teamName === teamName) {
            const cascadeIndex = updatedCascades.findIndex(_cascade => _cascade.id === trackedCascades[index].id);
            if (cascadeIndex === -1) {
                trackedCascades.splice(index, 1);
            }
        }
    }

    // Upsert new / updated cascades
    for (const cascade of updatedCascades) {
        const index = trackedCascades.findIndex(_cascade => _cascade.id == cascade.id);

        if (index > -1) {
            trackedCascades[index] = cascade;
        } else {
            trackedCascades.push(cascade);
        }
    }

    // Delete deleted triggers
    for (const [index, trigger] of trackedTriggers.entries()) {
        if (trackedTriggers[index].teamName === teamName) {
            const triggerIndex = updatedTriggers.findIndex(_trigger => _trigger.id === trackedTriggers[index].id);
            if (triggerIndex === -1) {
                trackedTriggers[index].deleteRoute();
                trackedTriggers.splice(index, 1);
            }
        }
    }

    // Upsert new / updated triggers
    for (const trigger of updatedTriggers) {
        const index = trackedTriggers.findIndex(_trigger => _trigger.id == trigger.id);

        if (index > -1) {
            trackedTriggers[index] = trigger;
        } else {
            trackedTriggers.push(trigger);
        }
    }

    // Recycling team should always return true because team may have been intentionally deleted
    return true;
}

export default recycleTeam;