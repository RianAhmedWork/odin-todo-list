import "./styles.css"
import { parse } from "date-fns";
import { Project, Todo} from "./objects.js"

const addProject = document.getElementById("project-button");
const projectModal = document.getElementById("project-modal");
const projectClose = document.getElementById("project-close");
addProject.addEventListener("click", () => {
    projectModal.showModal();
});
projectClose.addEventListener("click", () => {
    projectModal.close();
});

const todoModal = document.getElementById("todo-modal");
const addTodo = document.getElementById("todo-button");
const todoClose = document.getElementById("todo-close");
addTodo.addEventListener("click", () => {
    todoModal.showModal();
});
todoClose.addEventListener("click", () => {
    todoModal.close();
});



const proj = new Project("Default");
const testDate = parse("2024-01-26", "yyyy-MM-dd", new Date());
proj.addTodo(new Todo("Groceries","Buy groceries for the week", testDate,"d","e"));
console.log(proj.todos[0]);
proj.todos[0].editTodo("Laundry", "Do laundry", parse("2025-05-20", "yyyy-MM-dd", new Date()), "High", "Wash all your clothes properly");
console.log(proj.todos[0].Date);