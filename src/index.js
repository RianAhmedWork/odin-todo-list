import { parse } from "date-fns";

// create a project class under which our todos will be stored
class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        if (todo instanceof Todo) {
        this.todos.push(todo);
        } else {
            throw new Error("Only Todo instances can be added");
        }
    }
}

// create a todo class which will have title, description, due date
// priority, notes and checklist
class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = false;
    }

    modifyCheckList() {
        console.log(`before toggle: ${this.checklist}`);
        this.checklist = !this.checklist;
        console.log(`after toggle: ${this.checklist}`);
    }

    editTodo(newTitle, newDescription, newDueDate, newPriority, newNotes) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.notes = newNotes;
    }
}

const proj = new Project("Default");
const testDate = parse("2024-01-26", "yyyy-MM-dd", new Date());
proj.addTodo(new Todo("Groceries","Buy groceries for the week", testDate,"d","e"));
console.log(proj.todos[0].dueDate);