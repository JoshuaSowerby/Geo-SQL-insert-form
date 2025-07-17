
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
import { deleteRow } from "./modules/deleteRow.js";
console.log("added table");

addTable(collar.collarCols, collar.id_prefix, collar.addRow, deleteRow, collar.datalist);