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
            const newProjectButton = document.createElement("button");

            newProjectButton.classList = "project-buttons"
            newProjectButton.dataset.project = JSON.stringify(newProject);
            newProjectButton.textContent = newProject.name;

            newProjectButton.addEventListener("click", () => {
                addTodoButton.dataset.project = JSON.stringify(newProject);
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
        todoModal.showModal();
    });

    modalCloseButton.addEventListener("click", () => {
        todoModal.close();
    });

    modalSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if(todoForm.checkValidity()) {
            const currentProject = JSON.parse(addTodoButton.dataset.project);
            const parsedDate = parse(todoDue.value, "yyyy-MM-dd", new Date());
            currentProject.addTodo(new Todo(todoName.value, todoDescription.value, parsedDate, todoPriority.value));
            console.log(currentProject.todos[0]);
        } else {
            alert("please fill out the todo form properly");
        }
        console.log(todoDue.value);
    });
}