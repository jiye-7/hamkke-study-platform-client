import React from 'react';
import myProfile from '../../../utils/image/quokka.jpg';

const CommentItem = ({ reply }) => {
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
				<button>...</button>
			</div>
		</div>
	);
};

export default CommentItem;
