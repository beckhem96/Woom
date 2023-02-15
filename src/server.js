import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listning on http://localhost:3000`);
// app.listen(3000, handleListen);
const server = http.createServer(app); // express.js로 http 서버를 생성
const wss = new WebSocket.Server({ server }); // WebSocket 객체 안에 http서버 넣어서 http, websocket을 둘다 사용 가능, http서버 위에 ws서버 만들었다고 이해
// http안 쓰고 싶으면 WebSocket만 쓰면 됨
// 동일한 포트에서 http, ws req 두개를 처리할 수 있음

wss.on("connection", (socket) => {
  console.log("connected to browser");
  socket.on("close", () => console.log("Disconnected from browser"));
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("hello!!");
});

server.listen(3000, handleListen);
