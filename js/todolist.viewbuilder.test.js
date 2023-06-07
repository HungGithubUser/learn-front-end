'use strict';

import { TodoListViewBuilder } from './todolist.viewbuilder'
import { TodoListDomBuilder } from './todolist.dombuilder'
import { TodoList } from './todolist'
import { INPUT_TAG_NAME, ORDERED_LIST_TAG_NAME } from './constants.dom';

var actual
var todoList
const learnJavaScript = "learn Java Script"
const learnPython = "learn Python"
const learnJava = "learn Java"
beforeEach(() => {
    todoList = new TodoList()
    let sut = new TodoListViewBuilder(todoList)
    actual = sut.withInputField().withCompleteTaskButtons().build()
})

test('should add todolist items successfully when input is entered', () => {
    shouldAddTotoListItemsSuccessfullyWhenInputIsEntered();
})

test('should remove first todolist successfully a few times when remove button is clicked', () => {
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnJavaScript);
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnJava);
    shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(learnPython);
})

test('should remove second todolist successfully when remove button is clicked then add function will work normally', () => {
    let actualInputField = getFirstChild(actual)
    addToDoListItem(actualInputField, learnJavaScript);
    shouldRemoveSecondTodoListSuccessfullyWhenRemoveButtonIsClicked(actualInputField, learnJava);
    shouldRemoveSecondTodoListSuccessfullyWhenRemoveButtonIsClicked(actualInputField, learnJavaScript);
    shouldRemoveSecondTodoListSuccessfullyWhenRemoveButtonIsClicked(actualInputField, learnPython);
    getFirstTodoListItemDeleteButton().click();
    shouldAddTotoListItemsSuccessfullyWhenInputIsEntered()
})

test('should not exists input field when built without input field', () => {
    let actualWithoutInput = new TodoListViewBuilder(todoList).build()

    expect(getFirstChild(actualWithoutInput)).toBeTruthy();
    expect(getFirstChild(actualWithoutInput).tagName.toUpperCase())
        .toEqual(ORDERED_LIST_TAG_NAME.toUpperCase())
})

test('should complete todolist item successfully when complete button is clicked', () => {
    addToDoListItem(getFirstChild(actual), learnJava);
    expect(getFirstTodoListItemCompleteButton(actual)).toBeTruthy();

    getFirstTodoListItemCompleteButton(actual).click();
    expect(getFirstTodoListItem().value.isCompleted).toBe(true);
    expect(getFirstTodoListItemCompleteButton(actual)).toBeFalsy();
})

test('should toggle todolist item successfully when list item is clicked', () => {
    let actualWithCompleteTaskOnItemClick = new TodoListViewBuilder(todoList)
        .withInputField()
        .withCompleteTaskToggleOnItemClick()
        .build()

    addToDoListItem(getFirstChild(actualWithCompleteTaskOnItemClick), learnJava);
    expect(getFirstTodoListDomItemFromDomItem(actualWithCompleteTaskOnItemClick)).toBeTruthy();

    getFirstTodoListDomItemFromDomItem(actualWithCompleteTaskOnItemClick).click();
    expect(getFirstTodoListItem().value.isCompleted).toBe(true);
    getFirstTodoListDomItemFromDomItem(actualWithCompleteTaskOnItemClick).click();
    expect(getFirstTodoListItem().value.isCompleted).toBe(false);
})

test('should not toggle todolist when list item is clicked', () => {
    addToDoListItem(getFirstChild(actual), learnJava);
    expect(getFirstTodoListDomItemFromDomItem(actual)).toBeTruthy();

    getFirstTodoListDomItemFromDomItem(actual).click();
    expect(getFirstTodoListItem().value.isCompleted).toBe(false);
    getFirstTodoListDomItemFromDomItem(actual).click();
    expect(getFirstTodoListItem().value.isCompleted).toBe(false);
})

