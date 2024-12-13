---
title: '[Algorithms] Mean Median Mode'
excerpt: 'Learn how to calculate the mean, median, and mode of a number array in JavaScript with a reusable, functional approach. We’ll split the task into easy-to-follow steps that make this algorithm both efficient and beginner-friendly!'
tags: ['algorithms', 'javascript']
date: 2024-10-02
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-02-mean-median-mode
---

## The Problem

In this challenge, we’re working with a simple but essential statistical concept: calculating the **mean**, **median**, and **mode** of a set of numbers. Our task is to take in an array of numbers, compute each of these values, and return them as properties in an object. The twist? We’ll break down the algorithm into smaller, reusable functions for each calculation.

Here’s what each measure represents:

- **Mean**: The average of all numbers.
- **Median**: The middle value when the numbers are sorted.
- **Mode**: The number(s) that appear most frequently.

## The Approach

To solve this, we’ll write four functions:

1. `getMean` - This function takes the array, adds up all numbers, and divides by the count to find the mean.
2. `getMedian` - After sorting the array, this function finds the median, either by picking the middle number (if the length is odd) or averaging the two middle numbers (if the length is even).
3. `getMode` - Using an object, this function counts occurrences of each number, then identifies the number(s) with the highest count as the mode.
4. `meanMedianMode` - This function calls the other three functions and organizes the results into an object with `mean`, `median`, and `mode` properties.

```javascript
function meanMedianMode(array) {
  return {
    mean: getMean(array),
    median: getMedian(array),
    mode: getMode(array),
  }
}

function getMean(array) {
  let sum = 0
  array.forEach(num => (sum += num))
  return sum / array.length
}

function getMedian(array) {
  array.sort((a, b) => a - b)
  const middle = array.length / 2
  return array.length % 2 !== 0
    ? array[Math.floor(middle)]
    : (array[middle - 1] + array[middle]) / 2
}

function getMode(array) {
  const frequency = {}
  array.forEach(num => (frequency[num] = (frequency[num] || 0) + 1))

  let maxFreq = 0,
    modes = []
  for (const num in frequency) {
    if (frequency[num] > maxFreq) {
      modes = [Number(num)]
      maxFreq = frequency[num]
    } else if (frequency[num] === maxFreq) modes.push(Number(num))
  }
  return modes.length === Object.keys(frequency).length ? [] : modes
}

// Example Usage
console.log(meanMedianMode([9, 10, 23, 10, 23, 9]))
// Output: { mean: 14, median: 10, mode: [9, 10, 23] }
```

## Summary

In this post, we built a **Mean**, **Median**, **Mode** calculator in JavaScript, breaking it down into three reusable functions for each measure. This approach not only simplifies the process but also emphasizes the importance of functional programming in creating reusable, modular code.

With this, you’re now equipped to handle common statistical calculations in JavaScript. Happy coding!
