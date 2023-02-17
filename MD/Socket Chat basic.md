### Socket Chat basic

 💡 이슈

**message 보내는데 출력이 Buffer로 되는 문제**

**발생 이유**

Socket에서 다루는 데이터가 이진 데이터이기 때문? (더 찾아보자..)

```jsx
msg.toString("utf8"); 
```

`message.toString("utf8)` 을 사용하면 복호화?된다.

**Frontend와 Backlend 간에 데이터 주고 받을 때 데이터 호환성**

**발생 이유**

Frontend는 JavaScript Obeject를 보내지만 Backend는 Java, Go, Python등을 사용하니 JSON 데이터 형식으로 변환해서 사용해야함

- `JSON.parse(data)` : string ⇒ JavaScript Object
- `JSON.stringify(data)` : JavaScript Object ⇒ string