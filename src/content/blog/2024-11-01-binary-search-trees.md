---
title: '[Data Structures] Binary Search Trees'
excerpt: "In this article, we'll dive into the fundamentals of Binary Search Trees (BST), a powerful data structure that organizes data for efficient insertion, search, and traversal operations. Starting from the basic concepts, we’ll explore the recursive call stack, how to insert and search for values, and cover multiple traversal methods, including depth-first (in-order, pre-order, post-order) and breadth-first traversals. By the end, you’ll understand BST operations and have the code to create and manipulate a Binary Search Tree in JavaScript."
tags: ['datastructures', 'javascript']
date: 2024-11-01
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-11-01-binary-search-trees
---

## What is a Binary Search Tree?

A Binary Search Tree (BST) is a type of binary tree in which each node has a maximum of two child nodes. For any given node:

- Values in the left subtree are less than the node's value.
- Values in the right subtree are greater than the node's value.

This structure allows efficient searching, insertion, and deletion, which makes it ideal for sorted data storage and retrieval.

```javascript
function BST(value) {
  this.value = value
  this.right = null
  this.left = null
}
```

## Recursion and the Call Stack

BST operations are frequently recursive, which means a function calls itself until it reaches a base case. Understanding recursion is key to working with BSTs, as methods like `insert` and `contains` rely on it to traverse the tree. The call stack manages these function calls, storing each call’s context until it reaches a base case and can begin returning results back up the stack.

## Insert Method

The `insert` method adds a new value to the tree in the correct position, preserving the BST structure:

- If the new value is less than or equal to the current node's value, it goes to the left.
- If it's greater, it goes to the right. The method uses recursion to traverse the tree until it finds the correct spot.

```javascript
BST.prototype.insert = function (value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value)
    else this.left.insert(value)
  } else {
    if (!this.right) this.right = new BST(value)
    else this.right.insert(value)
  }
}
```

## Contains Method

The `contains` method checks if a specific value exists in the tree. Similar to `insert`, it uses recursion to compare each node’s value with the target:

- Traverse left if the target is less than the node’s value.
- Traverse right if it’s greater.

```javascript
BST.prototype.contains = function (value) {
  if (this.value === value) return true
  if (value < this.value) return this.left ? this.left.contains(value) : false
  if (value > this.value) return this.right ? this.right.contains(value) : false
}
```

## Depth First Traversal Method

The `depthFirstTraversal` method is structured to handle different traversal orders. By passing a specific order (`'pre-order'`, `'in-order'`, or `'post-order'`), you can define when to apply the iterator function, achieving flexibility in traversal styles.

### Depth First Traversal - Pre-Order

Pre-order is the most standard DFS algorithm.

Pre-order traversal visits nodes in the following order:

1. Visit the node.
2. Traverse the left subtree.
3. Traverse the right subtree.

### Depth First Traversal - In-Order

In-order traversal visits nodes in ascending order:

1. Traverse the left subtree.
2. Visit the node.
3. Traverse the right subtree.

### Depth First Traversal - Post-Order

Post-order traversal follows:

1. Traverse the left subtree.
2. Traverse the right subtree.
3. Visit the node.

```javascript
BST.prototype.depthFirstTraversal = function (iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this.value)
  if (this.left) this.left.depthFirstTraversal(iteratorFunc, order)
  if (order === 'in-order') iteratorFunc(this.value)
  if (this.right) this.right.depthFirstTraversal(iteratorFunc, order)
  if (order === 'post-order') iteratorFunc(this.value)
}
```

## Breadth First Traversal Method

Breadth-first traversal (BFS) visits nodes level by level, from top to bottom. A queue is used to keep track of nodes to visit, making it ideal for exploring trees in layers.

```javascript
BST.prototype.breadthFirstTraversal = function (iteratorFunc) {
  var queue = [this]
  while (queue.length) {
    var treeNode = queue.shift()
    iteratorFunc(treeNode)
    if (treeNode.left) queue.push(treeNode.left)
    if (treeNode.right) queue.push(treeNode.right)
  }
}
```

## DFS vs BFS

Here is an example that compares the order that the graph is searched in when using a BFS or a DFS (by each of the three approaches).

```plaintext
      1
    /   \
   2     3
  / \
 4   5
```

- Breadth First Search : 1 2 3 4 5
- Depth First Search
  - Pre-order: 1 2 4 5 3
  - In-order : 4 2 5 1 3
  - Post-order : 4 5 2 3 1

