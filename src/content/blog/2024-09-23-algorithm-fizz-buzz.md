---
title: "[演算法] Fizz Buzz"
excerpt: "Fizz Buzz 通常是大家入門的第一個演算法，非常經典而且基礎的概念，算是學習演算法的一個入門磚，輕鬆又有趣。"
tags: ["algorithm", "leetcode"]
date: 2024-09-23
author: "Sean Huang"
image: "development.jpg"
slug: 2024-09-23-algorithm-fizz-buzz
---

## 問題描述

Given an integer n, return a string array answer (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

## 相關知識

### Modulus Operator

這個演算法主要是使用「餘數運算子」也就是「%」這個符號，它會回傳餘數，正好可以幫助我們確認「是否整除」這件事情。

## 示範程式碼

```javascript
function fizzBuzz(num) {
  for (var i = 1; i <= num; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}

fizzBuzz();
```

## 相關題目

### LeetCode 412. Fizz Buzz

- [Question](https://leetcode.com/problems/fizz-buzz/description/)
- [My Submission](https://leetcode.com/problems/fizz-buzz/submissions/1398760859)

```javascript
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  let res = [];

  for (let i = 1; i < n + 1; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      res.push("FizzBuzz");
    } else if (i % 3 === 0) {
      res.push("Fizz");
    } else if (i % 5 === 0) {
      res.push("Buzz");
    } else {
      res.push(`${i}`);
    }
  }

  return res;
};
```

## 延伸題目

### LeetCode 2525. Categorize Box According to Criteria

- [Question](https://leetcode.com/problems/categorize-box-according-to-criteria/description/)
- [My Submission](https://leetcode.com/problems/categorize-box-according-to-criteria/submissions/1399341918)

```javascript
/**
 * @param {number} length
 * @param {number} width
 * @param {number} height
 * @param {number} mass
 * @return {string}
 */
var categorizeBox = function (length, width, height, mass) {
  let isBulky =
    length >= 10 ** 4 ||
    width >= 10 ** 4 ||
    height >= 10 ** 4 ||
    length * width * height >= 10 ** 9;
  let isHeavy = mass >= 100;

  if (isBulky && isHeavy) {
    return "Both";
  } else if (!isBulky && !isHeavy) {
    return "Neither";
  } else if (isBulky && !isHeavy) {
    return "Bulky";
  } else if (!isBulky && isHeavy) {
    return "Heavy";
  }
};
```
