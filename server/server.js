const express = require('express')
const app = express()
const PORT = 8000

const cors = require('cors')
app.use(cors())
const socketIO = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3000',
	},
})
let users = []
socketIO.on('connection', (socket) => {
	console.log(`user ${socket.id} just connected`)

	//listen to message
	socket.on('message', (data) => {
		socketIO.emit('messageResponse', data)
	})
	// new user
	socket.on('newUser', (data) => {
		users.push(data)
		socketIO.emit('newUserResponse', users)
		console.log(users.length)
	})
	socket.on('userLeave', ({ username }) => {
		users = users.filter((u) => u.username !== username)
		socketIO.emit('newUserResponse', users)
		console.log(users.length)
	})
	socket.on('disconnect', () => {
		console.log(`user ${socket.id}  DISconnected`)
		users = users.filter((u) => u.socketID !== socket.id)
		socketIO.emit('newUserResponse', users)
		console.log(users.length)
		socket.disconnect()
	})
})
app.get('/api', (req, res) => {
	res.send('anything')
})
app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`)
})
