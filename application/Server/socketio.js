
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const Router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom, users } = require("./Users")
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.use((socket,) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
        /**find session id */
        const session = null;
        if (session) {
            socket.sessionId = sessionId;
            socket.userId = session.userId
            socket.username = session.username;
            return next()
        } else {
            return next(new Error("invalid session"))
        }
    }
});

io.on("connect", async (socket) => {
    /**fetch all user's connection */

    socket.on("join", ({ username, room }, callback) => {
        const { error, user } = addUser({ userId: socket.userId, username, room })
        addUser.socket.id = users.name
        if (error || users.length > 11)
            return callback(error)

        socket.emit("users", users)

        //connect event
        socket.emit("message", {
            sessionId: socket.sessionId,
            userId: socket.userId,
            username: `Welcome! ${socket.username} 
            to ${user.room}`
        })

        //new user
        socket.broadcast.to(user.room).emit("message", {
            userId: socket.userId,
            text: `${socketuser.name} has joined!`,
        });

        socket.join(socket.userId.room)
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message", { user: user.name, text: message })
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })
    socket.on("disconnect", () => {
        console.log("user disconnected")
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` })
        }
    })

})

app.use(Router)
app.use(cors())

server.listen(PORT, () => {
    console.log("server has started working at port " + PORT)
})