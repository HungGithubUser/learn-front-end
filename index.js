import { TodoList } from "./js/todolist.js";
import { TodoListDom } from "./js/todolist.dom.js";
var list = new TodoList();
document.body.append(new TodoListDom(list)
    .withListCssClass("ordered-todo-list")
    .withListItemsCssClass("ordered-todo-list--items")
    .getAllAsOrderedList())