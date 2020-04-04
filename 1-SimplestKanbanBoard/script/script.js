/* script/script.js */
/* Ross Nelson Assignment 1: The Simplest Kanban Board */
/* April 7th, 2020 */

var nextID = 3;

function createTask() {
    const todoUL = document.getElementById('todoUL');
    const textBox = document.getElementById('textBox').value;
    const li = document.createElement('li');
    const p = document.createElement('p');
    const button = document.createElement('input');

    li.setAttribute('class', 'list');
    li.setAttribute('id', nextID);
    p.textContent = textBox;
    button.setAttribute('class', 'button');
    button.setAttribute('onclick', 'startTask(this.parentNode.id)');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Start Task');

    todoUL.appendChild(li);
    li.appendChild(p);
    li.appendChild(button);

    nextID += 1;
}

function startTask(itemID) {
    const li = document.getElementById(itemID);
    const progressUL = document.getElementById('progressUL');
    const button = li.querySelector('input');

    button.setAttribute('onclick', 'completeTask(this.parentNode.id)');
    button.setAttribute('value', 'Complete Task');

    progressUL.appendChild(li);
}

function completeTask(itemID) {
    const li = document.getElementById(itemID);
    const completeUL = document.getElementById('completeUL');
    const button = li.querySelector('input');

    button.style.display = 'none';

    completeUL.appendChild(li);
}