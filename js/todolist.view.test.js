'use strict'

import { TodoListView } from './todolist.view'
import { TodoList } from './todolist'

var sut
var todoList
beforeEach(() => {
    todoList = new TodoList()
    sut = new TodoListView(todoList)
})

test('should add one todolist item successfully when input is entered', () => {
    let actual = document.createElement("div")
    sut.render(actual)
    expect(getFirstChild(actual)).toBeTruthy();
    expect(getFirstChild(actual).tagName.toUpperCase()).toEqual("input".toUpperCase())
    let actualInputField = getFirstChild(actual)
    actualInputField.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
    expect(getSecondChild(actual)).toBeTruthy();
})

function getFirstChild(htmlElement) {
    return htmlElement.childNodes[0]
}

function getSecondChild(htmlElement) {
    return htmlElement.childNodes[1]
}