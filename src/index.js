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
        if (this.checklist === true) {
            this.checklist = false;
        } else {
            this.checklist = true;
        }
    }
}