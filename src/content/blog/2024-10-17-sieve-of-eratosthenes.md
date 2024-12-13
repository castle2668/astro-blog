---
title: '[Algorithms] Sieve Of Eratosthenes'
excerpt: "Discover the Sieve of Eratosthenes — an efficient algorithm to find all prime numbers up to a given limit. We'll cover the steps involved, optimizing runtime, and breaking down the code for a clear understanding."
tags: ['algorithms', 'javascript']
date: 2024-10-17
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-17-sieve-of-eratosthenes
---

## The Problem

We need to find all prime numbers up to a given number `n`. A prime number is only divisible by 1 and itself, and there’s a fast, optimized way to find all primes within a range: the Sieve of Eratosthenes.

For instance, if we input `20`, we should get `[2, 3, 5, 7, 11, 13, 17, 19]`, representing all prime numbers from 0 to 20.

## The Approach

1. **Initialize an Array**: Start with an array of boolean values up to `n`, with each index set to `true`, assuming every number is prime.
2. **Mark Non-Primes**: Begin with the number 2 (the first prime) and mark all its multiples as `false` (not prime). Move to the next number marked `true` (which will be the next prime) and mark all its multiples as `false`.
3. **Optimize with Square Root**: We only need to mark multiples up to `√n` since any larger factors will have already been marked by smaller primes.
4. **Return Primes**: After marking, any index still marked `true` represents a prime number.

```javascript
function sieveOfEratosthenes(n) {
  const primes = Array(n + 1).fill(true)
  primes[0] = primes[1] = false // 0 and 1 are not primes

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false // Mark multiples of i as not prime
      }
    }
  }

  // Collecting the prime numbers
  return primes.reduce((result, isPrime, index) => {
    if (isPrime) result.push(index)
    return result
  }, [])
}

// Example Usage
console.log(sieveOfEratosthenes(49))
// Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

## Summary

The Sieve of Eratosthenes is an optimized algorithm for finding prime numbers up to a given number `n`, using a boolean array to track primes and marking off multiples. This method significantly reduces unnecessary checks, making it both performant and easy to implement.
