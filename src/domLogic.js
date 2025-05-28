import { parse } from "date-fns";
import { Project, Todo } from "./objects.js"
export { addNewProject, addNewTodo }

function addNewProject() {
    const addProjectButton = document.getElementById("project-button");
    const projectModal = document.getElementById("project-modal");
    const modalCloseButton = document.getElementById("project-close");
    const modalSubmit = document.getElementById("project-submit");
    const projectList = document.getElementById("project-list");
    const projectForm = document.getElementById("project-form");
    const addTodoButton = document.getElementById("todo-button");
    
    addProjectButton.addEventListener("click", () => {
        projectModal.showModal();
    });

    modalCloseButton.addEventListener("click", () => {
        projectModal.close();
    });

    modalSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if (projectForm.checkValidity()) {
            projectModal.close();

            const newProject = new Project(document.getElementById("project-name").value);
            newProject.todos.push(new Todo("test", "This is something", "2025-01-01", "low"));
            localStorage.setItem(newProject.name, JSON.stringify(newProject));
            const newProjectButton = document.createElement("button");

            newProjectButton.classList = "project-buttons"
            newProjectButton.textContent = newProject.name;

            newProjectButton.addEventListener("click", () => {
                addTodoButton.dataset.project = newProject.name;
                displayProject(newProject.name);
            });

            projectList.append(newProjectButton);
        } else {
            alert("please fill out the project form properly");
        }
    });
}

function addNewTodo() {
    const addTodoButton = document.getElementById("todo-button");
    const todoModal = document.getElementById("todo-modal");
    const todoForm = document.getElementById("todo-form");
    const modalCloseButton = document.getElementById("todo-close");
    const modalSubmit = document.getElementById("todo-submit");
    const todoName = document.getElementById("todo-name");
    const todoDescription = document.getElementById("todo-description");
    const todoDue = document.getElementById("todo-due");
    const todoPriority = document.getElementById("todo-priority");

    addTodoButton.addEventListener("click", () => {
        if (addTodoButton.dataset.project) {
        todoModal.showModal();
        } else {
            alert("Please select a project before adding a todo");
        }
    });

    modalCloseButton.addEventListener("click", () => {
        todoModal.close();
    });

    modalSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if(todoForm.checkValidity()) {
            const retrievedProject = localStorage.getItem(addTodoButton.dataset.project);
            const parsedProject = JSON.parse(retrievedProject);
            const revivedProject = Object.assign(new Project(), parsedProject);
            revivedProject.todos.forEach((item, index, array) => {
                array[index] = Object.assign(new Todo(), item);
            });
            console.log(revivedProject instanceof Project);
            console.log(revivedProject.todos[0] instanceof Todo);
            // revivedProject.addTodo(new Todo(todoName.value, todoDescription.value, todoDue.value, todoPriority.value));
            // console.log(revivedProject.todos[0]);
            // revivedProject.todos[0].editTodo("A", "A", "2020-01-01", "medium");
            // console.log(revivedProject.todos[0]);
        } else {
            alert("please fill out the todo form properly");
        }
        console.log(todoDue.value);
    });
}

function displayProject(projectName) {
    const retrivedProject = localStorage.getItem(projectName);
    const revivedProject = Object.assign(new Project(), retrivedProject);
    revivedProject.todos.forEach((item, index, array) => {
        array[index] = Object.assign(new Todo(), item);
    });
    const mainContent = document.getElementById("main-content");
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = revivedProject.name;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Project";
    const contentHeading = document.createElement("div");
    contentHeading.id = "content-heading";
    contentHeading.append(projectTitle, deleteButton);
    mainContent.appendChild(contentHeading);
}