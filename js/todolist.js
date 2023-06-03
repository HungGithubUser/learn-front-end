'use strict';

const IdStartingValue = 1

class ItemValue {
    constructor(displayedText) {
        this.displayedText = displayedText;
        this.isCompleted = false;
    }
}

class ListItem {
    constructor(id) {
        if (!id) {
            throw new Error("Must supply an id")
        }
        this.id = id
    }
}

class LinkedList {
    #nodeIdToNode
    #currentId
    #tail
    #head
    
    constructor() {
        this.#nodeIdToNode = []
        this.#currentId = IdStartingValue
    }

    append(todoItemValue) {
        let node = this.#createNodeWithValue(todoItemValue);

        if (!this.#head) {
            this.#head = node;
            return
        }

        this.#appendNodeToEndOfList(node);
        this.#tail = node;
    }

    toArray() {
        let todoItems = []

        if (this.#head) {
            this.#fillArrayWithAllNodes(todoItems);
        }

        return todoItems
    }

    getTopNodeAsArray(count) {
        let todoItems = []

        if (count > 0 && this.#head) {
            this.#fillArrayWithTopNNodes(todoItems, count);

        }

        return todoItems
    }

    removeNode(id) {
        if (!this.#nodeIdToNode[id]) {
            return;
        }

        let node = this.#nodeIdToNode[id]

        if (!node) {
            return
        }

        if (node == this.#head) {
            this.#removeHead();
            return
        }

        if (node == this.#tail) {
            this.#removeTail();
            return
        }

        if (node.next) {
            this.#removeNode(node);
        }
    }

    setIsCompleted(id, isCompleted) {
        if (this.#nodeIdToNode[id]) {
            this.#nodeIdToNode[id].value.isCompleted = isCompleted
        }
    }

    #createNodeWithValue(todoItemValue) {
        let node = new ListItem(this.#currentId++);
        this.#nodeIdToNode[node.id] = node
        node.value = todoItemValue;
        return node;
    }

    #appendNodeToEndOfList(node) {
        if (this.#tail) {
            this.#tail.next = node;
            node.prev = this.#tail;
        }

        else {
            this.#head.next = node;
            node.prev = this.#head;
        }
    }

    #fillArrayWithAllNodes(array) {
        array.push(this.#head);
        let next = this.#head.next;
        while (next) {
            array.push(next);
            next = next.next;
        }
    }

    #fillArrayWithTopNNodes(array, n) {
        array.push(this.#head)
        let remain = n - 1
        let next = this.#head.next
        while (remain-- > 0 && next) {
            array.push(next)
            next = next.next;
        }
    }

    #removeTail() {
        this.#tail = this.#tail.prev;
        this.#tail.next = undefined;
    }

    #removeHead() {
        if (!this.#head.next) {
            this.#head = undefined;
        }
        else {
            this.#head = this.#head.next;
        }
    }

    #removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

export class TodoList {
    #todoList

    constructor() {
        this.#todoList = new LinkedList()
    }

    add(itemDisplayedText) {
        this.#todoList.append(new ItemValue(itemDisplayedText))
    }

    getAll() {
        return this.#todoList.toArray()
    }

    getTop(count) {
        return this.#todoList.getTopNodeAsArray(count)
    }

    removeById(id) {
        this.#todoList.removeNode(id)
    }

    completeTask(id) {
        this.#todoList.setIsCompleted(id, true)
    }
}