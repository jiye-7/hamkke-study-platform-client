import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/userAction';
import LoadingPage from '../components/views/LoadingPage/LoadingPage';
import handleConfirm from '../components/utils/Alert/Alert';

/**
 * option
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
					handleConfirm({
						title: '서비스를 점검하고 있습니다.',
						text: '잠시 후 다시 시도해주시기 바랍니다.',
						icon: 'error',
						showCancelButton: false,
					});
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
