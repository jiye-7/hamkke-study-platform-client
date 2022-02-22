import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Navbar from './components/views/Navbar/Navbar';
import WritePage from './components/views/WritePage/WritePage';
import UserPage from './components/views/UserPage/UserPage';

function App() {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/write' element={<WritePage />} />
					<Route path='/userInfo' element={<UserPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
