The `style:` directive provides a shorthand for setting multiple styles on an element.

```php-template
<!-- These are equivalent -->
<div style:color="red">...</div>
<div style="color: red;">...</div>
```

The value can contain arbitrary expressions:

```css
<div style:color={myColor}>...</div>
```

The shorthand form is allowed:

```php-template
<div style:color>...</div>
```

Multiple styles can be set on a single element:

```bash
<div style:color style:width="12rem" style:background-color={darkMode ? 'black' : 'white'}>...</div>
```

To mark a style as important, use the `|important` modifier:

```php-template
<div style:color|important="red">...</div>
```

When `style:` directives are combined with `style` attributes, the directives will take precedence, even over `!important` properties:

```php-template
<div style:color="red" style="color: blue">This will be red</div>
<div style:color="red" style="color: blue !important">This will still be red</div>
```