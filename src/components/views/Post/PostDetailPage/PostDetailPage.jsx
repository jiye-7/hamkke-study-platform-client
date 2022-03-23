import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
	getPost,
	deletePost,
	completionOfRecruitment,
} from '../../../../_actions/postAction';
import Tag from './Tag';
import PostInfoItem from '../PostInfoItem/PostInfoItem';
import handleConfirm from '../../../utils/Alert/Alert';
import profileImg from '../../../utils/image/quokka.jpg';

const PostDetailPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector(({ user }) => user);
	const { id: postId } = useParams();
	const [post, setPost] = useState({});
	const [postDeadline, setPostDeadline] = useState(false);

	useEffect(() => {
		async function post() {
			const { payload } = await getPost(postId);
			setPost(payload.post);
			setPostDeadline(payload.post.completed);
		}
		post();
	}, []);

	/** dangerouslySetInnerHTML 설정 */
	const createMarkup = () => ({ __html: DOMPurify.sanitize(post.contents) });

	/** 마감하기 */
	const handlePostDeadlineCheck = () => {
		setPostDeadline(true);
		completionOfRecruitment(postId);
		setPost({ ...post, completed: true });
	};

	/** 마감 취소 */
	const handlePostDeadlineCancel = () => {
		setPostDeadline(false);
		completionOfRecruitment(postId);
		setPost({ ...post, completed: false });
	};

	/** 마감 처리 alert */
	const handleDeadlineConfirm = () => {
		postDeadline
			? handleConfirm({
					title: '다시 개시하시겠어요?',
					text: '다시 글을 개시합니다.',
					confirmButtonText: '네, 다시 개시할게요.',
					cancelButtonText: '아니요!',
					confirmFunction: handlePostDeadlineCancel,
			  })
			: handleConfirm({
					title: '마감 처리 하시겠어요?',
					text: '마감 후 다시 개시 가능합니다.',
					confirmButtonText: '네, 마감합니다.',
					cancelButtonText: '아니요!',
					confirmFunction: handlePostDeadlineCheck,
			  });
	};

	/** 글 수정하기 */
	const handlePostUpdate = () => {
		navigate(`/alteration/${postId}`);
	};

	const handleUpdateConfirm = () => {
		handleConfirm({
			title: '글 내용을 수정하시겠어요?',
			text: '글 내용을 수정하러 갑니다',
			confirmButtonText: '글 수정',
			confirmFunction: handlePostUpdate,
		});
	};

	/** 글 삭제하기 */
	const handleDeleteConfirm = () => {
		handleConfirm({
			title: '작성하신 글을 삭제 하시겠어요?',
			text: '삭제하시면 되돌릴 수 없습니다. ',
			icon: 'warning',
			confirmButtonText: '네, 삭제할래요',
			cancelButtonText: '아니요',
			confirmFunction: () => {
				deletePost(post.id).then((result) => {
					if (result.type === 'delete_post') navigate('/');
				});
			},
		});
	};

	/** 기술 스택 */
	const renderTags = () =>
		post.stacks?.map((tag, idx) => <Tag tag={tag} key={idx} />);

	/** 글 작성자일 때만 마감, 수정, 삭제 버튼 보이도록 처리 */
	const handlePostWriter = () => {
		if (post.user?.nickname === userInfo.nickname) {
			return (
				<>
					{postDeadline ? (
						<button className='alert-btn' onClick={handleDeadlineConfirm}>
							마감 취소
						</button>
					) : (
						<button className='alert-btn' onClick={handleDeadlineConfirm}>
							마감
						</button>
					)}
					<button className='alert-btn' onClick={handleUpdateConfirm}>
						수정
					</button>
					<button className='alert-btn' onClick={handleDeleteConfirm}>
						삭제
					</button>
				</>
			);
		}
	};

	/** 좋아요 */
	const handleLikePost = () => {
		console.log('이 포스트 좋아요 등록할래!');
	};

	return (
		<section className='post-detail-container'>
			<div className='content-container'>
				<ArrowLeftOutlined onClick={() => navigate('/')} />
				<h1>{post.title}</h1>
				<div className='content-container_post-info'>
					<div className='user-info'>
						<img src={profileImg} className='user-info_profile' />
						<p className='user-info_nickname'>{post.user?.nickname}</p>
					</div>
					<p className='writing-date'>{post.createdAt?.split('T')[0]}</p>
				</div>
				<div className='content-container_post-handling'>
					{handlePostWriter()}
				</div>
				<div className='content-container_post-stack'>
					<p className='use-stack'>
						사용 언어 :<span>{renderTags()}</span>
					</p>
				</div>
				<div className='line' />
				<div
					className='post-content'
					dangerouslySetInnerHTML={createMarkup()}
				></div>
			</div>
			<div className='info-container'>
				<PostInfoItem
					page={'detail'}
					post={post}
					handleLikePost={handleLikePost}
				/>
			</div>
		</section>
	);
};

export default PostDetailPage;
