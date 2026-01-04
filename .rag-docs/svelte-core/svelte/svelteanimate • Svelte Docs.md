```javascript
import { flip } from 'svelte/animate';
```

## flip[](https://svelte.dev/docs/svelte/svelte-animate#flip)

The flip function calculates the start and end position of an element and animates between them, translating the x and y values. `flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).

```css
function flip(
node: Element,
{
from,
to
}: {
from: DOMRect;
to: DOMRect;
},
params?: FlipParams
): AnimationConfig;
```

## AnimationConfig[](https://svelte.dev/docs/svelte/svelte-animate#AnimationConfig)

```kotlin
interface AnimationConfig {…}
```

```typescript
easing?: (t: number) => number;
```

```typescript
css?: (t: number, u: number) => string;
```

```typescript
tick?: (t: number, u: number) => void;
```

## FlipParams[](https://svelte.dev/docs/svelte/svelte-animate#FlipParams)

```typescript
duration?: number | ((len: number) => number);
```

```typescript
easing?: (t: number) => number;
```