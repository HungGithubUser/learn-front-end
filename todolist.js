'use strict';

class ListNode {
    constructor(val) {
        this.val = val;
    }
}

class LinkedList {
    append(node) {
        if (!this.head) {
            this.#setHead(node);
            return
        }
        this.#setTail(node);
    }

    toArray() {
        let arrayValue = []

        if (this.head) {
            this.#appendArray(arrayValue);
        }

        return arrayValue
    }

    removeNode(node) {
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

    #setTail(node) {
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
        }

        else {
            this.head.next = node;
            node.prev = this.head;
        }

        this.tail = node;
    }

    #setHead(node) {
        this.head = node;
    }

    #appendArray(arrayValue) {
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

var linkedList = new LinkedList()
var itemToListNode = []

function set(todoItem) {
    let node = new ListNode(todoItem);
    itemToListNode[todoItem] = node;
    linkedList.append(node)
}

function getAll() {
    return linkedList.toArray()
}

function reset() {
    linkedList = new LinkedList()
    itemToListNode = []
}

function remove(todoItem) {
    linkedList.removeNode(itemToListNode[todoItem])
}

export { set, getAll, reset, remove };