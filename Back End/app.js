const express = require("express");
const DBConnection = require("./Config/DBConnection"); // Database connection
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Correct import
const { notFound, defaultErrorHandler } = require("./ErrorHandler/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Frontend's origin (adjust if different)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const server = http.createServer(app); // HTTP server
const io = new Server(server, { // Socket.IO with the correct server instance
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

// Track connected users
const users = {};

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("register", (userName) => {
        users[socket.id] = userName; // Associate username with the socket ID
        console.log(`${userName} has joined the chat`);
        socket.broadcast.emit("userJoined", userName); // Notify others
    });

    socket.on("message", (message) => {
        io.emit("message", message); // Broadcast message to all connected users
    });

    socket.on("disconnect", () => {
        const userName = users[socket.id];
        delete users[socket.id]; // Remove user from list
        console.log(`${userName} has disconnected`);
        socket.broadcast.emit("userLeft", userName); // Notify others
    });
});

// Routes
app.use("/users", require("./Routes/userRoutes/userRoutes"));

// Error Handlers
app.use(notFound);
app.use(defaultErrorHandler);

// Database Connection and Server Start
DBConnection()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });
