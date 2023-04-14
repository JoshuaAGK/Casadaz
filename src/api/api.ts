const express = require('express');
import { Router } from 'express';
const router: Router = express.Router();
import client from "../config/mongodb";
import triggerDictionary from '../services/dictionaries/trigger-dictionary';
import moduleDictionary from '../services/dictionaries/module-dictionary';
import { trackedCascades, trackedTriggers } from "../services/tracked-services";
import Cascade from "../classes/cascade";

router.post("/addtrigger", async (req: any, res: any) => {
    console.log("Trying to add trigger");

    const uid = req.body.uid;
    const teamName = req.body.team;
    const trigger = req.body.trigger;

    const teamsCollection = client.db("global").collection("teams");
    const team = await teamsCollection.find({teamName}).toArray();

    if (team.length === 0) {
        res.send("No team found");
        return;
    }

    if (!team[0].members.includes(uid)) {
        res.send("User is not a member of team");
        return;
    }
    
    const triggersCollection = client.db(teamName).collection("triggers");
    const insertResult = await triggersCollection.insertOne(trigger);

    let triggerObject = new triggerDictionary.TriggerHTTP(trigger.method, trigger.endpoint);

    triggerObject.cascades = trackedCascades.filter((cascade: Cascade) => trigger.cascades.includes(cascade.id));

    triggerObject.id = insertResult.insertedId.toString();
    trackedTriggers.push(triggerObject);
    console.log(trackedTriggers);

    res.send("ok");
})

router.post("/addcascade", async (req: any, res: any) => {
    const uid = req.body.uid;
    const teamName = req.body.team;
    const cascade = req.body.cascade;

    const teamsCollection = client.db("global").collection("teams");
    const teams = await teamsCollection.find({teamName}).toArray();

    if (teams.length === 0) {
        res.send("No team found");
        return;
    }

    if (!teams[0].members.includes(uid)) {
        res.send("User is not a member of team");
        return;
    }
    
    const cascadesCollection = client.db(teamName).collection("cascades");
    const insertResult = await cascadesCollection.insertOne(cascade);

    let cascadeObject = new Cascade;
    
    cascadeObject.modules = cascade.modules;

    cascadeObject.id = insertResult.insertedId.toString();
    trackedCascades.push(cascadeObject);
    console.log(trackedCascades);

    res.send("ok");
})

export default router;