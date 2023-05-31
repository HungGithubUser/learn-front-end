'use strict';

import { TodoListView } from './todolist.view'
import { TodoList } from './todolist'

var sut
var todoList
const learnJavaScript = "learn Java Script"
const learnPython = "learn Python"
const learnJava = "learn Java"
beforeEach(() => {
    todoList = new TodoList()
    sut = new TodoListView(todoList)
})

test('should add one todolist item successfully when input is entered', () => {
    let actual = sut.getToDoListView()

    expect(getFirstChild(actual)).toBeTruthy();
    expect(getFirstChild(actual).tagName.toUpperCase()).toEqual("input".toUpperCase())
    let actualInputField = getFirstChild(actual)

    actualInputField.value = learnJavaScript
    dispatchEnterEvent(actualInputField);

    expectFirstTodoListViewIsCorrect(actual);
    expect(actualInputField.value).toBe("");

    actualInputField.value = learnPython
    dispatchEnterEvent(actualInputField);

    expectFirstTodoListViewIsCorrect(actual);
    expectSecondTodoListViewIsCorrect(actual);
    expect(actualInputField.value).toBe("");

    actualInputField.value = learnJava
    actualInputField.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
    expectFirstTodoListViewIsCorrect(actual, actualInputField);
    expectSecondTodoListViewIsCorrect(actual);
    expect(todoList.getAll().length).toEqual(2)
    expect(actualInputField.value).toBe(learnJava);
})

function dispatchEnterEvent(actualInputField) {
    actualInputField.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
}

function expectSecondTodoListViewIsCorrect(actual) {
    expect(getSecondTodoListItem()).toBeTruthy();
    expect(getSecondTodoListItem().value.displayedText).toBe(learnPython);
    expect(getSecondChild(getSecondChild(actual))).toBeTruthy();
}

function expectFirstTodoListViewIsCorrect(actual) {
    expect(getSecondChild(actual)).toBeTruthy();
    expect(getFirstTodoListItem()).toBeTruthy();
    expect(getFirstTodoListItem().value.displayedText).toBe(learnJavaScript);
    expect(getSecondChild(actual).tagName.toUpperCase()).toEqual("ol".toUpperCase());
    expect(getFirstChild(getSecondChild(actual))).toBeTruthy();
}

function getFirstTodoListItem() {
    return todoList.getTop(1)[0];
}

function getSecondTodoListItem() {
    return todoList.getTop(2)[1];
}

function getFirstChild(htmlElement) {
    return htmlElement.childNodes[0]
}

function getSecondChild(htmlElement) {
    return htmlElement.childNodes[1]
}