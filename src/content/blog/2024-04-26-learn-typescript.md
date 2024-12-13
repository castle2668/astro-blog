---
title: '[Note] TypeScript Course for Beginners - Learn TypeScript from Scratch!'
excerpt: '這個 TypeScript 學習大綱包含從基礎到進階的概念，涵蓋了 TypeScript 的基本語法、編譯器配置、高級類型和特性、泛型、裝飾器、命名空間和模組，以及 TypeScript 與其他工具的集成。此大綱適用於想要全面學習 TypeScript 的開發者，從基本開始，然後深入理解 TypeScript 的高級功能。'
tags: ['typescript']
date: 2024-04-26
author: 'Sean Huang'
image: 'react.jpg'
slug: 2024-04-26-learn-typescript
---

## Get Started

這一部分涵蓋了 TypeScript 的入門和基本概念。可能會涉及以下主題：

- Using Types：介紹基本的 TypeScript 型別概念
- Type Assignment and Type Inference：解釋型別指定和型別推斷

> 💡 The key difference: JavaScript uses “dynamic types” (resolved at runtime), TypeScript uses “static types” (set during development)

## TypeScript Basics

這一部分主要介紹 TypeScript 的基本語法和結構，包括基本的 JavaScript 型別和 TypeScript 特有的型別：

- Numbers, Strings and Booleans：基礎的型別

  ```tsx
  let name: string = 'John'
  let age: number = 25
  let isStudent: boolean = true

  function greet(person: string): string {
    return `Hello, ${person}!`
  }

  console.log(greet(name))
  ```

- Object Types：對象型別
- Array Types：陣列型別
- Tuples：元組

  - 元組的長度是固定的，不可隨意增加或刪除元素
  - 元組中元素的型別和順序必須符合定義
  - 在使用元組時，TypeScript 編譯器會檢查型別和順序，以確保符合定義

  ```tsx
  // 定義一個元組，包含兩個數字
  let point: [number, number] = [1, 2]

  // 定義一個包含名字和年齡的元組
  let person: [string, number] = ['Alice', 25]
  ```

- Enums：枚舉。枚舉的優點包括：

  - 可讀性：使用描述性的名稱代替數字或字串，可以使代碼更容易理解
  - 可維護性：當需要改變常量值時，只需修改枚舉的定義，避免在代碼中到處查找和修改
  - 防止錯誤：使用枚舉可以減少使用非預期值的風險

  ```tsx
  enum Direction {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'W',
  }

  console.log(Direction.NORTH) // 輸出："N"
  ```

  > 當定義枚舉時，常見的做法是使用駝峰命名法來定義枚舉的名稱，而使用全大寫來定義枚舉的常量值。這樣做可以在代碼中清楚地標識枚舉的值和其他變數，增強可讀性，有助於區分與普通變數的差異。然而，這不是嚴格規定的規則，而是一種慣例。

- The Any Type：任意型別
- Union Types：聯合型別

  - Union Types 用 `|` 符號將多個型別聯合起來，表明參數可以是其中之一

  ```tsx
  function printValue(value: number | string): void {
    if (typeof value === 'number') {
      console.log(`The number is ${value}`)
    } else {
      console.log(`The string is '${value}'`)
    }
  }

  printValue(42) // 輸出：The number is 42
  printValue('Hello') // 輸出：The string is 'Hello'
  ```

- Literal Types：字面量型別

  - Literal Types 允許你使用特定的值作為型別，而不僅僅是使用更通用的型別（如 `number` 或 `string`）
  - 定義一組固定的可能值，並限制其他值的使用

    例如，如果你要定義一個代表方向的變數，它只能是 "north"、"south"、"east" 或 "west"，可以使用字面量型別來限定可能的值：

  ```tsx
  type Direction = 'north' | 'south' | 'east' | 'west'

  function move(direction: Direction): void {
    console.log(`Moving in the ${direction} direction`)
  }

  move('north') // 輸出：Moving in the north direction
  // move('up');  // 錯誤：'up' 不是有效的方向
  ```

- Type Aliases：型別別名

  - 別名可以指向基本型別、聯合型別、元組型別、函數型別，甚至更複雜的結構

  ```tsx
  type Name = string // 給 string 型別取個別名
  type StringOrNumber = string | number // 聯合型別
  type Direction = 'north' | 'south' | 'east' | 'west' // 字面量型別
  // 物件型別別名
  type Person = {
    name: string
    age: number
  }
  ```

- Function Return Types and Void：函數返回型別和空型別

  - 在函數定義中指定函數應返回的型別。這有助於確保函數的返回值符合預期，並允許 TypeScript 編譯器進行型別檢查
    例如，下面是一個返回數字的函數，它明確指定了返回型別為 `number`：

    ```tsx
    function getSquare(num: number): number {
      return num * num
    }

    const result = getSquare(5) // 25
    ```

  - `void` 型別用於表示函數沒有返回值。這在定義那些不需要返回特定值的函數時非常有用，如事件處理器、日誌記錄函數等

    ```tsx
    function logMessage(message: string): void {
      console.log(message)
    }

    logMessage('Hello, TypeScript')
    ```

