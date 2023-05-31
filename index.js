import { TodoList } from "./js/todolist.js";
import { TodoListView } from "./js/todolist.view.js";
var list = new TodoList();
document.body.append(new TodoListView(list).getToDoListView())