
// generate tabs
// generate tables (can create their own tabs)
// |-collar 
// |-Surveys 
// |-Lithology 
// |-alteration 
// |-Mineralisation 
// |-Geotech 
// |-Samples 

import { addTable } from "./modules/addTable.js";
import * as collar from "./modules/collar.js";
console.log("added table");

addTable(collar.collarCols,collar.id_prefix,collar.addRow,collar.deleteRow,collar.datalist);