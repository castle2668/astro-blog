---
title: '[Algorithms] Fibonacci vs. Memorized Fibonacci'
excerpt: "In this post, we'll explore two different implementations of the Fibonacci sequence: the classic recursive version and an optimized version using memoization. Both methods generate the same result, but their efficiency is quite different, especially when dealing with large numbers."
tags: ['algorithms', 'javascript']
date: 2024-10-16
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-16-memorized-fibonacci
---

## The Fibonacci Sequence

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1. So, it looks like this:

```plaintext
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

Let's start with a simple recursive implementation of the Fibonacci sequence:

```javascript
function fibonacci(position) {
  if (position < 3) return 1
  else return fibonacci(position - 1) + fibonacci(position - 2)
}

fibonacci(6) // Output: 8
```

## The Problem: Repeated Calculations and Performance Issues

The main problem with the basic recursive approach is that it calculates the same Fibonacci numbers multiple times. For example, when you call `fibonacci(6)`, it calculates `fibonacci(5)`, which then calculates `fibonacci(4)`, and so on. This results in many repeated calculations, making the function very inefficient.

The time complexity of this approach is approximately **O(2^n)**, meaning the number of calculations doubles with each additional Fibonacci number. For relatively small inputs like `fibonacci(6)`, this isn't a big issue. However, when you try something like `fibonacci(50)`, the number of recursive calls becomes huge — over 2 trillion calls!

In fact, calling `fibonacci(50)` using this method will likely make your browser crash due to the excessive number of function calls, consuming too much memory and processing power.

This is where memoization can save the day.

## Memorized Fibonacci: Optimizing with Caching

Memoization helps optimize recursive functions by storing previously calculated results and reusing them when needed, instead of recalculating them.

```javascript
function fibMemo(index, cache) {
  cache = cache || []
  if (cache[index]) return cache[index]
  else {
    if (index < 3) return 1
    else {
      cache[index] = fibMemo(index - 1, cache) + fibMemo(index - 2, cache)
    }
  }
  return cache[index]
}

fibMemo(500) // Output: 1.394232245616977e+104 (Very large number, computed quickly)
```

In this version, we introduce a `cache` array to store previously computed Fibonacci numbers.

Each time the function is called, it first checks if the result for the given `index` is already in the cache. If so, it returns the cached result immediately. Otherwise, it calculates the value and stores it in the cache for future use.

This makes the function much more efficient, especially for large inputs. For example, calling `fibMemo(500)` will compute the result almost instantly, while the original `fibonacci` function would take an extremely long time or even crash.

Since each Fibonacci number from `1` to `n` is computed at most once, and the cache lookup is constant time, the overall time complexity is **O(n)**.

## Key Differences

- Recursive Fibonacci: Simple but inefficient. Each call results in multiple recursive calls, leading to exponential time complexity.
- Memorized Fibonacci: Uses a cache to store intermediate results, reducing the number of calculations and improving efficiency dramatically.

## Conclusion

While the basic recursive Fibonacci function is easy to understand, it's not suitable for larger numbers due to its inefficiency. By adding memoization, we can optimize the function and handle much larger inputs quickly.

Next time you face a similar recursive problem, think about whether memoization could help improve the performance!
