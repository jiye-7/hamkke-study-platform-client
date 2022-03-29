import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReply, getReplies } from '../../../_actions/replyAction';
import CommentWritePage from './CommentWritePage/CommentWritePage';
import CommentItem from './CommentItem/CommentItem';

const Comment = ({ post, userId }) => {
	const dispatch = useDispatch();
	const [replies, setReplies] = useState([]);
	const [isCommentComplete, setCommentComplete] = useState(false);
	const [deleteComplete, setDeleteComplete] = useState(false);

	useEffect(() => {
		if (post.id) {
			(async () => {
				const { payload } = await dispatch(getReplies(post.id));

				if (payload) {
					setReplies(payload);
				}
			})();
		}
	}, [post.id, isCommentComplete, deleteComplete]);

	const handleCommentComplete = (state) => {
		setCommentComplete(state);
	};

	const handleDeleteComment = async (replyId) => {
		const { payload } = await dispatch(deleteReply(replyId));
		if (payload.success) {
			const newReplies = replies.filter((reply) => reply.id !== replyId);
			setReplies(newReplies);
			setDeleteComplete(true);
		}
	};

	return (
		<div className='post-comment-container'>
			<CommentWritePage
				post={post}
				userId={userId}
				isCommentComplete={isCommentComplete}
				handleCommentComplete={handleCommentComplete}
			/>
			<div className='comment-view'>
				{replies?.map((reply) => {
					return (
						<CommentItem
							reply={reply}
							key={reply.id}
							userId={userId}
							handleDeleteComment={handleDeleteComment}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Comment;
