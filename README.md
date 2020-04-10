# appeared.js

Simple tracking of DOM elements scrolling in and out of the view.

## Install

### Package Manager

```sh
yarn add @modernice/appeared // npm install @modernice/appeared --save
```

### CDN

#### Modern version
```html
<script src="https://unpkg.com/@modernice/appeared"></script>
```

## Use

```ts
import appeared from '@modernice/appeared'

const stop = appeared('#trigger', {
  multiple: true,

  appear: (el: Element, count: number) => {
    console.log(`element appeared ${count} times.`)
  },

  disappear: (el: Element, count: number) => {
    console.log(`element disappeared ${count} times.`)
  }
})

// disconnect the underlying IntersectionObserver
stop()
```
