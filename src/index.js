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
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    modifyCheckList() {
        console.log(`before toggle: ${this.checklist}`);
        this.checklist = !this.checklist;
        console.log(`after toggle: ${this.checklist}`);
    }
}

const proj = new Project("Default");
proj.addTodo(new Todo("a","b","c","d","e", false));
console.log(proj.todos[0]);
proj.todos[0].modifyCheckList();
console.log(proj.todos[0]);