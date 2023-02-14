## Server Settings

### nodemon

서버 코드를 변경 할 때마다, 서버를 재시작해줌

```bash
npm i nodemon -D
```

```json
// nodemon.json

{
  "ignore": ["src/public/*"], // server.js가 바뀔 때만 재시작하게 해줌
  "exec": "babel-node src/server.js" // 이게 실행되면 babel-node를 가진 babel.config.json을 찾고 preset을 실행시킴
}
```

 exec를 이용해서 뒤에 명령어 실행

### Babel

참고: https://bravenamme.github.io/2020/02/12/what-is-babel/

Babel is a JavaScript compiler. babel 은 javascript 로 결과물을 만들어주는 컴파일러입니다. *`소스 대 소스 컴파일러 (transpiler)`* 라고 불립니다. 여튼 typescript 든 coffeescript 든 javascript 로의 compile 이 필수가 되어야 하며, 이를 담당하는게 babel

```bash
npm i @babel/core @babel/cli @babel/node @babel/preset-env -D
```

```json
// babel.config.json

{
    "preset": ["@babel/preset-env"]
}
```

### .gitignore

깃에 안올릴 것

```
/node_modules
```

### express

```bash
npm i express
```

```js
// src/server.js

import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // static 사용
app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log(`Listning on http://localhost:3000`);
app.listen(3000, handleListen);
```



### pug

참고 : https://inpa.tistory.com/entry/PUG-%F0%9F%93%9A-%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%97%94%EC%A7%84-html

**템플릿 엔진**

웹페이지 구성 시 가장 기본적으로 쓰이는 마크업 언어인 HTML은 정적인 언어이다. 주어진 기능만 사용할 수 있으며, 직접 기능을 추가할 수 없다. 그러나 자바스크립트와 함께라면 가능하다. (index.html 대신이라고 생각하면 될 것 같다.)

PUG 는 HTML 을 PUG 문법으로 작성하면 HTML 로 바꿔주는 기능을 한다. Pug 는 express의 패키지 view engine이다.

```bash
npm i pug
```

```json
// src/views/home.pug

doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Woom
  body 
    h1 It Works! // localhost:3000하면 이거 나오고
	script(src="/public/js/app.js") // static 설정하고 localhost:3000/public/js/app.js로 접근하면 app.js에 있는거 렌더됨
```



## Frontend Settings

Webpack 사용 안 할 예정