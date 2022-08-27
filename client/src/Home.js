import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import MainChat from './MainChat'
import BottomBar from './BottomBar'

const Home = ({ socket }) => {
	const [messages, setMessages] = useState([])
	const lastMessageRef = useRef(null)
	useEffect(() => {
		socket.on('messageResponse', (data) => setMessages([...messages, data]))
		console.log(messages)
	}, [socket, messages])
	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])
	return (
		<div className='home'>
			<Sidebar socket={socket} />
			<div className='main'>
				<MainChat
					socket={socket}
					messages={messages}
					lastMessageRef={lastMessageRef}
				/>
				<BottomBar socket={socket} />
			</div>
		</div>
	)
}

export default Home
