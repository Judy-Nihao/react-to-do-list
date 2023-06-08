# 實作紀錄：To-Do List 三重奏之二：React+Vite

## 實作網址
gh-pages

https://judy-nihao.github.io/react-to-do-list

GitHub Repo

https://github.com/Judy-Nihao/react-to-do-list

## 實作功能

- 新增刪除待辦事項
- 清除已完成事項、清除全部事項
- 重整頁面紀錄清單狀態
- 手機版調整畫面點擊體驗
- 電腦版設置按鈕 hover 提示

![](https://hackmd.io/_uploads/ByrCCGJv3.jpg)

![](https://hackmd.io/_uploads/BJqCRGyw2.jpg)


## 筆記

「ToDo List 三重奏」是我為了體會原生JS和框架的邏輯差異，以及比較兩大框架 Vue 和 React 自己使用起來的上手程度，來決定往後偏好優先深入研究的對象，我以 ToDo List 的實作當作比較基礎，製作出三個 ToDo List ，兩種框架共同使用 Vite 作為前端建構工具。

兩種框架其實在精神上都有一些共同的邏輯，例如：變數本身都是不可以修改的 ( immutable )，必須再多包一層東西，透過更改value、或是去陣列解構賦值的方式，去修改變數內容。

而不是像原生 JS 直接使用「等號」賦值。

Vue 是用 `ref()` 

變數的值要用 `ref()` 包起來，要取得 `count` 的值時要寫 `conut.value` ，變數內的值變得像是某種屬性。

```jsx
import { ref } from 'vue'

const count = ref(1)
console.log(count.value) // 1
```

React 則是用 `useState()` 

用解構賦值方式處理變數。「解構賦值」可以把陣列或物件中的資料解開擷取成為獨立變數。

想要更改變數 `count` 存取的值，必須透過函式 `setCount` 去更改。

```jsx
import { useState } from 'react';

// 這是陣列的解構賦值
const [count, setCount] = useState(5);
setCount(10); // count 的值就會變成 10
```

實作過程還有很多細節，兩種框架實作的筆記會陸續增補到 Hack MD 上面。

Hack MD：https://hackmd.io/jDTNfVnoQ5KlAVtLNe9VqQ?view