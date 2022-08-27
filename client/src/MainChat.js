import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainChat = ({ socket, messages, lastMessageRef }) => {
	const navigate = useNavigate()
	const leaveHandler = () => {
		socket.emit('userLeave', { username: localStorage.getItem('username') })
		localStorage.removeItem('username')
		navigate('/')
	}
	return (
		<div className='mainchat'>
			<div className='chatTopBar'>
				<h1 style={{ margin: '15px' }}>CHAT ROOM</h1>
				<button className='leaveBtn' onClick={leaveHandler}>
					LEAVE
				</button>
			</div>
			<div className='chat'>
				{messages.length !== 0 ? (
					messages.map((m) =>
						m.name === localStorage.getItem('username') ? (
							<div className='senderMsgWrapper' key={m.id}>
								<p className='msgName'>{m.name}</p>
								<div className='senderMsg' ref={lastMessageRef}>
									<p>{m.text}</p>
								</div>
							</div>
						) : (
							<div className='recieverMsgWrapper' key={m.id}>
								<p className='msgNameReciever'>{m.name}</p>
								<div className='recieverMsg' ref={lastMessageRef}>
									<p>{m.text}</p>
								</div>
							</div>
						)
					)
				) : (
					<h2>Messages will appear here, Say something!</h2>
				)}
			</div>
		</div>
	)
}

export default MainChat
