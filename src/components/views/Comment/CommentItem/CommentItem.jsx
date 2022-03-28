import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { deleteReply } from '../../../../_actions/replyAction';
import handleConfirm from '../../../utils/Alert/Alert';
import myProfile from '../../../utils/image/quokka.jpg';

const CommentItem = ({ reply, userId }) => {
	const [isClick, setIsClick] = useState(false);
	const [isUpdateState, setUpdateState] = useState('');

	const handleMoreMenu = (e) => {
		setIsClick(true);
	};

	const addBodyEvent = () => {
		document.body.addEventListener('click', (e) => {
			/**
			 * !['comment-more', 'anticon', 'anticon-more'].includes(e.target.className)
			 */
			if (
				e.target.className !== 'comment-more' &&
				e.target.className !== 'anticon' &&
				e.target.className !== 'anticon-more'
			) {
				setIsClick(false);
				document.body.removeEventListener('click');
			}
		});
	};

	const handleDeleteComment = () => deleteReply(reply.id);
	// const handleUpdateComment = () => ;

	const handleChangeComment = async (e, value) => {
		// 어디를 클릭해도 이벤트가 실행됨 ? -> 바디
		if (value === 'delete') {
			handleConfirm({
				title: '정말 댓글을 삭제하시겠습니까?',
				confirmFunction: handleDeleteComment,
				// cancelFunction: setIsClick(false),
			});
		} else {
			// 수정 버큰 클릭 시 다시 input 창 불러오고 값 입력할 수 있도록 처리 그리고, 확인으로 글자 바꾼 뒤 수정 요청 보내기
			// 수정 alert창에서 수정/삭제
			console.log('댓글 수정할래!');
		}
	};

	const handleFocusOut = () => {};

	/* const handleFocusOut = (e) => {
		if (e.currentTarget === e.target) {
			console.log('self out');
			// setIsClick(false);
		} else {
			console.log('child out');
			setIsClick(false);
		}

		if (!e.currentTarget.contains(e.relatedTarget)) {
			console.log('////');
			setIsClick(false);
		}
	}; */

	return (
		<div className='comment-item-container'>
			<div className='comment-view_left'>
				<img
					src={myProfile}
					alt='profile img'
					style={{ width: '45px', height: '45px', borderRadius: '50%' }}
				/>
			</div>
			<div className='comment-view_right'>
				<span>{reply.nickname}</span>
				<p>{reply.contents}</p>
				{reply.userId === userId && (
					<div
						className='comment-more' /* tabIndex={-1} onBlur={handleFocusOut} */
					>
						{isClick ? (
							<>
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
							</>
						) : (
							<button
								onClick={() => {
									handleMoreMenu();
									addBodyEvent();
								}}
							>
								더 보기
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
