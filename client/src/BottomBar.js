import React, { useState } from 'react'

const BottomBar = ({ socket }) => {
	const [message, setMessage] = useState('')
	const sendMessageHandler = () => {
		if (message.trim() && localStorage.getItem('username')) {
			socket.emit('message', {
				text: message,
				name: localStorage.getItem('username'),
				id: `${socket.id}${Math.random()}`,
				socketID: socket.id,
			})
		}
		setMessage('')
	}
	return (
		<div className='bottombar'>
			<input
				className='msgInput'
				type='text'
				value={message}
				placeholder='Enter a message...'
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={sendMessageHandler} className='msgBtn'>
				<i className='fa-solid fa-paper-plane'></i>
				SEND
			</button>
		</div>
	)
}

export default BottomBar
