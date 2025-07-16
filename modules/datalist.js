export const generateDL = (id, options) =>{
    if (!id || !options) return;
    id = id.replace(/\s/g, "");//removes spaces as they aren't allowed?
    const dl=document.getElementById(id);
    
    options.forEach( option =>{
        const optTag=document.createElement('option');
        optTag.value=option;
        dl.appendChild(optTag);
    });
};

export function validateDL(input,datalistId){
    var validDL = Array.from(document.getElementById(datalistId).querySelectorAll('option'));
    validDL = validDL.map(item=>item.value);
    console.log(validDL)
    if (!validDL.includes(input.value)){
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
    };
};