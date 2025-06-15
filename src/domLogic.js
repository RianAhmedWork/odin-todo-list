import { parse } from "date-fns";
import { Project, Todo } from "./objects.js";
export { addNewProject, addNewTodo, createDefaultProject, loadProjects };

function createDefaultProject() {
  if (!localStorage.getItem("DEFAULT")) {
    const defaultProject = new Project("DEFAULT");
    localStorage.setItem(defaultProject.name, JSON.stringify(defaultProject));
  }
}

function loadProjects() {
  const projectList = document.getElementById("project-list");
  const addTodoButton = document.getElementById("todo-button");

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const projectButton = document.createElement("button");
      projectButton.textContent = key;
      projectButton.id = key;
      projectButton.addEventListener("click", () => {
        if(addTodoButton.dataset.project !== key) {
          addTodoButton.dataset.project = key;
        }
        displayProject(projectButton.textContent, projectButton, addTodoButton);
      });
      projectList.append(projectButton);
    }
  }
}

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
    const projectName = document.getElementById("project-name");
    const projectButtons = document.querySelectorAll(".project-buttons");
    if (!projectForm.checkValidity()) {
      alert("Please fill out the project form properly");
    } else if (
      projectButtons &&
      Array.from(projectButtons).some(
        (item) => item.id === projectName.value.toUpperCase()
      )
    ) {
      alert(
        "A project with that name already exists, please choose another name"
      );
    } else {
      projectModal.close();
      const newProject = new Project(projectName.value.toUpperCase());

      localStorage.setItem(newProject.name, JSON.stringify(newProject));
      const newProjectButton = document.createElement("button");

      newProjectButton.classList = "project-buttons";
      newProjectButton.textContent = newProject.name;
      newProjectButton.id = newProject.name;

      newProjectButton.addEventListener("click", () => {
        if (addTodoButton.dataset.project !== newProject.name) {
          addTodoButton.dataset.project = newProject.name;
        }
        displayProject(newProject.name, newProjectButton, addTodoButton);
      });

      projectList.append(newProjectButton);
      const test = Object.assign(
        new Project(),
        JSON.parse(localStorage.getItem(newProject.name))
      );
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
    todoModal.close();
    if (todoForm.checkValidity()) {
      const retrievedProject = localStorage.getItem(
        addTodoButton.dataset.project
      );
      const parsedProject = JSON.parse(retrievedProject);
      const revivedProject = Object.assign(new Project(), parsedProject);
      revivedProject.todos.forEach((item, index, array) => {
        array[index] = Object.assign(new Todo(), item);
      });
      revivedProject.addTodo(
        new Todo(
          todoName.value,
          todoDescription.value,
          todoDue.value,
          todoPriority.value
        )
      );
      localStorage.setItem(revivedProject.name, JSON.stringify(revivedProject));
      displayProject(
        revivedProject.name,
        document.getElementById(revivedProject.name),
        addTodoButton
      );
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

function EditTodo(
  title,
  description,
  dueDate,
  priority,
  todo,
  projectName,
  projectButton,
  todoButton,
  project
) {
  const editModal = document.getElementById("edit-modal");
  const editForm = document.getElementById("edit-form");
  const modalCloseButton = document.getElementById("edit-close");
  const editSubmit = document.getElementById("edit-submit");
  const editName = document.getElementById("edit-name");
  const editDescription = document.getElementById("edit-description");
  const editDue = document.getElementById("edit-due");
  const editPriority = document.getElementById("edit-priority");

  editName.value = title;
  editDescription.value = description;
  editDue.value = dueDate;
  editPriority.value = priority;

  editModal.showModal();

  modalCloseButton.addEventListener("click", () => {
    editModal.close();
  });

  editSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    if (editForm.checkValidity()) {
      editModal.close();
      todo.editTodo(
        editName.value,
        editDescription.value,
        editDue.value,
        editPriority.value
      );
      localStorage.setItem(projectName, JSON.stringify(project));
      displayProject(projectName, projectButton, todoButton);
    } else {
      alert("Please fill out the todo form properly");
    }
  });
}

function displayProject(projectName, projectButton, todoButton) {
  console.log(JSON.parse(localStorage.getItem(projectName)));
  const retrivedProject = JSON.parse(localStorage.getItem(projectName));
  const revivedProject = Object.assign(new Project(), retrivedProject);
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  const projectTitle = document.createElement("h2");
  projectTitle.textContent = projectButton.textContent;
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
    const title = document.createElement("p");
    title.textContent = item.title;
    console.log(item.title);
    const dueDate = document.createElement("p");
    dueDate.textContent = "Due: " + item.dueDate;
    const checkboxDiv = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "" + index;
    checkbox.id = "" + index;
    checkbox.value = "true";
    checkbox.addEventListener("click", () => {
      array[index].modifyChecklist();
      localStorage.setItem(revivedProject.name, JSON.stringify(revivedProject));
    });
    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = "" + index;
    checkboxLabel.textContent = "Completed";
    checkboxDiv.append(checkbox, checkboxLabel);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit/View";
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", () => {
      revivedProject.removeTodo(index);
      localStorage.setItem(revivedProject.name, JSON.stringify(revivedProject));
      todoDiv.remove();
    });
    editButton.addEventListener("click", () => {
      EditTodo(
        item.title,
        item.description,
        item.dueDate,
        item.priority,
        array[index],
        projectName,
        projectButton,
        todoButton,
        revivedProject
      );
    });
    todoDiv.append(title, dueDate, checkboxDiv, editButton, deleteTodoButton);
    todoList.append(todoDiv);
  });
  deleteButton.addEventListener("click", () => {
    if (projectName !== "DEFAULT") {
      localStorage.removeItem(projectName);
      projectButton.remove();
      todoButton.dataset.project = "";
      mainContent.innerHTML = "";
      const emptyContent = document.createElement("h2");
      emptyContent.textContent = "Please Select A Project";
      mainContent.append(emptyContent);
    } else {
      alert("The DEFAULT project cannot be deleted");
    }
  });
  mainContent.append(contentHeading, todoList);
}
