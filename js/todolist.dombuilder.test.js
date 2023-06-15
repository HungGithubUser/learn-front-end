'use strict';

import { CURSOR_POINTER_CSS_CLASS } from './constants.css';
import { BUTTON_TAG_NAME, LIST_ITEM_TAG_NAME, ORDERED_LIST_TAG_NAME } from './constants.dom';
import { TodoList } from './todolist';
import { TodoListDomBuilder } from './todolist.dombuilder'

const learnJavaScript = "learn javascript"
const learnPython = "learn python"
var todoList
var sut
beforeEach(() => {
    todoList = new TodoList()
    sut = new TodoListDomBuilder()
})

test('should have dom', () => { document.createElement("body") })

test('should return 1 list item from getAll', () => {
    shouldReturnOneListItemFromGetAll();
})

test('should return 2 list items from getAll', () => {
    shouldReturnOneListItemFromGetAll()
    todoList.add(learnPython)
    let actual = sut.build(todoList.getAll())
    expect(actual.childElementCount).toEqual(2);
    expect(getSecondListItem(actual).tagName.toUpperCase()).toEqual(LIST_ITEM_TAG_NAME.toUpperCase());
    expect(getSecondListItem(actual).innerText).toEqual(learnPython);
})

test.each(["ordered-todo-list", "ordered-todo-list-1", "ordered-todo-list-2", "ordered-todo-list-1 ordered-todo-list-2"])
    ('should return 1 list item from getAll with correct list css class: %p', (expectedListCssClass) => {
        shouldReturnOneListItemFromGetAll()
        let actual = sut.withListCssClass(expectedListCssClass).build(todoList.getAll())
        expect(actual.className).toEqual(expectedListCssClass)
    })

test.each(["ordered-todo-list--item", "ordered-todo-list--item-1 ordered-todo-list--item"])
    ('should return 1 list item from getAll with correct list css class: %p', (expectedListItemCssClass) => {
        shouldReturnOneListItemFromGetAll()
        let actual = sut.withListItemsCssClass(expectedListItemCssClass).build(todoList.getAll())
        expect(getFirstListItem(actual).className).toEqual(expectedListItemCssClass)
    })

test('should return 1 list item from getAll with delete button', () => {
    shouldReturnOneListItemFromGetAll()
    let actual = sut.withDeleteButtons().build(todoList.getAll())
    shouldHaveACorrectStandardButton(actual);
    expect(getFirstListItemButtons(actual)[0].name).toEqual(TodoListDomBuilder.deleteButtonName)
    expect(getFirstListItemButtons(actual)[0].textContent).toEqual(TodoListDomBuilder.deleteButtonTextContent)
})

test.each(["ordered-todo-list--item", "ordered-todo-list--item-1 ordered-todo-list--item"])
    ('should return 1 list item from getAll with delete button with correct css class: %p', (expectedButtonCssClass) => {
        shouldReturnOneListItemFromGetAll()
        let actual = sut.withDeleteButtons().withDeleteButtonsCssClass(expectedButtonCssClass).build(todoList.getAll())
        shouldHaveACorrectStandardButton(actual);
        expect(getFirstListItemButtons(actual)[0].name).toEqual(TodoListDomBuilder.deleteButtonName)
        expect(getFirstListItemButtons(actual)[0].textContent).toEqual(TodoListDomBuilder.deleteButtonTextContent)
        expect(getFirstListItemButtons(actual)[0].className).toEqual(expectedButtonCssClass)
    })

test('should return 1 list item from getAll with complete button', () => {
    shouldReturnOneListItemFromGetAll()
    let actual = sut.withCompleteButtons().build(todoList.getAll());
    shouldHaveACorrectStandardButton(actual);
    expect(getFirstListItemButtons(actual)[0].name).toEqual(TodoListDomBuilder.completeButtonName)
    expect(getFirstListItemButtons(actual)[0].textContent).toEqual(TodoListDomBuilder.completeButtonTextContent)
})

test('should not have complete button when task is completed', () => {
    setUpActualWithOneCompletedTask();
    let actual = sut.withCompleteButtons().build(todoList.getAll());
    expect(getFirstListItemButtons(actual).length).toEqual(0)
})

test.each(["ordered-todo-list--item-completed", "ordered-todo-list--item-1-completed", "ordered-todo-list--item-2-completed", "ordered-todo-list--item-1-completed ordered-todo-list--item-2-completed"])
    ('completed tasks should have configured css class: %p', (expectedListItemCssClass) => {
        setUpActualWithOneCompletedTask();
        let actual = sut.withCompletedListItemsCssClass(expectedListItemCssClass).build(todoList.getAll())
        expect(getFirstListItem(actual).className).toEqual(expectedListItemCssClass)
    })

