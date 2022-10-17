'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [
    {
        text: 'Сварить кофе',
        complated: false
    },
    {
        text: 'Помыть посуду',
        complated: true
    }
];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.text}</span>
             <div div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`;

        if (item.complated) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.complated = !item.complated;
            localStorage.setItem('toDo', JSON.stringify(toDoData));
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1);
            localStorage.setItem('toDo', JSON.stringify(toDoData));
            render();
        });
    });

};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        complated: false
    };
    if (headerInput.value.trim() !== '') {
        toDoData.push(newToDo);
        localStorage.setItem('toDo', JSON.stringify(toDoData));
        headerInput.value = '';
        render();
    }
});

if (!localStorage.getItem('toDo')) {
    localStorage.setItem('toDo', JSON.stringify(toDoData));
} else {
    toDoData = JSON.parse(localStorage.getItem('toDo'));
}
render();