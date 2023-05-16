'use strict';

import { add as addToDoList, reset as resetToDoList } from './todolist'
import { getAllAsOrderedList, listItemTagName, orderedListTagName } from './todolist.dom'

const learnJavaScript = "learn javascript"

beforeEach(() => {
    resetToDoList();
    addToDoList(learnJavaScript)
})

test('should have dom', () => { document.createElement("body") })

test('should return list from getAll', () => {
    let actual = getAllAsOrderedList()
    expect(actual.tagName.toUpperCase).toEqual(orderedListTagName().toUpperCase)
    expect(actual.childElementCount).toEqual(1)
    expect(getFirstListItem(actual).tagName.toUpperCase).toEqual(listItemTagName().toUpperCase)
    expect(getFirstListItem(actual).innerText).toEqual(learnJavaScript)
})

function getFirstListItem(actual) {
    return actual.childNodes[0];
}
