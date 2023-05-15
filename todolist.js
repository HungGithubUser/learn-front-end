'use strict';
const IdStartingValue = 1

class TodoItemValue {
    constructor(displayedText) {
        this.displayedText = displayedText;
    }
}

class TodoItem {
    constructor(id) {
        if (!id) {
            throw new Error("Must supply an id")
        }
        this.id = id
    }
}

class TodoList {
    constructor() {
        this.nodeIdToNode = []
        this.currentId = IdStartingValue
    }

    append(todoItemValue) {
        let node = this.#createNodeWithValue(todoItemValue);

        if (!this.head) {
            this.head = node;
            return
        }

        this.#appendNodeToEndOfList(node);
        this.tail = node;
    }

    toArray() {
        let todoItems = []

        if (this.head) {
            this.#fillArrayWithNodes(todoItems);
        }

        return todoItems
    }

    removeNode(id) {
        if (!this.nodeIdToNode[id]) {
            return;
        }

        let node = this.nodeIdToNode[id]

        if (!node) {
            return
        }

        if (node == this.head) {
            this.#removeHead();
            return
        }

        if (node == this.tail) {
            this.#removeTail();
            return
        }

        if (node.next) {
            this.#removeNode(node);
        }
    }

    #createNodeWithValue(todoItemValue) {
        let node = new TodoItem(this.currentId++);
        this.nodeIdToNode[node.id] = node
        node.value = todoItemValue;
        return node;
    }

    #appendNodeToEndOfList(node) {
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
        }

        else {
            this.head.next = node;
            node.prev = this.head;
        }
    }

    #fillArrayWithNodes(array) {
        array.push(this.head);
        let next = this.head.next;
        while (next) {
            array.push(next);
            next = next.next;
        }
    }

    #removeTail() {
        this.tail = this.tail.prev;
        this.tail.next = undefined;
    }

    #removeHead() {
        if (!this.head.next) {
            this.head = undefined;
        }
        else {
            this.head = this.head.next;
        }
    }

    #removeNode(node) {
    node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

var todoList = new TodoList()

function add(itemDisplayedText) {
    todoList.append(new TodoItemValue(itemDisplayedText))
}

function getAll() {
    return todoList.toArray()
}

function reset() {
    todoList = new TodoList()
}

function removeById(id) {
    todoList.removeNode(id)
}

export { add, getAll, reset, removeById };