test('should not exists complete buttons when built without complete buttons', () => {
    let actualWithoutCompleteButton = new TodoListViewBuilder(todoList).withInputField().build()

    addToDoListItem(getFirstChild(actualWithoutCompleteButton), learnJava);
    expect(getFirstTodoListItemCompleteButton(actualWithoutCompleteButton)).toBeFalsy();
})

function shouldAddTotoListItemsSuccessfullyWhenInputIsEntered() {
    expect(getFirstChild(actual)).toBeTruthy();
    expect(getFirstChild(actual).tagName.toUpperCase()).toEqual(INPUT_TAG_NAME.toUpperCase());

    let actualInputField = getFirstChild(actual);
    addToDoListItem(actualInputField, learnJavaScript);

    assertFirstTodoListViewIsCorrect();
    expect(actualInputField.value).toBe("");

    addToDoListItem(actualInputField, learnPython);

    assertFirstTodoListViewIsCorrect();
    assertSecondTodoListViewIsCorrect();
    expect(actualInputField.value).toBe("");

    actualInputField.value = learnJava;
    actualInputField.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
    assertFirstTodoListViewIsCorrect();
    assertSecondTodoListViewIsCorrect();
    expect(todoList.getAll().length).toEqual(2);
    expect(actualInputField.value).toBe(learnJava);
}

function addToDoListItem(actualInputField, valueToBeAdded) {
    actualInputField.value = valueToBeAdded;
    dispatchEnterEvent(actualInputField);
}

function dispatchEnterEvent(actualInputField) {
    actualInputField.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
}

function assertSecondTodoListViewIsCorrect() {
    expect(getSecondTodoListItem()).toBeTruthy();
    expect(getSecondTodoListItem().value.displayedText).toBe(learnPython);
    expect(getSecondTodoListDomItem()).toBeTruthy();
}

function assertFirstTodoListViewIsCorrect() {
    expect(getSecondChild(actual)).toBeTruthy();
    expect(getFirstTodoListItem()).toBeTruthy();
    expect(getFirstTodoListItem().value.displayedText).toBe(learnJavaScript);
    expect(getSecondChild(actual).tagName.toUpperCase()).toEqual("ol".toUpperCase());
    expect(getFirstTodoListDomItem()).toBeTruthy();
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

function getFirstTodoListDomItem() {
    return getFirstTodoListDomItemFromDomItem(actual);
}

function getFirstTodoListDomItemFromDomItem(todoListDomItem) {
    return getFirstChild(getSecondChild(todoListDomItem));
}

function getSecondTodoListDomItem() {
    return getSecondChild(getSecondChild(actual));
}

function shouldRemoveFirstTodoListSuccessfullyWhenRemoveButtonIsClicked(todoListText) {
    addToDoListItem(getFirstChild(actual), todoListText);
    expect(getFirstTodoListItemDeleteButton()).toBeTruthy();

    getFirstTodoListItemDeleteButton().click();
    expect(todoList.getAll()).toStrictEqual([]);
    expect(getFirstTodoListDomItem()).toBeFalsy();
}

function shouldRemoveSecondTodoListSuccessfullyWhenRemoveButtonIsClicked(actualInputField, todoListText) {
    addToDoListItem(actualInputField, todoListText);
    expect(getSecondTodoListItemDeleteButton()).toBeTruthy();

    getSecondTodoListItemDeleteButton().click();
    expect(todoList.getAll().length).toEqual(1);
    expect(getSecondTodoListDomItem()).toBeFalsy();
}

function getFirstTodoListItemDeleteButton() {
    return TodoListDomBuilder.getAllDeleteButtons(getSecondChild(actual))[0];
}

function getFirstTodoListItemCompleteButton(actualTodoList) {
    return TodoListDomBuilder.getAllCompleteButtons(getSecondChild(actualTodoList))[0];
}

function getSecondTodoListItemDeleteButton() {
    return TodoListDomBuilder.getAllDeleteButtons(getSecondChild(actual))[1];
}