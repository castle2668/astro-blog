---
title: '[Algorithms] Time Complexity & Big O Notation'
excerpt: "Hey there, fellow coders! Today, we're diving into a concept that's super important for anyone who writes algorithms: Big O notation. It helps us understand how an algorithm performs as the size of its input grows. Think of it as a way to measure the efficiency of our code. Let’s break it down into bite-sized pieces, along with some relatable examples."
tags: ['algorithms', 'javascript']
date: 2024-08-14
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-08-14-time-complexity
---

## What is Big O Notation?

Big O notation is all about classifying how scalable an algorithm is. It gives us a way to estimate the worst-case runtime based on the size of the input.

So, if you have an array of 50 items, how much longer will it take to process if you bump that up to 100 items? Will the runtime stay the same? Will it double? Or will it skyrocket?

Here are some common Big O notations you should know.

## 1. Constant Time - O(1)

Let’s kick things off with **constant time**, represented as **O(1)**. This means that no matter how big your input gets, the runtime stays the same.

```javascript
function logFirstTwo(arr) {
  console.log(arr[0])
  console.log(arr[1])
}
```

In this case, it doesn’t matter if the array has 10 elements or 10 million. The function always logs just the first two elements. So, the runtime remains flat on our graph — no changes there!

## 2. Linear Time - O(n)

Next up is **linear time**, or **O(n)**. Here, the runtime increases directly in proportion to the size of the input.

```javascript
function logAll(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}
```

If you have an array with 5 elements, the function will perform 5 operations. If it has 100 elements, it will do 100 operations. The runtime grows straight up as the input size increases — think of it as a straight line on the graph.

## 3. Exponential Time - O(n²)

Now, let’s get a bit more complicated with **exponential time**, represented as **O(n²)**. This is where the runtime can skyrocket, especially as the input size grows.

```javascript
function logAllPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j])
    }
  }
}
```

Here, for every element in the array, we’re looking at every other element. So, with 3 elements, we log 9 pairs. With 4 elements, we log 16 pairs. You can see how quickly things can get out of hand — this would show an exponential jump on our graph!

## 4. Logarithmic Time - O(log n)

Finally, let’s talk about **logarithmic time**, which is super efficient. It’s represented as **O(log n)** and is often seen in algorithms like **binary search**.

```javascript
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let middle = Math.floor((left + right) / 2)

    if (arr[middle] === target) {
      return middle // Target found!
    } else if (arr[middle] < target) {
      left = middle + 1 // Look in the right half
    } else {
      right = middle - 1 // Look in the left half
    }
  }

  return -1 // Target not found
}
```

With binary search, every time we check a middle element, we cut the search space in half. If you had 4,000 elements, you might only need about 12 operations to find your target. That’s some serious efficiency!

## Wrapping Up

Here's a quick summary of how these time complexities look on a graph:

- O(1): Constant time – flat, no change in runtime regardless of input size.
- O(n): Linear time – runtime grows directly in proportion to the input size.
- O(n²): Exponential time – runtime grows exponentially as the input size increases.
- O(log n): Logarithmic time – runtime increases very slowly, even for large inputs.

Understanding Big O notation is crucial for writing efficient algorithms. From constant time (O(1)) to exponential time (O(n²)), each type of complexity gives us insights into how our code will perform as input sizes grow.

So next time you’re coding, keep an eye on the efficiency of your algorithms. It can make a huge difference in how your application runs, especially when it scales!
