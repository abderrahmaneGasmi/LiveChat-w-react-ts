const express = require("express");
const cors = require("cors");
const path = require("path");
const UserRoutes = require("./routes/UserRoutes");
const chatMessagesRoutes = require("./routes/chatMessagesRoutes");
const dotenv = require("dotenv");
// const session = require("express-session");
// const jwt = require("jsonwebtoken");
const http = require("http");
const { connectDb } = require("./config/DB");
//templating
dotenv.config({ path: "./config/config.env" });

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", UserRoutes);
app.use("/chat", chatMessagesRoutes);
connectDb();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ user, message }) => {
    socket.broadcast.emit("recieveMessage", { username: user, message });
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typingUser", { username: data });
  });
});

server.listen(1111, () => {
  console.log("server is running on port 1111");
});