## getMinVal and getMaxVal Methods

A Binary Search Tree provides an efficient way to find the minimum and maximum values within the tree. In a BST, the minimum value is always located in the leftmost node, while the maximum value is in the rightmost node. This makes retrieval of these values straightforward, involving only a traversal down the left or right side, respectively.

### getMinVal Method

The `getMinVal` method recursively traverses the left side of the tree until it finds the leftmost node, which contains the smallest value.

```javascript
BST.prototype.getMinVal = function () {
  return this.left ? this.left.getMinVal() : this.value
}
```

When called, it checks if the node has a left child:

- If it does, it moves to that child and continues down the left path.
- If it does not, it has reached the smallest value in the tree, which is the value of the current node.

### getMaxVal Method

The `getMaxVal` method works similarly, but it traverses the right side of the tree, searching for the rightmost node to find the maximum value.

```javascript
BST.prototype.getMaxVal = function () {
  return this.right ? this.right.getMaxVal() : this.value
}
```

The method moves right until it reaches a node with no further right children, which represents the maximum value in the tree.

Both methods provide efficient retrievals, as they only need to traverse one side of the tree, resulting in a time complexity of O(log n) for balanced trees.

## Source Code

Here’s the full JavaScript implementation of a Binary Search Tree, with methods for insertion, searching, traversal, and finding minimum and maximum values:

```javascript
function BST(value) {
  this.value = value
  this.right = null
  this.left = null
}

BST.prototype.insert = function (value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value)
    else this.left.insert(value)
  } else {
    if (!this.right) this.right = new BST(value)
    else this.right.insert(value)
  }
}

BST.prototype.contains = function (value) {
  if (this.value === value) return true
  if (value < this.value) return this.left ? this.left.contains(value) : false
  if (value > this.value) return this.right ? this.right.contains(value) : false
}

BST.prototype.depthFirstTraversal = function (iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this.value)
  if (this.left) this.left.depthFirstTraversal(iteratorFunc, order)
  if (order === 'in-order') iteratorFunc(this.value)
  if (this.right) this.right.depthFirstTraversal(iteratorFunc, order)
  if (order === 'post-order') iteratorFunc(this.value)
}

BST.prototype.breadthFirstTraversal = function (iteratorFunc) {
  var queue = [this]
  while (queue.length) {
    var treeNode = queue.shift()
    iteratorFunc(treeNode)
    if (treeNode.left) queue.push(treeNode.left)
    if (treeNode.right) queue.push(treeNode.right)
  }
}

BST.prototype.getMinVal = function () {
  return this.left ? this.left.getMinVal() : this.value
}

BST.prototype.getMaxVal = function () {
  return this.right ? this.right.getMaxVal() : this.value
}

// Example of using the tree
var bst = new BST(40)
bst.insert(25)
bst.insert(60)
bst.insert(15)
bst.insert(30)
bst.insert(50)
bst.insert(70)
bst.insert(5)
bst.insert(20)
bst.insert(65)
bst.insert(80)

function log(node) {
  console.log(node.value)
}

bst.breadthFirstTraversal(log)
```

### Example

In this example, `breadthFirstTraversal` uses the `log` function to traverse the entire binary search tree (BST) level by level, starting from the root node down to the lowest level. Within each level, nodes are visited from left to right.

With the following insertion order:

```javascript
var bst = new BST(40)
bst.insert(25)
bst.insert(60)
bst.insert(15)
bst.insert(30)
bst.insert(50)
bst.insert(70)
bst.insert(5)
bst.insert(20)
bst.insert(65)
bst.insert(80)

function log(node) {
  console.log(node.value)
}

bst.breadthFirstTraversal(log)
```

The resulting BST structure is:

```plaintext
       40
     /    \
   25      60
  /  \    /   \
15   30  50   70
/ \         /    \
5  20     65     80
```

When `breadthFirstTraversal` is called with `log`, it will output the node values level-by-level from left to right. The output will be:

```plaintext
40
25
60
15
30
50
70
5
20
65
80
```

This is the expected output sequence when running the example code.

## Wrap-up

We’ve explored the fundamentals of Binary Search Trees, from inserting values and checking for specific nodes, to various ways of traversing the tree. Understanding these basics is key to mastering BSTs and how they can make data searching and sorting more efficient.
