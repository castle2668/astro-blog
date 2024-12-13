---
title: '[Algorithms] Reverse Words in a Sentence'
excerpt: 'Today, we’re tackling the Reverse Words algorithm! This is a fun little challenge where we take a sentence, flip each word individually, and put the sentence back together—no messing with the word order, just reversing each word. Let’s dive in!'
tags: ['algorithms', 'javascript']
date: 2024-09-18
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-09-18-reverse-words
---

## The Rules

So, here’s what we’re doing:

1. Reverse each word separately: For example, if you pass in `"Coding JavaScript"`, we should return `"gnidoC tpircSavaJ"`. The words stay in the same spot; only the letters within each word get flipped.
2. **No .reverse() shortcut**: This means we won’t use any built-in array-reversing methods. Instead, we’ll get creative and build it from scratch.

## Let’s Code It

Here’s a quick solution for the Reverse Words problem:

```javascript
function reverseWords(string) {
  const wordsArr = string.split(' ')
  const reversedWordsArr = []

  wordsArr.forEach(word => {
    let reversedWord = ''
    for (let i = word.length - 1; i >= 0; i--) {
      reversedWord += word[i]
    }
    reversedWordsArr.push(reversedWord)
  })

  return reversedWordsArr.join(' ')
}

console.log(reverseWords('Coding JavaScript')) // Output: "gnidoC tpircSavaJ"
```

### How It Works

1. **Splitting the Sentence**: First, we split our input string by spaces. This gives us an array of words.
2. **Reversing Each Word**: For each word, we create an empty string `reversedWord` and add characters to it one by one in reverse order.
3. **Building the Result**: Finally, we collect all the reversed words and join them back together with spaces to form our final sentence.

## Wrapping Up

Every time you work through a challenge like this, you’re building up valuable coding skills. Keep experimenting, and soon enough, these challenges will feel second nature.

Good luck, and happy coding!
