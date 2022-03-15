import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingWrap = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
`;

const Loading = ({ type, color }) => {
	return (
		<LoadingWrap>
			<ReactLoading type='spin' color='#7e57c2' width={'20%'} />
		</LoadingWrap>
	);
};

export default Loading;
