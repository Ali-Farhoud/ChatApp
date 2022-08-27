import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ socket }) => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const submitHandler = (e) => {
		e.preventDefault()
		localStorage.setItem('username', username)
		socket.emit('newUser', {
			username: localStorage.getItem('username'),
			socketID: socket.id,
		})
		navigate('/home')
	}
	return (
		<div className='login'>
			<div className='loginBox'>
				<form className='loginForm' onSubmit={submitHandler}>
					<h2>Sign in to chat</h2>
					<label htmlFor='username'>Username</label>
					<input
						name='username'
						type='text'
						minLength={6}
						className='username-input'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button className='signinBtn'>ENTER CHATROOM</button>
				</form>
				<p className='termsText'>
					* By signing in you are agreeing to our terms and conditions
				</p>
			</div>
		</div>
	)
}

export default Login
