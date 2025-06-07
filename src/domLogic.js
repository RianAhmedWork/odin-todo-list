import { parse } from "date-fns";
import { Project, Todo } from "./objects.js";
export { addNewProject, addNewTodo };

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

      const newProject = new Project(
        document.getElementById("project-name").value
      );
      newProject.todos.push(
        new Todo("Ligma", "This is something", "2025-01-01", "low")
      );
      localStorage.setItem(newProject.name, JSON.stringify(newProject));
      const newProjectButton = document.createElement("button");

      newProjectButton.classList = "project-buttons";
      newProjectButton.textContent = newProject.name;
      newProjectButton.dataset.name = newProject.name;

      newProjectButton.addEventListener("click", () => {
        if (addTodoButton.dataset.project !== newProject.name) {
          addTodoButton.dataset.project = newProject.name;
          displayProject(newProject.name, newProjectButton, addTodoButton);
        }
      });

      projectList.append(newProjectButton);
      const test = Object.assign(
        new Project(),
        JSON.parse(localStorage.getItem(newProject.name))
      );
      console.log(test.todos[0].dueDate);
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
    if (todoForm.checkValidity()) {
      const retrievedProject = localStorage.getItem(
        addTodoButton.dataset.project
      );
      const parsedProject = JSON.parse(retrievedProject);
      const revivedProject = Object.assign(new Project(), parsedProject);
      revivedProject.todos.forEach((item, index, array) => {
        array[index] = Object.assign(new Todo(), item);
      });
      revivedProject.addTodo(todoName.value, todoDescription.value, todoDue.value, todoPriority.value);
      localStorage.setItem(revivedProject.name, JSON.stringify(revivedProject));
      displayProject(revivedProject.name, )
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

function displayProject(projectName, projectButton, todoButton) {
  const retrivedProject = JSON.parse(localStorage.getItem(projectName));
  const revivedProject = Object.assign(new Project(), retrivedProject);
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  const projectTitle = document.createElement("h1");
  projectTitle.textContent = projectName;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Project";
  const contentHeading = document.createElement("div");
  contentHeading.id = "content-heading";
  contentHeading.append(projectTitle, deleteButton);
  const todoList = document.createElement("div");
  todoList.id = "todo-list";
  revivedProject.todos.forEach((item, index, array) => {
    array[index] = Object.assign(new Todo(), item);
    console.log("sigma");
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const groceries = document.createElement("p");
    groceries.textContent = item.title;
    console.log(item.title);
    const dueDate = document.createElement("p");
    dueDate.textContent = "Due: " + item.dueDate;
    const checkboxDiv = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "" + index;
    checkbox.id = "" + index;
    checkbox.value = "true";
    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = "" + index;
    checkboxLabel.textContent = "Completed";
    checkboxDiv.append(checkbox, checkboxLabel);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit/View";
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "Delete";
    todoDiv.append(
      groceries,
      dueDate,
      checkboxDiv,
      editButton,
      deleteTodoButton
    );
    todoList.append(todoDiv);
  });
  deleteButton.addEventListener("click", () => {
    localStorage.removeItem(projectName);
    projectButton.remove();
    todoButton.dataset.project = "";
    mainContent.innerHTML = "";
  });
  mainContent.append(contentHeading, todoList);
}
