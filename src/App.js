import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Navbar from './components/views/Navbar/Navbar';
import PostWritePage from './components/views/Post/PostWritePage/PostWritePage';
import UserInfoPage from './components/views/UserInfoPage/UserInfoPage';
import PostDetailPage from './components/views/Post/PostDetailPage/PostDetailPage';
import PostUpdatePage from './components/views/Post/PostUpdatePage/PostUpdatePage';
import MyWritePage from './components/views/MyPost/MyWritePage/MyWritePage';
import MyLikePage from './components/views/MyPost/MyLikePage/MyLikePage';

function App() {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={Auth(LandingPage, null)} />
					<Route path='/login' element={Auth(LoginPage, false)} />
					<Route path='/register' element={Auth(RegisterPage, false)} />
					<Route path='/write' element={Auth(PostWritePage, true)} />
					<Route path='/userInfo' element={Auth(UserInfoPage, true)} />
					<Route path='/post/:id' element={Auth(PostDetailPage, null)} />
					<Route path='/alteration/:id' element={Auth(PostUpdatePage, true)} />
					<Route path='/myPosts' element={Auth(MyWritePage, true)} />
					<Route path='/myLike' element={Auth(MyLikePage, true)} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
