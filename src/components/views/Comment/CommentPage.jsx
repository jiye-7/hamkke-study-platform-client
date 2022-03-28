import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReplies } from '../../../_actions/replyAction';
import CommentWritePage from './CommentWritePage/CommentWritePage';
import CommentItem from './CommentItem/CommentItem';

const Comment = ({ post, userId }) => {
	const dispatch = useDispatch();
	const [replies, setReplies] = useState([]);
	const [isCommentComplete, setCommentComplete] = useState(false);

	useEffect(() => {
		if (post.id) {
			(async () => {
				const { payload } = await dispatch(getReplies(post.id));

				if (payload) {
					setReplies(payload);
				}
			})();
		}
	}, [post.id, isCommentComplete]);

	const handleCommentComplete = (state) => {
		setCommentComplete(state);
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
					return <CommentItem reply={reply} key={reply.id} userId={userId} />;
				})}
			</div>
		</div>
	);
};

export default Comment;
