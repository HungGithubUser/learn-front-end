'use strict';

import { TodoList } from "./todolist"

const learnJavaScript = "learn javascript"
const learnPython = "learn python"
const learnCsharp = "learn csharp"
const learnJava = "learn java"
var todoList
beforeEach(() => { todoList = new TodoList() })

test('should set to do list', () => {
  todoList.add(learnJavaScript)
})

test('should get empty to do list', () => {
  expect(todoList.getAll()).toStrictEqual([])
})

describe('should return correct set to do item in list', () => {
  const cases = [[learnPython, learnJavaScript, learnCsharp], [learnJavaScript, learnPython, learnCsharp], [learnPython, learnCsharp, learnJavaScript]]
  test.each(cases)('set %p %p %p as todo items', (firstTodoItem, secondTodoItem, thirdTodoItem) => {
    todoList.add(firstTodoItem);
    todoList.add(secondTodoItem);
    todoList.add(thirdTodoItem);
    expect(getAllToDoListDisplayedText()).toStrictEqual([firstTodoItem, secondTodoItem, thirdTodoItem]);
  });
})

test('should remove to do list', () => {
  todoList.removeById(1);
  expect(todoList.getAll()).toStrictEqual([])
})

test('should have empty to do list when remove to do list', () => {
  todoList.add(learnJavaScript);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJavaScript));
  expect(getAllToDoListDisplayedText()).toStrictEqual([])
})

test('should have one to do list when remove to do list', () => {
  todoList.add(learnJavaScript);
  todoList.add(learnPython);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJavaScript));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnPython])
})

test('should have two to do list when remove middle to do list', () => {
  todoList.add(learnJavaScript);
  todoList.add(learnPython);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnPython));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnCsharp])
})


test('should have two to do list when remove two middle to do list', () => {
  todoList.add(learnJavaScript);
  todoList.add(learnPython);
  todoList.add(learnJava);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnPython));
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJava));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnCsharp])
})

test('should have two to do list when remove two last to do list', () => {
  todoList.add(learnJavaScript);
  todoList.add(learnPython);
  todoList.add(learnJava);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp));
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJava));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnPython])
})

test('should have two to do list when remove two first to do list', () => {
  todoList.add(learnJavaScript);
  todoList.add(learnPython);
  todoList.add(learnJava);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJavaScript));
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnPython));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJava, learnCsharp])
})

test('should have one to do list when remove two same to do list', () => {
  todoList.add(learnCsharp);
  todoList.add(learnCsharp);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp));
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnCsharp])
})

test('should return 1 item for get top when there is 1 item in list', () => {
  todoList.add(learnCsharp)
  const actual = todoList.getTop(10)
  expect(actual.length).toEqual(1)
  expect(toDisplayedTextArray(actual)).toStrictEqual([learnCsharp])
})

test('should return 1 item for get top when there is more than 1 item in list', () => {
  todoList.add(learnCsharp)
  todoList.add(learnCsharp)
  const actual = todoList.getTop(1)
  expect(actual.length).toEqual(1)
  expect(toDisplayedTextArray(actual)).toStrictEqual([learnCsharp])
})

test('should return 2 item for get top when there are 2 items in list', () => {
  todoList.add(learnCsharp)
  todoList.add(learnCsharp)
  const actual = todoList.getTop(2)
  expect(actual.length).toEqual(2)
  expect(toDisplayedTextArray(actual)).toStrictEqual([learnCsharp, learnCsharp])
})

test('should return 0 item for get top when there is more than 1 item in list', () => {
  todoList.add(learnCsharp)
  todoList.add(learnCsharp)
  expect(todoList.getTop(0).length).toEqual(0)
})

test('should return 0 item for get top when there is 0 item in list', () => {
  expect(todoList.getTop(10).length).toEqual(0)
})

function getAllToDoListDisplayedText() {
  return toDisplayedTextArray(todoList.getAll())
}

function getFirstTodoListIdByDisplayedText(text) {
  return todoList.getAll().find(x => x.value.displayedText == text).id
}

function toDisplayedTextArray(array) {
  return array.map(x => x.value.displayedText)
}