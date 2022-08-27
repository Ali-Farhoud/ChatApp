import React, { useEffect, useState } from 'react'

const Sidebar = ({ socket }) => {
	const [users, setUsers] = useState([])
	useEffect(() => {
		socket.on('newUserResponse', (data) => setUsers(data))
	}, [socket, users])
	return (
		<div className='sidebar'>
			<h3 className='sidebarHeading'>Online friends</h3>
			<div className='searchInputWrapper'>
				<input
					className='searchInput'
					type='text'
					placeholder='Search for users...'
				/>
				<span>
					<i className='fa-solid fa-magnifying-glass'></i>
				</span>
			</div>
			<ul className='onlineFriends'>
				{users.length !== 0 ? (
					users.map(
						(u) =>
							u.socketID !== socket.id && (
								<li className='onlineFriend' key={u.socketID}>
									<i className='fa-solid fa-user'></i> {u.username}
								</li>
							)
					)
				) : (
					<h3>This chat room is currently empty</h3>
				)}
			</ul>
		</div>
	)
}

export default Sidebar
