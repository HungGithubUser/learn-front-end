import { TodoList } from "./js/todolist.js";
import { TodoListViewBuilder } from "./js/todolist.viewbuilder.js";
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);
dom.watch();

document.body.append(new TodoListViewBuilder(new TodoList()).withInputField().withCompleteTaskToggleOnItemClick().build())
var iconElement = document.createElement("i");
iconElement.classList.add("fas", "fa-trash");
document.body.append(iconElement);