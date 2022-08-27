import './index.css'
import Home from './Home'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import socketIO from 'socket.io-client'
const socket = socketIO('ws://localhost:8900')
function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path='/home' element={<Home socket={socket} />}></Route>
					<Route path='/' element={<Login socket={socket} />}></Route>
				</Routes>
			</div>
		</Router>
	)
}

export default App
