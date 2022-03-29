import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import myProfile from '../../../utils/image/quokka.jpg';
import styled from 'styled-components';
import { createReply, updateReply } from '../../../../_actions/replyAction';

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
	const { post, userInfo, type } = props;
	const dispatch = useDispatch();
	const [isInputFocus, setInputFocus] = useState(false);
	const [isInputValue, setInputValue] = useState(
		type === 'write' ? '' : props.contents,
	);

	const handleInputFocusIn = (e) => {
		if (e.currentTarget === e.target) {
			setInputFocus(true);
		} else {
			setInputFocus(true);
		}
	};

	const handleCancel = () => {
		if (type === 'write') {
			setInputValue('');
			setInputFocus(false);
		} else {
			setInputValue(props.contents);
			setInputFocus(false);
			props.handleCommentUpdateCancel();
		}
	};

	const handleCommentSubmit = async () => {
		const data = {
			postId: post.id,
			userId: userInfo.id,
			contents: isInputValue,
		};

		const { payload } = await dispatch(createReply(data, userInfo.nickname));

		if (payload && payload.success) {
			setInputValue('');
			setInputFocus(false);
		} else {
			setInputValue('');
			setInputFocus(false);
		}
	};

	/** update */
	const handleCommentUpdate = async () => {
		const data = { replyId: props.replyId, contents: isInputValue };
		const payload = await dispatch(updateReply(data, userInfo.nickname));

		if (payload.type === 'update_reply') {
			props.handleCommentUpdateCancel();
		}
	};

	return (
		<div className='comment-write'>
			<div
				className={
					type === 'create' ? 'comment-write-left' : 'comment-update-left'
				}
			>
				<img
					src={myProfile}
					alt='profile img'
					style={{
						width: `${type === 'create' ? '50px' : '45px'}`,
						height: `${type === 'create' ? '50px' : '45px'}`,
						borderRadius: '50%',
					}}
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
								<CommentSubmitButton
									onClick={
										type === 'write' ? handleCommentSubmit : handleCommentUpdate
									}
								>
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
