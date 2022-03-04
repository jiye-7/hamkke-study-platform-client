import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Navbar from './components/views/Navbar/Navbar';
import PostWritePage from './components/views/Post/PostWritePage/PostWritePage';
import UserInfoPage from './components/views/UserInfoPage/UserInfoPage';
import PostDetailPage from './components/views/Post/PostDetailPage/PostDetailPage';

function App() {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/write' element={<PostWritePage />} />
					<Route path='/userInfo' element={<UserInfoPage />} />
					<Route path='/post/:id' element={<PostDetailPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
