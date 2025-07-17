
import { generateDL } from "./datalist.js";
export const addTable = (columns, id_prefix, addRowFunc, deleteRowFunc, datalist={}) =>{
    //add error check here

    //Add tab
    const tabTable= document.getElementById("tabs").querySelector('tr');
    const tabs_th= document.createElement('th');
    tabs_th.setAttribute('id',`${id_prefix}_tab`);
    //tabs_th.innerHTML=id_prefix;
    tabTable.appendChild(tabs_th);
    ///add button with tab switching here
    const tabButton = document.createElement("button");
    tabButton.onclick= ()=>{
        //this should be defined as a variable not a string
        const tableDiv = document.getElementById(`${id_prefix}_div`)
        if (tableDiv.style.visibility==="visible"){tableDiv.style.visibility="hidden";}
        else {tableDiv.style.visibility="visible"};
    }
    tabButton.innerHTML=id_prefix;
    tabs_th.appendChild(tabButton);
    console.log("added tabs");


    //Create table
    const allTables= document.getElementById('tables');

    const tableDiv= document.createElement('div');
    tableDiv.setAttribute('id',`${id_prefix}_div`);
    tableDiv.style.visibility = "hidden"//"visible|hidden|collapse|initial|inherit"

    const title = document.createElement('h2');
    title.innerHTML=id_prefix;
    tableDiv.appendChild(title);

    allTables.appendChild(tableDiv);

    const table = document.createElement('table');
    const table_id=`${id_prefix}_table`;
    table.setAttribute('id',table_id);

    tableDiv.appendChild(table);

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    const tr = document.createElement('tr');
    columns.forEach( col =>{
        const th = document.createElement('th');
        th.innerHTML=col;
        tr.appendChild(th);
    });

    thead.appendChild(tr);

    console.log("added table");

    //Add datalist here
    Object.keys(datalist).forEach( (key)=> {
        const dl = document.createElement("datalist");
        tableDiv.appendChild(dl);
        const dl_id = key.replace(/\s/g, "");
        dl.setAttribute('id',dl_id)
        generateDL(key,datalist[key]);
    });

    //Create add / delete row
    const addRow=document.createElement('button');
    addRow.onclick=() => addRowFunc(table_id, columns);////test
    addRow.setAttribute('id', `${id_prefix}_addRow`);
    addRow.innerHTML="+"

    const deleteRow=document.createElement('button');
    deleteRow.onclick=() => deleteRowFunc(table_id);////test
    deleteRow.setAttribute('id', `${id_prefix}_deleteRow`);
    deleteRow.innerHTML="-"

    tableDiv.appendChild(addRow);
    tableDiv.appendChild(deleteRow);

}
