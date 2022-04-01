import React, { useState } from 'react';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import CommentWritePage from '../CommentWritePage/CommentWritePage';
import handleConfirm from '../../../utils/Alert/Alert';
import myProfile from '../../../utils/image/quokka.jpg';

const ProfileImg = styled.img`
	width: 45px;
	height: 45px;
	border-radius: 50%;
`;

const Container = styled.div`
	position: absolute;
	z-index: 2;
	transform: translateX(35%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 130px;
	height: 70px;
	border-radius: 5px;
	background-color: #d7ccc8;
`;

const Overlay = styled.div`
	display: none;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	background-color: rgba(255, 255, 255, 0);
`;

const CommentItem = (props) => {
	const { reply, userInfo } = props;
	const [isModalState, setModalState] = useState(false);
	const [isCommentUpdateState, setCommentUpdateState] = useState(false);

	const handleOpenModal = () => {
		setModalState(true);
	};

	const handleCloseModal = () => {
		setModalState(false);
	};

	const handleChangeComment = (e, value) => {
		if (value === 'delete') {
			handleConfirm({
				title: '정말 댓글을 삭제하시겠습니까?',
				confirmFunction: () => props.handleDeleteComment(reply.id),
			});
			handleCloseModal();
		} else {
			handleCloseModal();
			handleCommentUpdate();
		}
	};

	const handleCommentUpdate = () => {
		setCommentUpdateState(true);
	};

	const handleCommentUpdateCancel = () => {
		setCommentUpdateState(false);
	};

	return (
		<>
			{isCommentUpdateState ? (
				<CommentWritePage
					type={'update'}
					contents={reply.contents}
					handleCommentUpdateCancel={handleCommentUpdateCancel}
					replyId={reply.id}
					userInfo={userInfo}
				/>
			) : (
				<div className='comment-item-container'>
					<div className='comment-view_left'>
						<ProfileImg src={myProfile} alt='profile img' />
					</div>
					<div className='comment-view_right'>
						<span>{reply.nickname}</span>
						<p>{reply.contents}</p>
						{reply.userId === userInfo.id && (
							<div className='comment-more'>
								<MoreOutlined onClick={handleOpenModal} />
								{isModalState && (
									<Container isModalState={isModalState} className='modal'>
										<button
											className='delete'
											onClick={(e) => handleChangeComment(e, 'delete')}
										>
											삭제
										</button>
										<button
											className='update'
											onClick={(e) => handleChangeComment(e, 'update')}
										>
											수정
										</button>
									</Container>
								)}
							</div>
						)}
					</div>
				</div>
			)}
			<Overlay
				onClick={handleCloseModal}
				className={isModalState && `active`}
			/>
		</>
	);
};

export default CommentItem;
