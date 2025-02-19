import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",  // Adjust the origin to match your frontend's address
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.username = username;
  socket.userId = uuidv4();
  next();
});

io.on("connection", (socket) => {
  console.log(`${socket.username} connected`);

  // Emit connected users
  const users = [];
  for (let [id, s] of io.of("/").sockets) {
    users.push({
      userId: s.userId,
      username: s.username,
    });
  }
  socket.emit("users", users);

  // Emit session details for the connected user
  socket.emit("session", { userId: socket.userId, username: socket.username });

  // Emit a "user connected" event to other users
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
  });

  // Handle incoming messages
  socket.on("new message", (message) => {
    socket.broadcast.emit("new message", {
      userId: socket.userId,
      username: socket.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
    socket.broadcast.emit("user disconnected", {
      userId: socket.userId,
      username: socket.username,
    });
  });
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000...");
});
