> `$inspect` only works during development. In a production build it becomes a noop.

The `$inspect` rune is roughly equivalent to `console.log`, with the exception that it will re-run whenever its argument changes. `$inspect` tracks reactive state deeply, meaning that updating something inside an object or array using fine-grained reactivity will cause it to re-fire ([demo](https://svelte.dev/playground/untitled#H4sIAAAAAAAACkWQ0YqDQAxFfyUMhSotdZ-tCvu431AXtGOqQ2NmmMm0LOK_r7Utfby5JzeXTOpiCIPKT5PidkSVq2_n1F7Jn3uIcEMSXHSw0evHpAjaGydVzbUQCmgbWaCETZBWMPlKj29nxBDaHj_edkAiu12JhdkYDg61JGvE_s2nR8gyuBuiJZuDJTyQ7eE-IEOzog1YD80Lb0APLfdYc5F9qnFxjiKWwbImo6_llKRQVs-2u91c_bD2OCJLkT3JZasw7KLA2XCX31qKWE6vIzNk1fKE0XbmYrBTufiI8-_8D2cUWBA_AQAA)):

```php-template
<script>
let count = $state(0);
let message = $state('hello');

$inspect(count, message); // will console.log when `count` or `message` change
</script>

<button onclick={() => count++}>Increment</button>
<input bind:value={message} />
```

On updates, a stack trace will be printed, making it easy to find the origin of a state change (unless you’re in the playground, due to technical limitations).

## $inspect(...).with[](https://svelte.dev/docs/svelte/$inspect#$inspect().with)

`$inspect` returns a property `with`, which you can invoke with a callback, which will then be invoked instead of `console.log`. The first argument to the callback is either `"init"` or `"update"`; subsequent arguments are the values passed to `$inspect` ([demo](https://svelte.dev/playground/untitled#H4sIAAAAAAAACkVQ24qDMBD9lSEUqlTqPlsj7ON-w7pQG8c2VCchmVSK-O-bKMs-DefKYRYx6BG9qL4XQd2EohKf1opC8Nsm4F84MkbsTXAqMbVXTltuWmp5RAZlAjFIOHjuGLOP_BKVqB00eYuKs82Qn2fNjyxLtcWeyUE2sCRry3qATQIpJRyD7WPVMf9TW-7xFu53dBcoSzAOrsqQNyOe2XUKr0Xi5kcMvdDB2wSYO-I9vKazplV1-T-d6ltgNgSG1KjVUy7ZtmdbdjqtzRcphxMS1-XubOITJtPrQWMvKnYB15_1F7KKadA_AQAA)):

```php-template
<script>
let count = $state(0);

$inspect(count).with((type, count) => {
if (type === 'update') {
debugger; // or `console.trace`, or whatever you want
}
});
</script>

<button onclick={() => count++}>Increment</button>
```

## $inspect.trace(...)[](https://svelte.dev/docs/svelte/$inspect#$inspect.trace())

This rune, added in 5.14, causes the surrounding function to be _traced_ in development. Any time the function re-runs as part of an [effect](https://svelte.dev/docs/svelte/$effect) or a [derived](https://svelte.dev/docs/svelte/$derived), information will be printed to the console about which pieces of reactive state caused the effect to fire.

```php-template
<script>
import { doSomeWork } from './elsewhere';

$effect(() => {
// $inspect.trace must be the first statement of a function body
$inspect.trace();
doSomeWork();
});
</script>
```

`$inspect.trace` takes an optional first argument which will be used as the label.