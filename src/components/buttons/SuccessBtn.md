### Without hover

```js
<div>
  <SuccessBtn>Hello world</SuccessBtn> <SuccessBtn fill>Hello world</SuccessBtn>
</div>
```

### With hover

```js
<div>
  <SuccessBtn fill hover>
    Hello world
  </SuccessBtn> <SuccessBtn hover>Hello world</SuccessBtn>
</div>
```

### With loader

```js
<div>
    <SuccessBtn loader fill /> <SuccessBtn loader />
</div>
```

### With click handler

```js
const clickHandler = () => {
  alert("Hello world");
};
<div>
    <SuccessBtn fill onClick={clickHandler}>
    Click me for Hello World
    </SuccessBtn> <SuccessBtn onClick={clickHandler}>
    Click me for Hello World
    </SuccessBtn>
</div>
```
