'use strict';
import { add, getAll } from "./todolist.js"

add("Learn Javascript")
add("Learn Python")

let list = document.createElement("ol")
document.body.append(list)
for (const item of getAll()) {
    let listItem = document.createElement("li")
    listItem.innerText = item.value.displayedText
    list.append(listItem)
}