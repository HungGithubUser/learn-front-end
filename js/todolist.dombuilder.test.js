'use strict';

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
    expect(getSecondListItem(actual).tagName.toUpperCase()).toEqual(TodoListDomBuilder.listItemTagName.toUpperCase());
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
    expect(getFirstListItemButtons(actual).length).toEqual(1)
    expect(Number(getFirstListItemButtons(actual)[0].value)).toEqual(todoList.getTop(1)[0].id)
    expect(getFirstListItemButtons(actual)[0].name).toEqual(TodoListDomBuilder.deleteButtonName)
    expect(getFirstListItemButtons(actual)[0].textContent).toEqual(TodoListDomBuilder.deleteButtonTextContent)
})


test('should return all correct delete button elements', () => {
    todoList.add(learnJavaScript);
    todoList.add(learnPython);
    let actual = TodoListDomBuilder.getAllDeleteButtons(sut.withDeleteButtons().build(todoList.getAll()))

    expect(actual.length).toEqual(2)
    expect(Number(actual[0].value)).toEqual(todoList.getTop(1)[0].id)
    expect(actual[0].name).toEqual(TodoListDomBuilder.deleteButtonName)
    expect(actual[0].textContent).toEqual(TodoListDomBuilder.deleteButtonTextContent)
    expect(Number(actual[1].value)).toEqual(todoList.getTop(2)[1].id)
    expect(actual[1].name).toEqual(TodoListDomBuilder.deleteButtonName)
    expect(actual[1].textContent).toEqual(TodoListDomBuilder.deleteButtonTextContent)
})

test('should return empty delete button elements', () => {
    let actual = TodoListDomBuilder.getAllDeleteButtons(sut.withDeleteButtons().build(todoList.getAll()))
    expect(actual.length).toEqual(0)
})

function shouldReturnOneListItemFromGetAll() {
    todoList.add(learnJavaScript);
    let actual = sut.build(todoList.getAll());
    expect(actual.tagName.toUpperCase()).toEqual(TodoListDomBuilder.orderedListTagName.toUpperCase());
    expect(actual.childElementCount).toEqual(1);
    expect(getFirstListItem(actual).tagName.toUpperCase()).toEqual(TodoListDomBuilder.listItemTagName.toUpperCase());
    expect(getFirstListItem(actual).innerText).toEqual(learnJavaScript);
}

function getFirstListItem(actual) {
    return actual.childNodes[0];
}

function getSecondListItem(actual) {
    return actual.childNodes[1];
}

function getFirstListItemButtons(actual) {
    return getFirstListItem(actual).getElementsByTagName(TodoListDomBuilder.buttonTagName);
}
