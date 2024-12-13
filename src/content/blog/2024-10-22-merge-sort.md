---
title: '[Algorithms] Merge Sort'
excerpt: 'In this article, we’re covering Merge Sort, an efficient sorting algorithm that breaks down arrays into smaller parts, sorts them, and merges them back into a single sorted array. Merge Sort is often highlighted in technical interviews, so understanding its mechanics is essential.'
tags: ['algorithms', 'javascript']
date: 2024-10-22
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-22-merge-sort
---

## The Problem

We need to take an unsorted array and organize it in ascending order. While there are many sorting methods available, Merge Sort employs a unique "divide and conquer" strategy.

By recursively dividing the array into smaller segments until each piece is a single element, Merge Sort ensures that each subarray is already sorted, making it straightforward to merge them back into a complete sorted array.

## The Approach

Merge Sort works in two main stages: dividing and merging. Here’s a breakdown:

- **Divide**: We keep splitting the original array into halves until each segment contains only one element (a naturally sorted subarray). This recursive division continues until we have arrays of single elements.
- **Merge**: Next, we combine these single-element arrays into progressively larger sorted arrays by comparing elements and placing them in order. During this merging process, we systematically build up larger, sorted sections of the array until we’re left with a single fully sorted array

Let’s look at the implementation:

```javascript
function mergeSort(arr) {
  if (arr.length < 2) return arr
  let middleIndex = Math.floor(arr.length / 2)
  let firstHalf = arr.slice(0, middleIndex)
  let secondHalf = arr.slice(middleIndex)

  return merge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function merge(array1, array2) {
  let result = []
  while (array1.length && array2.length) {
    let minElem
    if (array1[0] < array2[0]) minElem = array1.shift()
    else minElem = array2.shift()
    result.push(minElem)
  }

  return result.concat(array1.length ? array1 : array2)
}

// Example usage
mergeSort([42, 16, 77, 3, 99, 50, 27, 66, 5])
```

## Summary

Merge Sort is a powerful, recursive algorithm for sorting arrays that offers efficient performance, especially for larger datasets, with a time complexity of `O(n log n)`.

By breaking down the problem into smaller, manageable parts and merging them back in order, Merge Sort efficiently arranges data with minimal comparisons.
