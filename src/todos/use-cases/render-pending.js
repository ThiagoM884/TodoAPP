import todoStore, { Filters } from "../../store/todo.store";


let element;
/**
 * 
 * @param {string} elementId 
 */

export const renderPending = (elementId) => {
    if( !element )
        element = document.querySelector(elementId);

    if ( !element )
        throw new Error(`El element ${elementId} no existe`);


    element.innerText = todoStore.getTodos(Filters.Pending).length;
}