test.each(["ordered-todo-list--item-completed", "ordered-todo-list--item-1-completed", "ordered-todo-list--item-2-completed", "ordered-todo-list--item-1-completed ordered-todo-list--item-2-completed"])
    ('completed tasks should have configured css class: %p with cursor pointer', (expectedListItemCssClass) => {
        setUpActualWithOneCompletedTask();
        let actual = sut.withListItemsCursorPointer().withCompletedListItemsCssClass(expectedListItemCssClass).build(todoList.getAll())
        expect(getFirstListItem(actual).classList).toContain(expectedListItemCssClass.split(" ")[0])
        expect(getFirstListItem(actual).classList).toContain(CURSOR_POINTER_CSS_CLASS)
    })

test('should set list items css cursor pointer', () => {
    setUpActualWithOneCompletedTask();
    let actual = sut.withListItemsCursorPointer().build(todoList.getAll())
    expect(getFirstListItem(actual).className).toEqual(CURSOR_POINTER_CSS_CLASS)
})

test('should return all correct delete button elements', () => {
    todoList.add(learnJavaScript);
    todoList.add(learnPython);
    let actual = TodoListDomBuilder.getAllDeleteButtons(sut.withDeleteButtons().build(todoList.getAll()))
    AssertActualHasCorrectButtonsInList(actual, TodoListDomBuilder.deleteButtonName, TodoListDomBuilder.deleteButtonTextContent, TodoListDomBuilder.deleteButtonTitle);
})

test('should return all correct complete button elements', () => {
    todoList.add(learnJavaScript);
    todoList.add(learnPython);
    let actual = TodoListDomBuilder.getAllCompleteButtons(sut.withCompleteButtons().build(todoList.getAll()))
    AssertActualHasCorrectButtonsInList(actual, TodoListDomBuilder.completeButtonName, TodoListDomBuilder.completeButtonTextContent, TodoListDomBuilder.completeButtonTitle);
})

test('should return empty button elements', () => {
    let actual = TodoListDomBuilder.getAllDeleteButtons(sut.withDeleteButtons().build(todoList.getAll()))
    expect(actual.length).toEqual(0)

    actual = TodoListDomBuilder.getAllCompleteButtons(sut.withCompleteButtons().build(todoList.getAll()))
    expect(actual.length).toEqual(0)
})

function shouldReturnOneListItemFromGetAll() {
    todoList.add(learnJavaScript);
    let actual = sut.build(todoList.getAll());
    expect(actual.tagName.toUpperCase()).toEqual(ORDERED_LIST_TAG_NAME.toUpperCase());
    expect(actual.childElementCount).toEqual(1);
    expect(getFirstListItem(actual).tagName.toUpperCase()).toEqual(LIST_ITEM_TAG_NAME.toUpperCase());
    expect(Number(getFirstListItem(actual).value)).toEqual(todoList.getAll()[0].id);
    expect(getFirstListItem(actual).innerText).toEqual(learnJavaScript);
}

function getFirstListItem(actual) {
    return actual.childNodes[0];
}

function getSecondListItem(actual) {
    return actual.childNodes[1];
}

function getFirstListItemButtons(actual) {
    return getFirstListItem(actual).getElementsByTagName(BUTTON_TAG_NAME);
}

function shouldHaveACorrectStandardButton(actual) {
    expect(getFirstListItemButtons(actual).length).toEqual(1);
    expect(Number(getFirstListItemButtons(actual)[0].value)).toEqual(todoList.getTop(1)[0].id);
}

function AssertActualHasCorrectButtonsInList(actual, buttonName, buttonTextContent, buttonTitle) {
    expect(actual.length).toEqual(2);
    expect(Number(actual[0].value)).toEqual(todoList.getTop(1)[0].id);
    expect(actual[0].name).toEqual(buttonName);
    expect(actual[0].textContent).toEqual(buttonTextContent);
    expect(actual[0].title).toEqual(buttonTitle);
    expect(Number(actual[1].value)).toEqual(todoList.getTop(2)[1].id);
    expect(actual[1].name).toEqual(buttonName);
    expect(actual[1].textContent).toEqual(buttonTextContent);
    expect(actual[1].title).toEqual(buttonTitle);
}

function setUpActualWithOneCompletedTask() {
    todoList.add(learnJavaScript);
    todoList.completeTask(todoList.getTop(1)[0].id);
}