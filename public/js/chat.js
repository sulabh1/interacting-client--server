const socket = io();
socket.on("message", (message) => {
  console.log(message);
});
document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});
document.getElementById("send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("GeoLocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      lattitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
// socket.on("countUpdated", (count) => {
//   console.log("The count has been updated", count);
// });
// document.getElementById("increment").addEventListener("click", (e) => {
//   socket.emit("increment");
// });
