import React, { useState } from 'react';
import { createReply } from '../../../_actions/replyAction';
import myProfile from '../../utils/image/quokka.jpg';
import styled from 'styled-components';

/**
 * 1개의 댓글 보여주기
 * 프로필 사진, 닉네임, 댓글 내용
 */

/**
 * 1. 프로필 사진, input 창이 보임 <기본 상태>
 * 2. input 태그를 클릭하면, 취소, 댓글 버튼이 보임 (댓글 버튼은 비 활성화)
 * 3. input 태그에 focus일 때, border-bottom 색 진하게 보여줌
 * 4. 글을 입력하면, 댓글 버튼이 활성화 됨
 */

const CommentSubmitButton = styled.button`
	background-color: #0a5ed5;
	color: #fff;
	border: none;
	padding: 5px 10px;
	font-weight: bold;
	margin-left: 10px;
	cursor: pointer;
`;

const Comment = ({ post, userId }) => {
	const [isInputFocus, setInputFocus] = useState(false);
	const [isInputValue, setInputValue] = useState('');
	const [isCommentComplete, setCommentComplete] = useState(false);

	const handleInputFocusIn = (e) => {
		if (e.currentTarget === e.target) {
			setInputFocus(true);
		} else {
			setInputFocus(true);
		}
	};

	const handleCancel = () => {
		if (isCommentComplete) {
			setInputValue(isInputValue);
			setInputFocus(false);
		} else {
			setInputValue('');
			setInputFocus(false);
		}
	};

	const handleCommentSubmit = async () => {
		// console.log(post.id, userId);
		const data = {
			postId: post.id,
			userId,
			contents: isInputValue,
		};
		// console.log(data);
		let { payload } = await createReply(data);

		if (payload && payload.success) {
			setInputValue(isInputValue);
			setCommentComplete(true);
			setInputFocus(false);
		} else {
			setInputValue('');
			setCommentComplete(false);
			setInputFocus(false);
		}
	};

	return (
		<div className='post-comment-container'>
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
										{isCommentComplete ? '수정' : '댓글'}
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
			<div className='comment-view'>
				<div className='comment-view_left'>
					<img
						src={myProfile}
						alt='profile img'
						style={{ width: '45px', height: '45px', borderRadius: '50%' }}
					/>
				</div>
				<div className='comment-view_right'>
					<span>닉네임</span>
					<p>
						댓글 내용: 안녕하세요~~~~~~~!!!! 저도 스터디에 참여하고 싶어용!!!!
					</p>
					<button>...</button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
