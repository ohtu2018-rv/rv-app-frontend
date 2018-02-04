### Without hover

```js
<div>
  <BasicBtn>Hello world</BasicBtn> <BasicBtn fill>Hello world</BasicBtn>
</div>
```

### With hover

```js
<div>
  <BasicBtn fill hover>
    Hello world
  </BasicBtn> <BasicBtn hover>Hello world</BasicBtn>
</div>
```

### With loader

```js
<div>
    <BasicBtn loader fill /> <BasicBtn loader />
</div>
```

### With click handler

```js
const clickHandler = () => {
  alert("Hello world");
};
<div>
    <BasicBtn fill onClick={clickHandler}>
    Click me for Hello World
    </BasicBtn> <BasicBtn onClick={clickHandler}>
    Click me for Hello World
    </BasicBtn>
</div>
```
