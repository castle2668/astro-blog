---
title: '[Data Structures] Linked Lists'
excerpt: 'Linked lists are a fundamental data structure in computer science, offering flexibility in managing and organizing data. This article introduces linked lists in JavaScript, explaining their structure, basic operations like adding and removing nodes, and how to search within them. Perfect for beginners, this guide takes you step-by-step through building and understanding linked lists, making complex concepts accessible to everyone.'
tags: ['datastructures', 'javascript']
date: 2024-10-28
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-28-linked-lists
---

## What is a Linked List?

A linked list is a data structure used to store a sequence of data (nodes). Each node contains two parts: the data (value) and a reference to the next node. Unlike arrays, linked list nodes do not need to be stored contiguously in memory, making them flexible for certain types of operations.

- **Advantages**: Linked lists make it easy to add or remove nodes without shifting other elements, unlike arrays.
- **Disadvantages**: Linked lists can be slower when searching for a specific node since we need to go through each node from the head.

## Linked List and Node Constructor Functions

In JavaScript, we can use constructor functions to build the Linked List and Node. Here’s the basic structure of these constructors:

```javascript
function LinkedList() {
  this.head = null
  this.tail = null
}

function Node(value, next, prev) {
  this.value = value
  this.next = next || null
  this.prev = prev || null
}
```

- `LinkedList` is our main data structure, containing two pointers, `head` and `tail`, which track the start and end of the list.
- Node represents each element in the list, holding the `value` (the data of the node), `next` (a reference to the next node), and `prev` (a reference to the previous node, making it a doubly linked list).

## Adding Nodes to the Linked List

### Add to Head

Let’s look at how to add a node at the beginning (head) of a linked list. We create a new node and set it as the head, updating the previous head’s `prev` reference to point to the new node.

```javascript
LinkedList.prototype.addToHead = function (value) {
  var newNode = new Node(value, this.head, null)
  if (this.head) this.head.prev = newNode
  else this.tail = newNode
  this.head = newNode
}
```

- If a head node already exists, we set its `prev` to the new node.
- If the list is empty (no head), the new node becomes both the head and the tail.

### Add to Tail

Similar to adding to the head, we can also add a new node to the end (tail) of the linked list.

```javascript
LinkedList.prototype.addToTail = function (value) {
  var newNode = new Node(value, null, this.tail)
  if (this.tail) this.tail.next = newNode
  else this.head = newNode
  this.tail = newNode
}
```

- If a tail already exists, we set its `next` reference to the new node.
- If the list is empty, the new node serves as both the head and the tail.

## Removing Nodes from the Linked List

### Remove Head

We can remove the head node and update the head reference to the next node. If there is only one node in the list, removing it will set both the head and tail to `null`.

```javascript
LinkedList.prototype.removeHead = function () {
  if (!this.head) return null
  var val = this.head.value
  this.head = this.head.next
  if (this.head) this.head.prev = null
  else this.tail = null
  return val
}
```

- If the list is empty, this function returns `null`.
- Otherwise, it moves the head pointer to the next node and returns the value of the removed head.

### Remove Tail

Removing the tail is similar to removing the head, with a slight difference.

```javascript
LinkedList.prototype.removeTail = function () {
  if (!this.tail) return null
  var val = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) this.tail.next = null
  else this.head = null
  return val
}
```

- If there’s no tail, this function returns `null`.
- Otherwise, it updates the tail pointer and returns the value of the removed tail node.

## Finding Nodes in the Linked List

### Search Method

The `search` method allows us to find a node with a specific value. It starts from the head and checks each node until it finds the desired value.

```javascript
LinkedList.prototype.search = function (searchValue) {
  var currentNode = this.head
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value
    currentNode = currentNode.next
  }
  return null
}
```

- If the specified value is found, it returns that value.
- If not, it returns `null`.

### IndexOf Method

The `indexOf` method finds all the indexes of nodes that contain a specific value and returns an array of these indexes.

```javascript
LinkedList.prototype.indexOf = function (value) {
  var indexes = []
  var currentIndex = 0
  var currentNode = this.head
  while (currentNode) {
    if (currentNode.value === value) indexes.push(currentIndex)
    currentNode = currentNode.next
    currentIndex++
  }
  return indexes
}
```

- `currentIndex` tracks the current position, and whenever a node with the target value is found, its index is added to the array.

## Source Code

```javascript
function LinkedList() {
  this.head = null
  this.tail = null
}

function Node(value, next, prev) {
  this.value = value
  this.next = next
  this.prev = prev
}

LinkedList.prototype.addToHead = function (value) {
  var newNode = new Node(value, this.head, null)
  if (this.head) this.head.prev = newNode
  else this.tail = newNode
  this.head = newNode
}

LinkedList.prototype.addToTail = function (value) {
  var newNode = new Node(value, null, this.tail)
  if (this.tail) this.tail.next = newNode
  else this.head = newNode
  this.tail = newNode
}

LinkedList.prototype.removeHead = function () {
  if (!this.head) return null
  var val = this.head.value
  this.head = this.head.next
  if (this.head) this.head.prev = null
  else this.tail = null
  return val
}

LinkedList.prototype.removeTail = function () {
  if (!this.tail) return null
  var val = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) this.tail.next = null
  else this.head = null
  return val
}

LinkedList.prototype.search = function (searchValue) {
  var currentNode = this.head
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value
    currentNode = currentNode.next
  }
  return null
}

LinkedList.prototype.indexOf = function (value) {
  var indexes = []
  var currentIndex = 0
  var currentNode = this.head
  while (currentNode) {
    if (currentNode.value === value) indexes.push(currentIndex)
    currentNode = currentNode.next
    currentIndex++
  }
  return indexes
}

var myLL = new LinkedList()

myLL.addToHead(42)
myLL.addToHead(15)
myLL.addToTail(7)
myLL.addToTail(99) // 42 <-> 7
```

## Wrap Up

A linked list is a flexible data structure, especially useful for situations that involve frequent additions and deletions.

In this article, we’ve covered how to add nodes with `addToHead` and `addToTail`, remove nodes with `removeHead` and `removeTail`, and search the list using `search` and `indexOf`.

These basic operations offer insight into how to access and manage data within a linked list.
