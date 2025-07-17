export function deleteRow(table_id, columns=[], data={}) {
    //need to add check to prevent error when no rows, it still works but produces an error
    const table=document.getElementById(table_id).querySelector('tbody');
    console.log(table.children[table.children.length-1]);
    table.children[table.children.length-1].remove();
}