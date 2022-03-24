import React, { useState, useRef } from 'react';
import myProfile from '../../utils/image/quokka.jpg';
import styled from 'styled-components';

/** 1개의 댓글 보여주기
 * 프로필 사진, 닉네임, 댓글 내용
 *
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

const Comment = () => {
	const [isInputFocus, setIsInputFocus] = useState(false);
	const [isInputValue, setIsInputValue] = useState('');
	const [isCommentComplete, setIsCommentComplete] = useState(false);

	const handleInputFocusIn = (e) => {
		if (e.currentTarget === e.target) {
			setIsInputFocus(true);
		} else {
			setIsInputFocus(true);
		}
	};

	const handleCancel = () => {
		setIsInputValue('');
		setIsInputFocus(false);
	};

	const handleCommentSubmit = () => {
		setIsInputValue(isInputValue);
		setIsCommentComplete(true);
		setIsInputFocus(false);
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
						onChange={(e) => setIsInputValue(e.target.value)}
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
		</div>
	);
};

export default Comment;
