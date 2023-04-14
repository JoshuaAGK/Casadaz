import Cascade from "../classes/cascade";
import TriggerHTTP from "../classes/triggers/trigger-HTTP";

type Triggers = TriggerHTTP; // Add more triggers here as created

let trackedTriggers: Array<Triggers> = [];
let trackedCascades: Array<Cascade> = [];

export { trackedTriggers, trackedCascades };