import { client } from "../config/mongodb";
import { trackedCascades } from "../services/tracked-services";
import { ObjectId } from 'mongodb';
import Cascade from "../classes/cascade";

async function recycleCascade(cascadeID: string) {
    let cascade = new Cascade;

    // Get list of all databases belonging to any team
    const databases = await client.db().admin().listDatabases();
    const globalDatabases = ["global", "admin", "local"];
    const teamDatabases = databases.databases.filter((database: any) => !globalDatabases.includes(database.name.toLowerCase())).map((database: any) => database.name);

    // Loop over all databases, loop over all cascade collections,
    // find the cascade with matching ID
    try {
        for (const teamDatabase of teamDatabases) {
            const cascadesCollection = await client.db(teamDatabase).collection("cascades");
            const foundCascade = await cascadesCollection.findOne({ _id: new ObjectId(cascadeID) });
            if (foundCascade) {
                cascade.id = String(foundCascade._id);
                cascade.modules = foundCascade.modules;
                cascade.teamName = teamDatabase;
                break;
            }
        }
    // Catch invalid cascadeID
    } catch (error) {
        return false;
    }

    const index = trackedCascades.findIndex(_cascade => _cascade.id == cascadeID);

    // Upsert if added or modified, delete if deleted
    if (cascade.id) {
        if (index > -1) {
            // Update cascade
            trackedCascades[index] = cascade;
        } else {
            // Insert cascade
            trackedCascades.push(cascade);
        }
        return true;
    } else {
        if (index > -1) {
            // Remove cascade
            trackedCascades.splice(index, 1);
            return true;
        }
    }

    // Couldn't find trigger anywhere
    return false;
}

export default recycleCascade;