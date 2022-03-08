import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/userAction';
import LoadingPage from '../components/views/LoadingPage/LoadingPage';

/**
 * option
 * '누구나' : 누구나 출입 가능한 페이지
 * '로그인한사람만'
 *  null: 누구나 출입 가능한 페이지
 *  true: 로그인 한 유저만 출입 가능한 페이지
 *  false: 로그인하지 않았을 때만 출입 가능한 페이지
 *
 * SpecificComponent: component
 * option: boolean
 * adminRoute: boolean
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (SpecificComponent, option, adminRoute = null) => {
	const AuthenticationCheck = (props) => {
		const navigate = useNavigate();
		const dispatch = useDispatch();
		const [isLoading, setIsLoading] = useState(true);

		// useEffect로 로그인 되지 않았을 때, option에 따라 라우트 처리?
		useEffect(() => {
			dispatch(auth())
				.then((response) => {
					if (response.payload.success === false) {
						if (option === true) {
							navigate('/login');
						}
					} else if (response.payload.success === true) {
						if (option === false) {
							navigate('/');
						}
					}
				})
				.catch((err) => {
					console.dir(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, []);

		if (isLoading) {
			return <LoadingPage />;
		}
		return <SpecificComponent {...props} />;
	};

	return <AuthenticationCheck />;
};
