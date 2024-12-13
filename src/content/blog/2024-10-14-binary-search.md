---
title: '[Algorithms] Binary Search'
excerpt: "Binary Search algorithm is a fundamental technique in computer science. It's widely used in various applications and is a common topic in technical interviews. Understanding binary search is crucial because it offers a fast way to find values in sorted lists."
tags: ['algorithms', 'javascript']
date: 2024-10-14
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-14-binary-search
---

## What is Binary Search?

Binary search helps you quickly locate a specific item within a sorted array. It works efficiently with a time complexity of **O(log n)**, which means it can handle large datasets with minimal steps.

## How Binary Search Works

To understand binary search, think about how you would look up a word in a dictionary. Here’s a step-by-step example using the word "house":

1. Start in the middle of the dictionary. You might end up in the "M" section.
2. Since "house" comes before "M," you can ignore everything from "M" onward.
3. Now, you’re left with the first half. Open it to the middle again, landing in the "F" section.
4. Knowing "house" is after "F," you can discard everything from "A" to "F."
5. Next, find the middle of the remaining pages and land in the "S" section.
6. Discard everything after "S" because "house" won’t be there.
7. Finally, check the middle of what's left, which brings you to "H." You've found "house!"

In this example, you only needed about four steps to locate the word in a 26-page dictionary. As the dictionary grows, the number of steps you take increases much more slowly. For instance, if you had a dictionary with 4,000 pages, you'd still only need about 12 steps.

## Implementing Binary Search

There are various ways to code binary search, but we will focus on a recursive approach. Recursion is an important programming concept where a function calls itself to solve smaller parts of a problem.

Here's how you can implement binary search in JavaScript:

```javascript
function binarySearch(numArray, key) {
  const middleIdx = Math.floor(numArray.length / 2)
  const middleElem = numArray[middleIdx]

  if (middleElem === key) return true
  else if (middleElem < key && numArray.length > 1) {
    return binarySearch(numArray.slice(middleIdx + 1), key) // Exclude middle element
  } else if (middleElem > key && numArray.length > 1) {
    return binarySearch(numArray.slice(0, middleIdx), key)
  } else return false
}

console.log(binarySearch([5, 7, 12, 16, 36, 39, 42, 56, 71], 56))
```

## Conclusion

Binary search is a powerful tool that shows how efficient searching can be. By mastering this algorithm, you’ll not only improve your programming skills but also enhance your performance in interviews and real-world coding challenges.
