---
title: '[Algorithms] Max Stock Profit'
excerpt: 'In this article, we’ll walk through the Max Stock Profit algorithm, which helps determine the maximum profit achievable from buying and selling a stock in a single day based on its changing prices. This common algorithm problem often appears in technical interviews and requires a mix of array handling and optimization techniques.'
tags: ['algorithms', 'javascript']
date: 2024-10-23
author: 'Sean Huang'
image: 'javascript.png'
slug: 2024-10-23-max-stock-profit
---

## The Problem

Given an array where each element represents the price of a stock at different times in a day, our objective is to identify the highest profit possible by choosing the optimal buy and sell prices. You may only buy once and sell once, and buying must occur before selling. If no profit is possible, the function should return `-1`.

Consider an example array `[5, 2, 10, 1, 12, 8, 7]`. Here, the best profit would come from buying at `2` and selling at `12`, resulting in a maximum profit of `10`.

## The Approach

To find the solution in optimal time complexity, we use a `O(n)` approach by scanning through the array only once:

1. **Initialize Tracking Variables**: Set `buyPrice` and `sellPrice` placeholders and start with `maxProfit` at `-1` to account for cases with no profit.
2. **Calculate Profit**: Iterate through each price. Update the `buyPrice` when a lower price is found, then compare and calculate potential profit whenever a higher `sellPrice` appears after it. This way, the maximum profit is recorded throughout the process.
3. **Return Result**: If no valid profit is found, return `-1`.

```javascript
function maxStockProfit(pricesArr) {
  let maxProfit = -1
  let buyPrice = 0
  let sellPrice = 0
  let changeBuyPrice = true

  for (let i = 0; i < pricesArr.length; i++) {
    if (changeBuyPrice) buyPrice = pricesArr[i]
    sellPrice = pricesArr[i + 1]

    if (sellPrice < buyPrice) {
      changeBuyPrice = true
    } else {
      let tempProfit = sellPrice - buyPrice
      if (tempProfit > maxProfit) maxProfit = tempProfit
      changeBuyPrice = false
    }
  }

  return maxProfit
}

// Example usage
maxStockProfit([5, 2, 10, 1, 12, 8, 7])
```

## Summary

The Max Stock Profit algorithm efficiently finds the highest possible profit from a single buy-sell transaction in a stock price array.

By using a `O(n)` approach, we optimize for larger data sets and demonstrate a dynamic tracking technique that minimizes time complexity, keeping the solution fast and scalable.
