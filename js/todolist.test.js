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
    expect(getAllToDoListIsCompletedStatus()).toStrictEqual([false, false, false])
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

test('should add todolist back successfully when removing all todoList', () => {
  todoList.add(learnJava);
  todoList.add(learnCsharp);
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnJava));
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp));
  todoList.add(learnJava);
  todoList.add(learnCsharp);
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJava, learnCsharp])
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

test('should return 1 item for get top with offset correctly', () => {
  todoList.add(learnCsharp)
  todoList.add(learnJava)
  const afterId = todoList.getTop(1)[0].id
  const actual = todoList.getTop(1, afterId)
  expect(actual.length).toEqual(1)
  expect(toDisplayedTextArray(actual)).toStrictEqual([learnJava])

})

test('should get last correctly',()=>{
  todoList.add(learnCsharp)
  const actual = todoList.getLast(1)
  expect(toDisplayedTextArray(actual)).toStrictEqual([learnCsharp])
  todoList.add(learnJava)
  const actual2 = todoList.getLast(1)
  expect(toDisplayedTextArray(actual2)).toStrictEqual([learnJava])
  const actual3 = todoList.getLast(2)
  expect(toDisplayedTextArray(actual3)).toStrictEqual([learnCsharp,learnJava])
})

test('should return empty list for not exist afterId', () => {
  const actual = todoList.getTop(1, 10)
  expect(actual.length).toEqual(0)
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

test('should complete task successfully', () => {
  shouldCompleteTaskSuccessfully(learnCsharp);
})

test('should complete empty task successfully', () => {
  todoList.add(learnCsharp)
  todoList.completeTask(-1)
})

test('should incomplete task successfully', () => {
  shouldCompleteTaskSuccessfully(learnCsharp)
  todoList.incompleteTask(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(getAllToDoListIsCompletedStatus()).toStrictEqual([false])
})

test('should incomplete empty task successfully', () => {
  todoList.add(learnCsharp)
  todoList.incompleteTask(-1)
})

test('should toggle complete task successfully', () => {
  todoList.add(learnCsharp)
  expect(getAllToDoListIsCompletedStatus()).toStrictEqual([false])
  todoList.toggleCompleteTask(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(getAllToDoListIsCompletedStatus()).toStrictEqual([true])
  todoList.toggleCompleteTask(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(getAllToDoListIsCompletedStatus()).toStrictEqual([false])
})

test('should toggle complete empty task successfully', () => {
  todoList.toggleCompleteTask(-1)
})
test('should get total count correctly', () => {
  expect(todoList.getTotalCount()).toEqual(0)
  todoList.add(learnCsharp)
  expect(todoList.getTotalCount()).toEqual(1)
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(todoList.getTotalCount()).toEqual(0)
  
  todoList.add(learnCsharp)
  todoList.add(learnCsharp)
  expect(todoList.getTotalCount()).toEqual(2)
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(todoList.getTotalCount()).toEqual(1)
  todoList.removeById(getFirstTodoListIdByDisplayedText(learnCsharp))
  expect(todoList.getTotalCount()).toEqual(0)
})

function shouldCompleteTaskSuccessfully(taskName) {
  todoList.add(taskName);
  todoList.completeTask(getFirstTodoListIdByDisplayedText(taskName));
  expect(getAllToDoListIsCompletedStatus()).toStrictEqual([true]);
}

function getAllToDoListDisplayedText() {
  return toDisplayedTextArray(todoList.getAll())
}

function getAllToDoListIsCompletedStatus() {
  return toIsCompletedStatusArray(todoList.getAll())
}

function getFirstTodoListIdByDisplayedText(text) {
  return todoList.getAll().find(x => x.value.displayedText == text).id
}

function toDisplayedTextArray(array) {
  return array.map(x => x.value.displayedText)
}

function toIsCompletedStatusArray(array) {
  return array.map(x => x.value.isCompleted)
}