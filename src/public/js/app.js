const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  // socket이 open됐을 때
  console.log("connected to server");
});
socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from server");
});

setTimeout(() => {
  socket.send("Hello from the browser, ????1111");
}, 5000);
