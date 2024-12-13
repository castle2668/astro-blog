---
title: '[Data Structures] Hash Tables'
excerpt: "In this article, we’ll explore the hash table data structure, which provides fast data access using keys. We'll build our own hash table step-by-step in JavaScript, covering how it stores data, handles collisions, and retrieves values."
tags: ['datastructures', 'javascript', 'hashtable']
date: 2024-11-13
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-11-13-hash-tables
---

## What is a Hash Table?

A hash table is a data structure that stores data in key-value pairs, allowing for efficient data retrieval and insertion. A hash table uses an array of "buckets", where each bucket stores data, and a unique "hash" of each key determines which bucket to use. This makes hash tables especially fast at searching, inserting, and deleting items.

Hash Table is a powerful data structure that provides average constant time complexity, `O(1)`, for both data insertion and lookup. This efficiency is achieved through a hashing function that maps keys to specific "buckets" in an array, allowing quick access to values based on their keys.

## Hash Table and Hash Node Constructor Functions

To create a hash table, we need two constructor functions: one for the table itself and another for each data entry, or "hash node".

```javascript
function HashTable(size) {
  this.buckets = Array(size)
  this.numBuckets = this.buckets.length
}

function HashNode(key, value, next) {
  this.key = key
  this.value = value
  this.next = next || null
}
```

The `HashTable` function initializes an array of a specified size to hold data. Each element in this array is a bucket. The `HashNode` function sets up the data we’ll insert, storing a key, a value, and a `next` property for handling collisions.

## CharCodeAt Method and Modulus Operator

To place each item in a specific bucket, we’ll convert keys into numeric values. JavaScript’s `charCodeAt` method helps here, converting characters to Unicode values. For example, "A" becomes `65`, "B" becomes `66`, and so on.

The modulus operator (`%`) calculates the remainder after division, helping us ensure the hashed value stays within the array bounds.

```javascript
// Example of charCodeAt and modulus
let str = 'example'
let charCode = str.charCodeAt(0) // Unicode value of 'e' = 101
let index = charCode % 10 // Ensure result is within array bounds
```

## Hash Method

The `hash` method will transform our key into an index. It adds up the Unicode values of each character in the key, then uses the modulus operator to fit the sum within our hash table size.

```javascript
HashTable.prototype.hash = function (key) {
  let total = 0
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i)
  }
  return total % this.numBuckets
}
```

## Insert Method

The `insert` method adds key-value pairs to the table. If two keys hash to the same bucket, we use chaining to handle collisions by adding a new `HashNode` to the end of the linked list in that bucket.

Additionally, this method can be optimized by adding an early return for cases when a key already exists in the table, saving traversal time.

```javascript
HashTable.prototype.insert = function (key, value) {
  let index = this.hash(key)
  if (!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value)
  } else {
    let currentNode = this.buckets[index]
    while (currentNode.next) {
      if (currentNode.key === key) {
        currentNode.value = value // Update existing key
        return
      }
      currentNode = currentNode.next
    }
    currentNode.next = new HashNode(key, value) // Add new node at the end
  }
}
```

## Get Method

The `get` method retrieves the value associated with a given key. It hashes the key to find the correct bucket, then searches through the linked list in that bucket to locate the node with the matching key.

```javascript
HashTable.prototype.get = function (key) {
  let index = this.hash(key)
  let currentNode = this.buckets[index]
  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode.value
    }
    currentNode = currentNode.next
  }
  return null // Return null if key not found
}
```

## RetrieveAll Method

The `retrieveAll` method is designed to collect and return all nodes stored in our hash table. Here's how you can do it:

```javascript
HashTable.prototype.retrieveAll = function () {
  // Initialize an empty array to store all nodes
  let allNodes = []

  // Loop through each bucket in the hash table
  for (let i = 0; i < this.numBuckets; i++) {
    let currentNode = this.buckets[i] // Start with the first node in the bucket

    // Traverse through each node in the linked list (if there’s a chain)
    while (currentNode) {
      allNodes.push(currentNode) // Add the current node to the array
      currentNode = currentNode.next // Move to the next node in the chain
    }
  }

  // Return the array containing all nodes
  return allNodes
}
```

## Source Code

Here’s the full JavaScript implementation of a Binary Search Tree, with methods for insertion, searching, traversal, and finding minimum and maximum values:

```javascript
function HashTable(size) {
  this.buckets = Array(size)
  this.numBuckets = this.buckets.length
}

function HashNode(key, value, next) {
  this.key = key
  this.value = value
  this.next = next || null
}

HashTable.prototype.hash = function (key) {
  let total = 0
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i)
  }
  return total % this.numBuckets
}

HashTable.prototype.insert = function (key, value) {
  let index = this.hash(key)
  if (!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value)
  } else {
    let currentNode = this.buckets[index]
    while (currentNode.next) {
      if (currentNode.key === key) {
        currentNode.value = value
        return
      }
      currentNode = currentNode.next
    }
    currentNode.next = new HashNode(key, value)
  }
}

HashTable.prototype.get = function (key) {
  let index = this.hash(key)
  let currentNode = this.buckets[index]
  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode.value
    }
    currentNode = currentNode.next
  }
  return null
}

// Example usage:
let contactsTable = new HashTable(30)
contactsTable.insert('Alice', 'alice@example.com')
contactsTable.insert('Bob', 'bob@example.com')
console.log(contactsTable.get('Alice')) // Output: alice@example.com
console.log(contactsTable.get('Bob')) // Output: bob@example.com
```

## Wrap-up

Hash tables offer excellent time efficiency, but their effectiveness depends on minimizing collisions. In terms of time complexity, Hash Tables are generally efficient for most use cases:

- Average Time Complexity: The average time complexity for both insertion and lookup operations is `O(1)`, due to the hashing function's direct access to buckets.
- Worst-case Time Complexity: In cases where multiple keys are hashed to the same bucket, known as collisions, a chain of values is created within that bucket. In this scenario, time complexity can degrade to `O(n)`, where `n` is the number of elements in the bucket. However, with a good hash function and enough buckets, this is rare.

Overall, Hash Tables are ideal for applications where fast lookup and insertion are required, making them widely used in real-world applications.
