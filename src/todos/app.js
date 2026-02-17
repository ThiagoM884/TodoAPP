import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending} from './use-cases';


const elementIds = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    deleteCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
}

export const App =  (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementIds.TodoList, todos );
    }

    const updatePendingCount = () => {
        renderPending(elementIds.PendingCount);
    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
        updatePendingCount();
    })()
    
    
    const newDescriptionInput = document.querySelector( elementIds.newTodoInput );
    const todoListUl = document.querySelector( elementIds.TodoList );
    const deleteCompletedBtn = document.querySelector( elementIds.deleteCompletedButton );
    const filtersUl = document.querySelectorAll( elementIds.TodoFilters );

    newDescriptionInput.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) 
            return; // Si la tecla presionada es cualquiera menos el Enter, no hace nada
        if( e.target.value.trim().length === 0 )
            return; // Si no ingresa ningun valor, no se hace nada

        todoStore.addTodo( e.target.value );
        displayTodos();
        updatePendingCount();
        e.target.value = ''; // Resetear el input
    })



    todoListUl.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]'); // Buscar el elemento que contenga [data-id]
        
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
        updatePendingCount();
    })
    todoListUl.addEventListener('click', (e) => {

        if(!e.target.classList.contains('destroy')) 
            return; // Si no selecciono el boton con clase destroy, no hace nada

        const element = e.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
        updatePendingCount();
    })


    deleteCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })


    filtersUl.forEach(elemento => {
        elemento.addEventListener('click', (e) => {
            filtersUl.forEach(element => element.classList.remove('selected'));

            e.target.classList.add('selected');


            switch( e.target.text ){

                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }

            displayTodos();
        });
    })
};