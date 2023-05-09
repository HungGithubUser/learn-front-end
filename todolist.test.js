import { set as setToDoList, getAll as getAllToDoList, reset as resetToDoList, remove as removeToDoList } from "./todolist"

const learnJavaScript = "learn javascript"
const learnPython = "learn python"
const learnCsharp = "learn csharp"
const learnJava = "learn java"

beforeEach(() => { resetToDoList() })

test('should set to do list', () => { setToDoList(learnJavaScript) })

test('should get empty to do list', () => { expect(getAllToDoList()).toStrictEqual([]) })

describe('should return correct set to do item in list', () => {
  const cases = [[learnPython, learnJavaScript, learnCsharp], [learnJavaScript, learnPython, learnCsharp], [learnPython, learnCsharp, learnJavaScript]]
  test.each(cases)('set %p %p %p as todo items', (firstTodoItem, secondTodoItem, thirdTodoItem) => {
    setToDoList(firstTodoItem);
    setToDoList(secondTodoItem);
    setToDoList(thirdTodoItem);
    expect(getAllToDoList()).toStrictEqual([firstTodoItem, secondTodoItem, thirdTodoItem]);
  });
})

test('should remove to do list', () => {
  removeToDoList(learnJavaScript);
  expect(getAllToDoList()).toStrictEqual([])
})

test('should have empty to do list when remove to do list', () => {
  setToDoList(learnJavaScript);
  removeToDoList(learnJavaScript);
  expect(getAllToDoList()).toStrictEqual([])
})

test('should have one to do list when remove to do list', () => {
  setToDoList(learnJavaScript);
  setToDoList(learnPython);
  removeToDoList(learnJavaScript);
  expect(getAllToDoList()).toStrictEqual([learnPython])
})

test('should have two to do list when remove middle to do list', () => {
  setToDoList(learnJavaScript);
  setToDoList(learnPython);
  setToDoList(learnCsharp);
  removeToDoList(learnPython);
  expect(getAllToDoList()).toStrictEqual([learnJavaScript, learnCsharp])
})

test('should have two to do list when remove two middle to do list', () => {
  setToDoList(learnJavaScript);
  setToDoList(learnPython);
  setToDoList(learnJava);
  setToDoList(learnCsharp);
  removeToDoList(learnPython);
  removeToDoList(learnJava);
  expect(getAllToDoList()).toStrictEqual([learnJavaScript, learnCsharp])
})

test('should have two to do list when remove two last to do list', () => {
  setToDoList(learnJavaScript);
  setToDoList(learnPython);
  setToDoList(learnJava);
  setToDoList(learnCsharp);
  removeToDoList(learnCsharp);
  removeToDoList(learnJava);
  expect(getAllToDoList()).toStrictEqual([learnJavaScript, learnPython])
})

test('should have two to do list when remove two first to do list', () => {
  setToDoList(learnJavaScript);
  setToDoList(learnPython);
  setToDoList(learnJava);
  setToDoList(learnCsharp);
  removeToDoList(learnJavaScript);
  removeToDoList(learnPython);
  expect(getAllToDoList()).toStrictEqual([learnJava, learnCsharp])
})