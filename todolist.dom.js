'use strict';
import { getAll } from "./todolist.js"

function getAllAsOrderedList() {
    let list = document.createElement(orderedListTagName())
    for (const item of getAll()) {
        let listItem = document.createElement(listItemTagName())
        listItem.innerText = item.value.displayedText
        list.append(listItem)
    }
    return list
}

function orderedListTagName() { return "ol" }

function listItemTagName() { return "li" }

export { getAllAsOrderedList, orderedListTagName, listItemTagName }