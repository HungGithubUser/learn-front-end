import { TodoList } from "./js/todolist.js";
import { TodoListViewBuilder } from "./js/todolist.viewbuilder.js";
var list = new TodoList();
document.body.append(new TodoListViewBuilder(list).withInputField().build())