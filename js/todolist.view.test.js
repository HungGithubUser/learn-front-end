'use strict';

import { TodoListView } from './todolist.view'
import { TodoListDomBuilder } from './todolist.dom'
import { TodoList } from './todolist'

var actual
var todoList
const learnJavaScript = "learn Java Script"
const learnPython = "learn Python"
const learnJava = "learn Java"
beforeEach(() => {
    todoList = new TodoList()
    let sut = new TodoListView(todoList)
    actual = sut.getToDoListView()
})

test('should add todolist items successfully when input is entered', () => {

    expect(getFirstChild(actual)).toBeTruthy();
    expect(getFirstChild(actual).tagName.toUpperCase()).toEqual("input".toUpperCase())

    let actualInputField = getFirstChild(actual)
    addToDoListItem(actualInputField, learnJavaScript);

    expectFirstTodoListViewIsCorrect(actual);
    expect(actualInputField.value).toBe("");

    addToDoListItem(actualInputField, learnPython);

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

test('should remove first todolist successfully a few times when remove button is clicked', () => {
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnJavaScript);
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnJava);
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnPython);
})

function addToDoListItem(actualInputField, valueToBeAdded) {
    actualInputField.value = valueToBeAdded;
    dispatchEnterEvent(actualInputField);
}

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
    expect(getFirstTodoListDomItem(actual)).toBeTruthy();
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

function getFirstTodoListDomItem(actual) {
    return getFirstChild(getSecondChild(actual));
}

function shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(todoListText) {
    addToDoListItem(getFirstChild(actual), todoListText);
    expect(getFirstTodoListItemDeleteButton()).toBeTruthy();

    getFirstTodoListItemDeleteButton().click();
    expect(todoList.getAll()).toStrictEqual([]);
    expect(getFirstTodoListDomItem(actual)).toBeFalsy();
}

function getFirstTodoListItemDeleteButton() {
    return getFirstTodoListDomItem(actual).querySelector(TodoListDomBuilder.deleteButtonNameQuerySelector);
}