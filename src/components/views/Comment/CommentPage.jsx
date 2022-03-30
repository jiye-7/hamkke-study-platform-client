import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReply, getReplies } from '../../../_actions/replyAction';
import CommentWritePage from './CommentWritePage/CommentWritePage';
import CommentItem from './CommentItem/CommentItem';

const Comment = ({ post, userInfo }) => {
	const dispatch = useDispatch();
	const { replies } = useSelector(({ reply }) => reply);

	useEffect(() => {
		if (post.id) {
			(async () => {
				await dispatch(getReplies(post.id));
			})();
		}
	}, [post.id]);

	const handleDeleteComment = async (replyId) => {
		await dispatch(deleteReply(replyId));
	};

	const renderCommentItems = () => {
		return replies?.map((reply) => (
			<CommentItem
				reply={reply}
				key={reply.id}
				userInfo={userInfo}
				handleDeleteComment={handleDeleteComment}
			/>
		));
	};

	return (
		<div className='post-comment-container'>
			<CommentWritePage post={post} userInfo={userInfo} type={'write'} />
			<div className='comment-view'>{renderCommentItems()}</div>
		</div>
	);
};

export default Comment;
