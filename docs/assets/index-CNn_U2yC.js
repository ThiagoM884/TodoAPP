(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=s(o);fetch(o.href,d)}})();const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function v(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}let y;const L=new Uint8Array(16);function C(){if(!y){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");y=crypto.getRandomValues.bind(crypto)}return y(L)}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:S};function E(e,t,s){e=e||{};const i=e.random??e.rng?.()??C();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,v(i)}function P(e,t,s){return b.randomUUID&&!e?b.randomUUID():E(e)}class A{constructor(t){this.id=P(),this.done=!1,this.description=t,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:a.All},x=()=>{T(),console.log("InitStore")},U=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done===!0);case a.Pending:return l.todos.filter(t=>t.done===!1)}},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(l))},k=e=>{if(!e)throw new Error("No se puede cargar un todo vacio");l.todos.push(new A(e)),h()},I=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},F=e=>{l.todos=l.todos.filter(t=>t.id!==e),h()},q=()=>{l.todos=l.todos.filter(e=>e.done===!1),h()},M=(e=a.All)=>{l.filter=e,h()},O=()=>l.filter,c={addTodo:k,deleteCompleted:q,deleteTodo:F,getCurrentFilter:O,getTodos:U,initStore:x,loadStore:T,setFilter:M,toggleTodo:I},D=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar complet</button>\r
    </footer>\r
</section>\r
\r
`;let g;const R=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element id: ${e} not found`);g.innerHTML="",t.forEach(s=>{g.append(H(s))})},H=e=>{const t=`
            <div class="view">
                <input class="toggle" type="checkbox" ${e.done?"checked":""}>
                <label>${e.description}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        `,s=document.createElement("li");return s.setAttribute("data-id",e.id),s.innerHTML=t,e.done&&s.classList.add("completed"),s};let f;const N=e=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`El element ${e} no existe`);f.innerText=c.getTodos(a.Pending).length},m={TodoList:".todo-list",newTodoInput:"#new-todo-input",deleteCompletedButton:".clear-completed",TodoFilters:".filtro",PendingCount:"#pending-count"},V=e=>{const t=()=>{const r=c.getTodos(c.getCurrentFilter());R(m.TodoList,r)},s=()=>{N(m.PendingCount)};(()=>{const r=document.createElement("div");r.innerHTML=D,document.querySelector(e).append(r),t(),s()})();const i=document.querySelector(m.newTodoInput),o=document.querySelector(m.TodoList),d=document.querySelector(m.deleteCompletedButton),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),t(),s(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t(),s()}),o.addEventListener("click",r=>{if(!r.target.classList.contains("destroy"))return;const p=r.target.closest("[data-id]");c.deleteTodo(p.getAttribute("data-id")),t(),s()}),d.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(w=>w.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();V("#app");
