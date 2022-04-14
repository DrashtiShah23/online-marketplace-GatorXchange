const socketIo = require('socket.io')
const { USER_JOINED, MESSAGE_SEND } = require('../src/constants/events')//we need this dor event.js

const init = (app, server) => {
    const io = socketIo(server)

    app.set('io', io)

    io.on('connection', socket => { //io.emit client only msg socket.emit 
        console.log('client connected')

        socket.on('disconnect', data => {
            console.log('client disconnected')
        })

        socket.on(USER_JOINED, data => io.emit(USER_JOINED, data))
        socket.on(MESSAGE_SEND, data => io.emit(MESSAGE_SEND, data))
    })
}