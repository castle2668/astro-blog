---
title: '[Algorithms] Harmless Ransom Note'
excerpt: "In this post, we'll break down a common algorithm question you might see in coding interviews: the Harmless Ransom Note. It’s a great example to understand how to manipulate strings and use objects as hash tables for performance improvements. Plus, it’s relatively straightforward but offers a solid practice in understanding time complexity."
tags: ['algorithms', 'javascript', 'hashtable', 'leetcode']
date: 2024-08-28
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-08-28-harmless-ransom-note
---

## The Problem

Imagine you’re trying to write a ransom note (just harmlessly, of course). You need to use words from a magazine to create the note. The question is: can you find enough words in the magazine to create your note?

The function takes two inputs:

- noteText: the ransom note as a string
- magazineText: the text from the magazine as a string

The goal is to return `true` if you can create the note from the magazine, or `false` if not.

For example:

```plaintext
Note: "give me the secret code"
Magazine: "you will find the secret code if you give me the information"
```

In this case, the function should return true, as the note can be formed using the words from the magazine. Now, let’s see how to implement this.

## The Approach

We’ll use a hash table (in this case, an object in JavaScript) to count how many times each word appears in the magazine. Then, we check if we can match the words in the note by decrementing the counts in the hash map.

## Code Walkthrough

Here’s how you can write the solution in JavaScript:

```javascript
function harmlessRansomNote(noteText, magazineText) {
  const noteArr = noteText.split(' ')
  const magazineArr = magazineText.split(' ')
  const magazineObj = {}

  // Build a hash map for the magazine
  magazineArr.forEach(word => {
    if (!magazineObj[word]) magazineObj[word] = 0
    magazineObj[word]++
  })

  // Check if the note can be formed
  let noteIsPossible = true
  noteArr.forEach(word => {
    if (magazineObj[word]) {
      magazineObj[word]--
      if (magazineObj[word] < 0) noteIsPossible = false
    } else {
      noteIsPossible = false
    }
  })

  return noteIsPossible
}

// Example usage
const note = 'give me the secret code'
const magazine = 'you will find the secret code if you give me the information'
console.log(harmlessRansomNote(note, magazine)) // Output: true
```

## Time Complexity

The time complexity of this algorithm is `O(n + m)`, where:

- `n` is the number of words in the magazine text
- `m` is the number of words in the note text

We loop over both arrays once, making this a linear solution.

## Related Problem

### 383. Ransom Note

- [Question](https://leetcode.com/problems/ransom-note/description/)
- [My Submission](https://leetcode.com/problems/ransom-note/submissions/1430421661)

```javascript
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  let noteArr = ransomNote.replace(' ', '').split('')
  let magazineArr = magazine.replace(' ', '').split('')
  let magazineObj = {}

  magazineArr.forEach(letter => {
    if (!magazineObj[letter]) {
      magazineObj[letter] = 0
    }
    magazineObj[letter] += 1
  })

  let noteIsPossible = true
  noteArr.forEach(letter => {
    if (magazineObj[letter] && magazineObj[letter] > 0) {
      magazineObj[letter] -= 1
    } else {
      console.log(letter)
      noteIsPossible = false
    }
  })

  return noteIsPossible
}
```

## Conclusion

This algorithm is a great practice for understanding how to use hash tables (objects) for fast lookups. It’s efficient and clean, running in linear time, which is ideal for most text processing problems.

Feel free to try this out with different notes and magazine texts to get a better feel for how it works!
