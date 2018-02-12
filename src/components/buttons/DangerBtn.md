### Without hover

```js
<div>
  <DangerBtn>Hello world</DangerBtn> <DangerBtn fill>Hello world</DangerBtn>
</div>
```

### With hover

```js
<div>
  <DangerBtn fill hover>
    Hello world
  </DangerBtn> <DangerBtn hover>Hello world</DangerBtn>
</div>
```

### With loader

```js
<div>
    <DangerBtn loader fill /> <DangerBtn loader />
</div>
```

### With click handler

```js
const clickHandler = () => {
  alert("Hello world");
};
<div>
    <DangerBtn fill onClick={clickHandler}>
    Click me for Hello World
    </DangerBtn> <DangerBtn onClick={clickHandler}>
    Click me for Hello World
    </DangerBtn>
</div>
```
