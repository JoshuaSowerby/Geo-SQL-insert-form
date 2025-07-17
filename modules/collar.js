
import { validateDL } from "./datalist.js";
import { SurveyMethodOptions, SurveyInstrumentOptions } from "./common-dl-options.js";
export const id_prefix="Collar";
export const collarCols=[
        "HoleID",
        "East NAD83 Z4",
        "North NAD 83 Z4",
        "RL",
        "Collar Azim (Grid)",
        "Collar Dip",
        "Date Started",
        "Date Finished",
        "Drill Contractor",
        "Drill Rig",
        "Core Size(s)",
        "Geologists",
        "Collar Survey Method",
        "Collar Survey Instrument",
        "Comments"
    ];

export const datalist = {
    "Core Size(s)": [
        "HQ",
        "NQ",
        "NQ2",
        "HQ NQ",
        "HQ NQ2"],
    "Collar Survey Method":SurveyMethodOptions,
    "Collar Survey Instrument":SurveyInstrumentOptions
};

const datalistColumns=Object.keys(datalist);

//I don't really like this var, see if you an change it
const dateFields=["Date Started", "Date Finished"];

//the data field is important for auto loading from file
//would be better if this was more generic
console.log("modules/collar.js function 'addRow' could this be made to be generic?")
export function addRow(table_id, columns, data={}) {
    console.log(table_id);
    const table=document.getElementById(table_id).querySelector('tbody');
    console.log(table);
    const row = document.createElement('tr');
    columns.forEach(field => {
        const td = document.createElement('td');
        td.setAttribute("name",field);
        
        const input = document.createElement('input');
        input.value=data[field] || '';
        
        //input.setAttribute("id",field);
        input.setAttribute("name",field);

        //date validation
        if (dateFields.includes(field)){
            input.setAttribute("type",'date');
            input.addEventListener('input', () => validateDates(row));
        }

        //reference datalist
        if (datalistColumns.includes(field)){
            console.log("collar.js, l:98, does id need to be var or can it be const?")
            var id = field.replace(/\s/g, "");
            input.setAttribute("list",id)//should get from original table creation so more reusable
            input.addEventListener('input', () => validateDL(input,id));
        }

        td.appendChild(input);
        row.appendChild(td);
    });
    table.appendChild(row);
}

//would be better if this was more generic
console.log("modules/collar.js function 'validateDates' could this be made to be generic?")
function validateDates(row){
    
    const inputs = Array.from(row.querySelectorAll('input'))
        .filter( i => dateFields.includes(i.name));
    const [startInput, finishInput] =[
        inputs.find( i => i.name==="Date Started"),
        inputs.find( i => i.name==="Date Finished")
    ];

    if (!startInput || ! finishInput){
        startInput.classList.remove('invalid');
        finishInput.classList.remove('invalid');
        return;
    }

    const start = new Date(startInput.value);
    const finish = new Date(finishInput.value);

    if (start>finish){
        startInput.classList.add('invalid');
        finishInput.classList.add('invalid');
    }else{
        startInput.classList.remove('invalid');
        finishInput.classList.remove('invalid');
    }
}
