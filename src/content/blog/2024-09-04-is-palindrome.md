---
title: '[Algorithms] Is Palindrome'
excerpt: "The 'Is Palindrome' algorithm checks whether a string reads the same forward and backward, ignoring spaces and punctuation. It's a simple yet classic algorithm that can be easily implemented with JavaScript string and array manipulation."
tags: ['algorithms', 'javascript']
date: 2024-09-04
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-09-04-is-palindrome
---

## Introduction

If you’re unfamiliar, a palindrome is a word or phrase that reads the same forward and backward. For example, "race car" is a palindrome because it’s spelled the same way in both directions. Another popular example is the phrase, “A man, a plan, a canal, Panama!” — when you ignore spaces and punctuation, it reads the same backward.

In this post, we'll explore how to implement this algorithm using basic string and array methods. No regular expressions involved, just clean manipulation of JavaScript strings and arrays.

## Problem Breakdown

The goal is to take a string, strip out any punctuation and spaces, and then check if it reads the same forwards and backwards. To achieve this, we'll follow these steps:

1. Convert the string to lowercase to make the check case-insensitive.
2. Remove all non-alphabetic characters.
3. Compare the cleaned string with its reverse to check for equality.

## Example Code

Given the string: `"A Santa at NASA"`, the algorithm should return true because, after cleaning, it reads the same forwards and backwards.

```javascript
function isPalindrome(string) {
  string = string.toLowerCase() // Step 1: Convert to lowercase
  const charactersArr = string.split('')
  const validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('') // Alphabet array

  // Step 2: Filter out non-alphabetic characters
  let lettersArr = []
  charactersArr.forEach(char => {
    if (validCharacters.indexOf(char) > -1) lettersArr.push(char)
  })

  // Step 3: Compare the string with its reverse
  return lettersArr.join('') === lettersArr.reverse().join('')
}

console.log(isPalindrome('A Santa at NASA')) // true
```

## Conclusion

The **Is Palindrome** algorithm is a simple but essential exercise for improving your understanding of string manipulation in JavaScript. By practicing with this algorithm, you'll strengthen your ability to work with arrays, conditionals, and other key concepts that are fundamental in coding interviews.

This code can also be easily adapted to handle more complex cases or to run faster with larger inputs. Try it out with different strings and see how it performs!
