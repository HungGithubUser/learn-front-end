import { add as addToDoList, reset as readdToDoList, getAll as getAllToDoList, removeById as removeToDoList } from "./todolist"

const learnJavaScript = "learn javascript"
const learnPython = "learn python"
const learnCsharp = "learn csharp"
const learnJava = "learn java"

beforeEach(() => { readdToDoList() })

test('should set to do list', () => { addToDoList(learnJavaScript) })

test('should get empty to do list', () => { expect(getAllToDoList()).toStrictEqual([]) })

describe('should return correct set to do item in list', () => {
  const cases = [[learnPython, learnJavaScript, learnCsharp], [learnJavaScript, learnPython, learnCsharp], [learnPython, learnCsharp, learnJavaScript]]
  test.each(cases)('set %p %p %p as todo items', (firstTodoItem, secondTodoItem, thirdTodoItem) => {
    addToDoList(firstTodoItem);
    addToDoList(secondTodoItem);
    addToDoList(thirdTodoItem);
    expect(getAllToDoList().map(x => x.value.displayedText)).toStrictEqual([firstTodoItem, secondTodoItem, thirdTodoItem]);
  });
})

test('should remove to do list', () => {
  removeToDoList(1);
  expect(getAllToDoList()).toStrictEqual([])
})

test('should have empty to do list when remove to do list', () => {
  addToDoList(learnJavaScript);
  removeToDoList(getTodoListIdByDisplayedText(learnJavaScript));
  expect(getAllToDoList()).toStrictEqual([])
})

test('should have one to do list when remove to do list', () => {
  addToDoList(learnJavaScript);
  addToDoList(learnPython);
  removeToDoList(getTodoListIdByDisplayedText(learnJavaScript));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnPython])
})

test('should have two to do list when remove middle to do list', () => {
  addToDoList(learnJavaScript);
  addToDoList(learnPython);
  addToDoList(learnCsharp);
  removeToDoList(getTodoListIdByDisplayedText(learnPython));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnCsharp])
})


test('should have two to do list when remove two middle to do list', () => {
  addToDoList(learnJavaScript);
  addToDoList(learnPython);
  addToDoList(learnJava);
  addToDoList(learnCsharp);
  removeToDoList(getTodoListIdByDisplayedText(learnPython));
  removeToDoList(getTodoListIdByDisplayedText(learnJava));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnCsharp])
})

test('should have two to do list when remove two last to do list', () => {
  addToDoList(learnJavaScript);
  addToDoList(learnPython);
  addToDoList(learnJava);
  addToDoList(learnCsharp);
  removeToDoList(getTodoListIdByDisplayedText(learnCsharp));
  removeToDoList(getTodoListIdByDisplayedText(learnJava));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJavaScript, learnPython])
})

test('should have two to do list when remove two first to do list', () => {
  addToDoList(learnJavaScript);
  addToDoList(learnPython);
  addToDoList(learnJava);
  addToDoList(learnCsharp);
  removeToDoList(getTodoListIdByDisplayedText(learnJavaScript));
  removeToDoList(getTodoListIdByDisplayedText(learnPython));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnJava, learnCsharp])
})

test('should have one to do list when remove two same to do list', () => {
  addToDoList(learnCsharp);
  addToDoList(learnCsharp);
  addToDoList(learnCsharp);
  removeToDoList(getTodoListIdByDisplayedText(learnCsharp));
  removeToDoList(getTodoListIdByDisplayedText(learnCsharp));
  expect(getAllToDoListDisplayedText()).toStrictEqual([learnCsharp])
})

function getAllToDoListDisplayedText() {
  return getAllToDoList().map(x => x.value.displayedText)
}

function getTodoListIdByDisplayedText(text) {
  return getAllToDoList().find(x => x.value.displayedText == text).id
}