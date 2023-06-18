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
    #totalCount

    constructor() {
        this.#nodeIdToNode = []
        this.#currentId = IdStartingValue
        this.#totalCount = 0
    }

    append(todoItemValue) {
        this.#totalCount++
        let node = this.#createNodeWithValue(todoItemValue);

        if (!this.#head) {
            this.#head = node;
            this.#tail = node;
            return
        }

        this.#appendNodeToEndOfList(node);
    }

    toArray() {
        let todoItems = []

        if (this.#head) {
            this.#fillArrayWithAllNodes(todoItems);
        }

        return todoItems
    }


    getTopNodeAsArray(count, afterId) {
        const parameters = {
            todoItems: [],
            count: count,
            addNode: (node, todoItems) => todoItems.push(node),
            getNext: (node) => node.next,
            cursorId: afterId,
            firstNode: this.#head
        }
        return this.#getNodeAsArray(parameters)
    }

    getLastNodeAsArray(count, beforeId) {
        const parameters = {
            todoItems: [],
            count: count,
            addNode: (node, todoItems) => todoItems.unshift(node),
            getNext: (node) => node.prev,
            cursorId: beforeId,
            firstNode: this.#tail
        }
        return this.#getNodeAsArray(parameters)
    }

    #getNodeAsArray(parameters) {
        if (parameters.count <= 0) {
            return parameters.todoItems
        }

        if (parameters.cursorId == undefined && parameters.firstNode) {
            parameters.node = parameters.firstNode
            this.#fillArrayWithNodes(parameters);
        }
        
        if (parameters.cursorId != undefined && this.#nodeIdToNode[parameters.cursorId] && parameters.getNext(this.#nodeIdToNode[parameters.cursorId])) {
            parameters.node = parameters.getNext(this.#nodeIdToNode[parameters.cursorId])
            this.#fillArrayWithNodes(parameters);
        }
        return parameters.todoItems
    }

    removeNode(id) {
        if (!this.#nodeIdToNode[id]) {
            return;
        }

        this.#totalCount--

        let node = this.#nodeIdToNode[id]

        if (node == this.#head && node == this.#tail) {
            this.#removeHead();
            this.#removeTail()
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

    toggleIsCompleted(id) {
        if (this.#nodeIdToNode[id]) {
            this.#nodeIdToNode[id].value.isCompleted = !this.#nodeIdToNode[id].value.isCompleted
        }
    }

    getTotalCount() {
        return this.#totalCount
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

        this.#tail = node;
    }

    #fillArrayWithAllNodes(array) {
        array.push(this.#head);
        let next = this.#head.next;
        while (next) {
            array.push(next);
            next = next.next;
        }
    }

    #fillArrayWithNodes(parameters) {
        parameters.addNode(parameters.node, parameters.todoItems)
        parameters.count--
        let next = parameters.getNext(parameters.node)
        while (parameters.count-- > 0 && next) {
            parameters.addNode(next, parameters.todoItems)
            next = parameters.getNext(next);
        }
    }

    #removeTail() {
        this.#tail = this.#tail.prev;
        if (this.#tail) {
            this.#tail.next = undefined;
        }
    }

    #removeHead() {
        if (!this.#head.next) {
            this.#head = undefined;
        }
        else {
            let curHead = this.#head;
            this.#head = this.#head.next;
            if (curHead == this.#tail.prev) {
                this.#tail.prev = undefined
            }
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

    getTop(count, afterId = undefined) {
        return this.#todoList.getTopNodeAsArray(count, afterId)
    }

    getLast(count, beforeId = undefined) {
        return this.#todoList.getLastNodeAsArray(count, beforeId)
    }

    removeById(id) {
        this.#todoList.removeNode(id)
    }

    completeTask(id) {
        this.#todoList.setIsCompleted(id, true)
    }

    incompleteTask(id) {
        this.#todoList.setIsCompleted(id, false)
    }

    toggleCompleteTask(id) {
        this.#todoList.toggleIsCompleted(id)
    }

    getTotalCount() {
        return this.#todoList.getTotalCount()
    }
}