import { DIV_TAG_NAME } from "./js/constants.dom.js";
import { TodoList } from "./js/todolist.js";
import { TodoListViewBuilder } from "./js/todolist.viewbuilder.js";

let containerDivElement = getNewDivElement("container-fluid")
let rowDivElement = getNewDivElement("row justify-content-center")
let todoListView = new TodoListViewBuilder(new TodoList()).withInputField().withOuterDivElementCssClass("col-6").withCompleteTaskToggleOnItemClick().build()
containerDivElement.appendChild(rowDivElement)
rowDivElement.appendChild(todoListView)
document.body.append(containerDivElement)

function getNewDivElement(cssClass) {
    let element = document.createElement(DIV_TAG_NAME);
    element.classList = cssClass
    return element
}
