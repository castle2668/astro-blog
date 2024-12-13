---
title: '[Algorithms] Caesar Cipher'
excerpt: "The algorithm we'll explore in this post is the Caesar Cipher. This classic encryption technique shifts each letter in a string by a specified number of places in the alphabet."
tags: ['algorithms', 'javascript']
date: 2024-09-11
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-09-11-caesar-cipher
---

## How It Works

In the Caesar Cipher, each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a shift of 2:

- A becomes C
- B becomes D
- Z wraps around to become B
- Spaces are preserved, so they remain unchanged.

The key aspect of this algorithm is that it maintains the case of the original letters and ignores spaces.

Additionally, the Caesar Cipher can handle negative numbers, allowing it to shift letters backward in the alphabet. This feature makes the algorithm versatile for different encoding scenarios.

## Implementation

```javascript
function caesarCipher(str, num) {
  num = num % 26 // Handle shifts greater than 26
  const lowerCaseString = str.toLowerCase()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let newString = ''

  for (let i = 0; i < lowerCaseString.length; i++) {
    const currentLetter = lowerCaseString[i]

    if (currentLetter === ' ') {
      newString += currentLetter
      continue
    }

    const currentIndex = alphabet.indexOf(currentLetter)
    let newIndex = currentIndex + num
    if (newIndex > 25) newIndex -= 26 // Wrap around if necessary
    if (newIndex < 0) newIndex += 26 // Wrap around if negative

    // Maintain the original letter's case
    if (str[i] === str[i].toUpperCase()) {
      newString += alphabet[newIndex].toUpperCase()
    } else {
      newString += alphabet[newIndex]
    }
  }

  return newString
}

console.log(caesarCipher('Hello World!', 3)) // Output: 'Khoor Zruog!'
```

## Summary

The Caesar Cipher is a simple yet effective way to encrypt messages by shifting letters in the alphabet. This implementation not only handles the wrapping of letters and maintains case sensitivity but also skips spaces to keep the original formatting. Using `let` and `const` enhances the readability and maintainability of our code.
