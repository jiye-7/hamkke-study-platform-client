import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getPost } from '../../../../_actions/postAction';
import Tag from './Tag';

const PostDetailPage = () => {
	const { userInfo } = useSelector(({ user }) => user);
	const { id: postId } = useParams();
	const [POST, setPost] = useState({});
	console.log(POST);
	// console.log(POST.tags.split(',').map((tag, idx) => `${(tag, idx)}`));

	useEffect(() => {
		async function post() {
			const { payload } = await getPost(postId);
			setPost(payload.post);
		}
		post();
	}, []);

	const createMarkup = () => ({ __html: DOMPurify.sanitize(POST.contents) });

	const renderTags = () =>
		POST.tags?.split(',').map((tag, idx) => <Tag tag={tag} key={idx} />);

	return (
		<section className='post-detail-container'>
			<div className='content-container'>
				<ArrowLeftOutlined />
				<h1>{POST.title}</h1>
				<div>
					<div>
						<img src={userInfo.profile} />
						<p>{POST.user?.nickname}</p>
					</div>
					<p>{POST.createdAt?.split('T')[0]}</p>
				</div>
				<p>
					사용 언어 :<span>{renderTags()}</span>
				</p>
				<div className='line' />
				<div dangerouslySetInnerHTML={createMarkup()}></div>
			</div>
		</section>
	);
};

export default PostDetailPage;
