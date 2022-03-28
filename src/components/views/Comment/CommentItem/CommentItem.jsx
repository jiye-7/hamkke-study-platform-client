import React, { useState } from 'react';
import styledComponents from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import { deleteReply } from '../../../../_actions/replyAction';
import handleConfirm from '../../../utils/Alert/Alert';
import myProfile from '../../../utils/image/quokka.jpg';

const ProfileImg = styledComponents.img`
	width: 45px;
	height: 45px;
	border-radius: 50%;
`;

const Container = styledComponents.div`
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

const Overlay = styledComponents.div`
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
	const { reply, userId } = props;
	// const [isClick, setIsClick] = useState(false);
	const [isModalState, setModalState] = useState(false);
	// const [isUpdateState, setUpdateState] = useState('');

	/* const handleMoreMenu = () => {
		setIsClick(true);
	}; */

	const handleOpenModal = () => {
		setModalState(true);
	};

	const handleCloseModal = (e) => {
		e.preventDefault();
		setModalState(false);
	};

	const handleDeleteComment = () => deleteReply(reply.id);

	const handleChangeComment = async (e, value) => {
		if (value === 'delete') {
			handleConfirm({
				title: '정말 댓글을 삭제하시겠습니까?',
				confirmFunction: handleDeleteComment,
				// cancelFunction: setIsClick(false),
			});
		} else {
			console.log('댓글 수정할래!');
		}
	};

	return (
		<>
			<div className='comment-item-container'>
				<div className='comment-view_left'>
					<ProfileImg src={myProfile} alt='profile img' />
				</div>
				<div className='comment-view_right'>
					<span>{reply.nickname}</span>
					<p>{reply.contents}</p>
					{reply.userId === userId && (
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
			<Overlay
				onClick={handleCloseModal}
				className={isModalState && `active`}
			/>
		</>
	);
};

export default CommentItem;
