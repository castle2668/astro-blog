---
title: '[Algorithms] Bubble Sort'
excerpt: 'In this article, we’ll dive into Bubble Sort, a straightforward sorting algorithm often encountered in coding interviews. We’ll discuss how it works, go through an example, and examine a JavaScript implementation of the algorithm.'
tags: ['algorithms', 'javascript']
date: 2024-10-21
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-21-bubble-sort
---

## The Problem

We need to sort an array of numbers in ascending order. Although there are various methods to accomplish this, Bubble Sort is distinct in its approach, repeatedly "bubbling" the highest unsorted number to the end of the array through multiple passes.

## The Approach

Bubble Sort starts by comparing each pair of adjacent elements in the array, swapping them if they’re out of order. After each pass through the array, the largest unsorted element reaches its final position at the end.

This process repeats, ignoring the sorted portion of the array each time, until the entire array is in order. This algorithm typically requires `n-1` passes for an array with `n` elements.

```javascript
function bubbleSort(array) {
  for (let i = array.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements if they’re out of order
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

// Example usage
bubbleSort([10, 2, 8, 6, 7, 3])
```

## Summary

Bubble Sort is a simple, comparison-based sorting algorithm ideal for learning purposes but less efficient for larger datasets due to its high number of passes.

The algorithm is useful for understanding the concept of iterative sorting and swap-based ordering and is easy to implement, making it a common choice in technical interviews.
