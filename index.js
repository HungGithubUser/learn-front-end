import { TodoList } from "./js/todolist.js";
import { TodoListViewBuilder } from "./js/todolist.viewbuilder.js";
document.body.append(new TodoListViewBuilder(new TodoList()).withInputField().build())