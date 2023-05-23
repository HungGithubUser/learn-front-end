import { TodoList } from "./todolist.js";
import { TodoListDom } from "./todolist.dom.js";
var list = new TodoList();
list.add("Learn Python")
list.add("Learn Javascript")
list.add("Learn Java")
list.add("Learn C#")
list.add("Learn Css")
list.add("Learn Html")
list.add("Learn Something")
var dom = new TodoListDom(list)
var orderedList = dom
    .withListCssClass("ordered-todo-list")
    .withListItemsCssClass("ordered-todo-list--items")
    .getAllAsOrderedList()
document.body.append(orderedList)