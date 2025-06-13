import "./styles.css"
import { parse } from "date-fns";
import { Project, Todo} from "./objects.js"
import { addNewProject, addNewTodo, createDefaultProject } from "./domLogic.js";

addNewProject();
addNewTodo();
createDefaultProject();

// const todoModal = document.getElementById("todo-modal");
// const addTodo = document.getElementById("todo-button");
// const todoClose = document.getElementById("todo-close");
// addTodo.addEventListener("click", () => {
//     todoModal.showModal();
// });
// todoClose.addEventListener("click", () => {
//     todoModal.close();
// });



const proj = new Project("Default");
const testDate = parse("2024-01-26", "yyyy-MM-dd", new Date());
proj.addTodo(new Todo("Groceries","Buy groceries for the week", testDate,"d"));
console.log(proj.todos[0]);
proj.todos[0].editTodo("Laundry", "Do laundry", parse("2025-05-20", "yyyy-MM-dd", new Date()), "High");
console.log(proj.todos[0].Date);