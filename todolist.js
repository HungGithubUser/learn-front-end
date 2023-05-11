'use strict';

class ListNode {
    constructor(val) {
        this.val = val;
    }
}

class LinkedList {
    
    constructor(){
        this.nodeValToNode = []
    }

    append(item) {
        let node = new ListNode(item)
        this.nodeValToNode[node.val] = node
        
        if (!this.head) {
            this.head = node;
            return
        }

        this.#appendNodeToEndOfList(node);
        this.tail = node;
    }

    toArray() {
        let arrayValue = []

        if (this.head) {
            this.#fillArrayWithLinkedListValue(arrayValue);
        }

        return arrayValue
    }

    removeNode(val) {
        let node = this.nodeValToNode[val]

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

    #fillArrayWithLinkedListValue(arrayValue) {
        arrayValue.push(this.head.val);
        let next = this.head.next;
        while (next) {
            arrayValue.push(next.val);
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

var todoList = new LinkedList()

function set(todoItem) {
    todoList.append(todoItem)
}

function getAll() {
    return todoList.toArray()
}

function reset() {
    todoList = new LinkedList()
}

function remove(todoItem) {
    todoList.removeNode(todoItem)
}

export { set, getAll, reset, remove };