- Function Types and Callbacks：函數型別與回呼

  - 函數型別（Function Types）用於指定一個函數的參數和返回值的型別

    ```tsx
    // 定義一個接受兩個數字參數並返回數字的函數型別
    type MathOperation = (a: number, b: number) => number

    // 使用函數型別
    const add: MathOperation = (x, y) => x + y
    const subtract: MathOperation = (x, y) => x - y

    console.log(add(5, 3)) // 8
    console.log(subtract(5, 3)) // 2
    ```

  - 回呼函數（Callbacks）是函數型別的一個常見應用。它們允許你將函數作為參數傳遞，並在某些事件或操作完成後調用。
    例如，定義一個回呼函數型別，用於處理事件：

    ```tsx
    // 定義一個函數型別，接受一個字串參數且沒有返回值
    type EventCallback = (event: string) => void

    // 使用回呼函數
    function triggerEvent(callback: EventCallback, eventName: string): void {
      console.log(`Triggering event: ${eventName}`)
      callback(eventName) // 呼叫回呼函數
    }

    const handleEvent: EventCallback = event => {
      console.log(`Event handled: ${event}`)
    }

    triggerEvent(handleEvent, 'ClickEvent')
    ```

    在這個例子中，`EventCallback` 是一個回呼函數型別，定義了它接受一個字串參數且沒有返回值。這種回呼機制在事件驅動程式和異步操作中非常常見。

- The Unknown Type：未知型別

  - `unknown` 型別表示一個變數可能是任何型別
  - 它是比 `any` 更嚴格的通用型別，因為在使用 `unknown` 型別時，需要執行型別檢查或斷言，才能將其轉換為其他型別
  - `unknown` 的使用場景包括從外部來源接收數據、處理不確定的值、或者在函數中接受多種可能的參數

  ```tsx
  let value: unknown

  value = 42 // 可以是數字
  value = 'Hello' // 也可以是字串

  // 不能直接將 unknown 型別賦值給其他具體型別
  let name: string
  // name = value;  // 錯誤，因為 unknown 不能直接賦值

  // 必須執行型別檢查
  if (typeof value === 'string') {
    name = value // 這時可以賦值，因為已確定是字串
  }
  ```

  在這個例子中，我們使用 `unknown` 表示一個不確定型別的變數。要將 `unknown` 轉換為具體型別，需要執行型別檢查或型別斷言。

- The Never Type：永不型別

  - `never` 型別表示一個函數或表達式永遠不會有返回值，通常是因為它會拋出異常、進行無限循環、或呼叫 `process.exit()` 這類終止程序的操作
  - `never` 型別常見於以下幾種情況：

    - 函數拋出異常：當函數永遠不會正常返回，因為它總是拋出異常
    - 無限循環：當函數進入無限循環而不會退出
    - 編譯器不應該到達的地方：通常用於確保代碼的完整性

  ```tsx
  // throwError 總是拋出異常
  function throwError(message: string): never {
    throw new Error(message) // 總是拋出異常
  }

  // infiniteLoop 進行無限循環
  function infiniteLoop(): never {
    while (true) {
      // 這是一個無限循環
    }
  }

  // assertNever 用於在 switch 語句中處理不可能的情況
  function assertNever(x: never): never {
    throw new Error('Unexpected value: ' + x)
  }

  type Shape = 'circle' | 'square' | 'triangle'

  function getShapeArea(shape: Shape): number {
    switch (shape) {
      case 'circle':
        return Math.PI * 5 * 5 // 圓形面積
      case 'square':
        return 25 // 正方形面積
      case 'triangle':
        return 10 // 三角形面積
      default:
        assertNever(shape) // 處理不可能的情況
    }
  }
  ```

## Compiler & Configuration Deep Dive

`tsconfig.json` 是 TypeScript 專案的配置文件，用於指定編譯器選項、項目文件、型別檢查等。

基礎的 `tsconfig.json` 配置主要涉及編譯器選項、文件包含與排除，以及編譯目標等，以下是一些基礎選項的簡單說明。

### Compiler Options

- `target`：指定編譯後的 JavaScript 版本，例如 `ES5`、`ES6`、`ES2020` 等，這個選項決定了生成的 JavaScript 代碼的兼容性
- `module`：指定模組系統，如 `CommonJS`、`ES6`、`AMD` 等，這個選項決定了模組的使用方式。
- `strict`：開啟嚴格模式，包含一系列嚴格的型別檢查設定，這是建議的配置，能夠增強型別安全性
- `outDir`：指定編譯後輸出的目錄，這個選項決定編譯後的文件位置
- `rootDir`：指定源代碼的根目錄，這可以確保正確的目錄結構
- `sourceMap`：啟用或禁用源地圖，用於在調試時映射到原始 TypeScript 源碼
- `declaration`：生成 TypeScript 的聲明文件（`.d.ts`），用於外部型別定義
- `removeComments`：在編譯後移除註釋
- `noImplicitAny`：如果變數未指定型別，則不允許默認為 `any`。這是一個嚴格模式的選項

### File Inclusion and Exclusion

- `include`：指定要包含在編譯中的文件或目錄，例如：`["src//\*"]` 表示包含 `src`\*\* 目錄及其子目錄的所有文件
- `exclude`：指定不包含在編譯中的文件或目錄，例如：`["node_modules", "dist"]`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "sourceMap": true,
    "declaration": true,
    "removeComments": true,
    "noImplicitAny": true
  },
  "include": ["src//*"],
  "exclude": ["node_modules", "dist"]
}
```
