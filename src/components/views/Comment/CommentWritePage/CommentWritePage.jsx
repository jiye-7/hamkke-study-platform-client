import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import myProfile from '../../../utils/image/quokka.jpg';
import styled from 'styled-components';
import { createReply } from '../../../../_actions/replyAction';

const CommentSubmitButton = styled.button`
	background-color: #0a5ed5;
	color: #fff;
	border: none;
	padding: 5px 10px;
	font-weight: bold;
	margin-left: 10px;
	cursor: pointer;
`;

const CommentWritePage = (props) => {
	const dispatch = useDispatch();
	const [isInputFocus, setInputFocus] = useState(false);
	const [isInputValue, setInputValue] = useState('');

	const handleInputFocusIn = (e) => {
		if (e.currentTarget === e.target) {
			setInputFocus(true);
		} else {
			setInputFocus(true);
		}
	};

	const handleCancel = () => {
		setInputValue('');
		setInputFocus(false);
	};

	const handleCommentSubmit = async () => {
		const { post, userId } = props;
		const data = {
			postId: post.id,
			userId,
			contents: isInputValue,
		};

		const { payload } = await dispatch(createReply(data));

		if (payload && payload.success) {
			setInputValue('');
			setInputFocus(false);
		} else {
			setInputValue('');
			setInputFocus(false);
		}
	};

	return (
		<div className='comment-write'>
			<div className='comment-write-left'>
				<img
					src={myProfile}
					alt='profile img'
					style={{ width: '50px', height: '50px', borderRadius: '50%' }}
				/>
			</div>
			<div className='comment-write-right' onFocus={handleInputFocusIn}>
				<input
					type='text'
					placeholder='댓글 입력'
					onChange={(e) => setInputValue(e.target.value)}
					value={isInputValue}
				/>
				<div className='comment-write-right-button'>
					{isInputFocus && (
						<>
							<button className='cancel' onClick={handleCancel}>
								취소
							</button>
							{isInputValue.length > 1 ? (
								<CommentSubmitButton onClick={handleCommentSubmit}>
									댓글
								</CommentSubmitButton>
							) : (
								<button className='submit' disabled>
									댓글
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommentWritePage;
