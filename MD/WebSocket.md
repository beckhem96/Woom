# WebSocket

실시간 채팅, 방 생성, 닉네임, 알림 등

## HTTP vs WebSocket

<img src="C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20230215161919679.png" alt="image-20230215161919679" style="zoom:80%;" />

**HTTP**

`HTTP`는 프로토콜, `req`를 보내면`res`보내준다. 서버는 `res`보내고 내가 누군지 잊어버린다. 서버로 메세지 보내고 싶은데 로그인이 되있다면 쿠키만 보내면 된다. 만약 내 프로필 페이지를 보고 싶으면 쿠키를 서버로 보내서 일치하는 프로필로 res를 받는다. 서버가 누군지 잊는 걸 Stateless라고 한다. 브라우저와 서버 말고 서버와 서버 사이에도 작동한다.

**WebSocket**

웹 소켓도 프로토콜, [https://](https://www.notion.so/WebSocket-0e06ee151d32457eb3fa51668fa1a43b)~가 아니라 wss://~인 것처럼 `HTTP`와 완전 다른 프로토콜이다. 브라우저가 서버에 보낸 요청을 서버가 수락하면 계속 연결되 있는 것이다. 그래서 요청자가 누군지 기억하기 때문에 서버에서 클라이언트로 메세지를 보낼 수 있다. `req`와 `res`가 필요하지 않다. **연결되어 있을 때는 양방향 연결**이기 때문이다.  브라우저에는 내장된 WebSocket API가 있다. Websocket은 프로토콜이기 때문에 프로그래밍 언어에 국한되지 않는다. 브라우저와 서버 말고 서버와 서버 사이에도 작동한다.

**프로토콜**은 방에 사람이 모여서 규칙을 만든다. 프로그래머는 이 규칙을 따르는 코드를 작성한다.

## **WS implementation**

```
npm i ws
```

WebSocket이 채팅방을 만드는 게 아니라 WS로 채팅방을 구현할 수 있는것?

아무튼 ws서버를 만드는 게 아니라 express(http)서버와 합칠 예정인데 둘이 다른 프로토콜이기 때문이다.

다른 프로토콜이기 때문에 express에 합치는 기능을 추가할 것

```jsx
//src/public/js/app.js
const socket = new WebSocket(`ws://${window.location.host}`);
//src/server.js

const server = http.createServer(app); // express.js로 http 서버를 생성
const wss = new WebSocket.Server({ server }); 
// WebSocket 객체 안에 http서버 넣어서 http, websocket을 둘다 사용 가능, http서버 위에 ws서버 만들었다고 이해
// http안 쓰고 싶으면 WebSocket만 쓰면 됨
// 동일한 포트에서 http, ws req 두개를 처리할 수 있음
function handleConnection(socket) {
  // socket은 연결된 브라우저를 뜻함
  console.log(socket);
}
wss.on("connection", handleConnection);

server.listen(3000, handleListen);
```

app.js에서 socket은 서버로의 연결을 뜻하고 server.js에서 `function handleConnection(socket)` 의 socket은 브라우저를 뜻한다.

WebSocket도 Event가 발생하면 함수를 실행한다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/adb3d393-8408-4e88-a39a-ccd8b9e6ed0f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230215T094523Z&X-Amz-Expires=86400&X-Amz-Signature=75186314d683de6a2f16f7b6bdb7a6f21170bf955d79626adc59777dbf9ce807&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

method의 설명에 callback으로 socket(연결된 사람)을 받는다. 이 socket을 활용하면 메세지를 주고 받을 수 있다.

`wss.on("connection", handleConnection)` 은 connection event가 되면 handleConnection을 실행한다는 것이다.  on 메서드는 백엔드에 연결된 사람의 정보를 socket에서 제공한다. socket은 서버와 클라이언트와의 연결이다.

```jsx
//src/server.js
function handleConnection(socket) {
  // socket은 연결된 브라우저를 뜻함
  console.log(socket);
}
wss.on("connection", handleConnection);
```

위 코드는 아래처럼 쓸 수 있다.

```jsx
wss.on("connection", (socket) => {
  console.log(socket)
});
```

### WebSocket Messages

socket.send(메세지)는 wss 서버에 보내는 게 아니라 socket에 보내는 것

```jsx
// server.js

wss.on("connection", (socket) => {
  console.log("connected to browser");
  socket.on("close", () => console.log("Disconnected from browser"));
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("hello!!");
});
```

`const wss = new WebSocket.Server({ server });`  이것만 해줘도 브라우저와 connection되지만 connection event에 대해 아무 반응을 안하고 있는 것이다. 그래서 `wss.on("connection", ~` 로 event를 Listen한 것이다. eventListener에 socket을 받아 누구랑 연결됐는지 알 수 있다.

- on은 event로 상태 확인하고 함수 실행
- send는 연결된 서버 or 브라우저로 메세지 보내는 것

```jsx
// app.js

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  // socket이 open됐을 때 아래 출력
  console.log("connected to server");
});
socket.addEventListener("message", (message) => {
	// 메세지가 있으면 아래 출력
  console.log("Just got this:", message, "from the server");
});

socket.addEventListener("close", () => {
	// 소켓이 닫히면 아래 출력
  console.log("close from server");
});

setTimeout(() => {
  socket.send("Hello from the browser, ????1111");
}, 5000);wss.on("connection", (socket) => {
  console.log("connected to browser");
  socket.on("close", () => console.log("Disconnected from browser"));
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("hello!!");
});
```

server.js에서 브라우저와 서버 간의 wss가 connection이 되면 socket실행