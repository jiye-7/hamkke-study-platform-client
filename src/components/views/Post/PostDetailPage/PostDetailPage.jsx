import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getPost, deletePost } from '../../../../_actions/postAction';
import Tag from './Tag';
import profileImg from '../../../utils/image/quokka.jpg';

const PostDetailPage = () => {
	const navigate = useNavigate();
	const { userInfo } = useSelector(({ user }) => user);
	const { id: postId } = useParams();
	const [POST, setPost] = useState({});

	const [postDeadline, setPostDeadline] = useState(false);
	// const [postUpdate, setPostUpdate] = useState(false);

	useEffect(() => {
		async function post() {
			const { payload } = await getPost(postId);
			setPost(payload.post);
		}
		post();
	}, []);

	/** dangerouslySetInnerHTML 설정 */
	const createMarkup = () => ({ __html: DOMPurify.sanitize(POST.contents) });

	/** 마감 처리 (필터에서 모집 중인 글 보기쪽에서 사라짐) */
	const handleDeadlineConfirm = () => {
		Swal.fire({
			title: postDeadline ? '다시 개시하시겠어요?' : '마감 처리 하시겠어요?',
			text: postDeadline
				? '다시 글을 개시합니다.'
				: '마감 후 다시 개시 가능합니다.',
			icon: 'question',
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: postDeadline
				? '네, 다시 개시할게요.'
				: '네, 마감합니다.',
			cancelButtonText: '아니요!',
			confirmButtonColor: '#3085d6', // #7066e0
			cancelButtonColor: '#d33', // #6e7881
		}).then((result) => {
			// 확인 버튼 클릭 + 마감 전일 때 -> 마감처리!
			if (result.isConfirmed && !postDeadline) {
				handlePostDeadlineCheck();
			} else if (result.isConfirmed && postDeadline) {
				// 확인 버튼 클릭 + 마감 됐을 때 -> 다시 개시 처리!
				handlePostDeadlineCancel();
			} else if (result.isDismissed && postDeadline) {
				// 취소 버튼 클릭 + 다시 개시하고 싶을 때
				handlePostDeadlineCheck();
			} else if (result.isDismissed && !postDeadline) {
				// 취소 버튼 클릭 + 계속 마감처리로 두고 싶을 때
				handlePostDeadlineCancel();
			}
		});
	};

	/** 마감하기 */
	const handlePostDeadlineCheck = () => {
		setPostDeadline(true);
	};

	/** 마감 취소 */
	const handlePostDeadlineCancel = () => {
		setPostDeadline(false);
	};

	/** 글 수정하기 -> 바로 수정 창으로 이동 */
	const handlePostUpdate = () => {
		console.log('글 수정하러 갑니다.');
	};

	/** 글 삭제하기 -> '진짜 삭제하시겠습니까?' 확인 누르면 삭제 처리, 랜딩 페이지로 이동. */
	const handleDeleteConfirm = () => {
		Swal.fire({
			title: '작성하신 글을 삭제 하시겠어요?',
			text: '삭제하시면 되돌릴 수 없습니다. ',
			icon: 'warning',
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: '네, 삭제할래요',
			cancelButtonText: '아니요',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
		})
			.then((result) => {
				if (result.value) {
					return deletePost(POST.id);
				}
			})
			.then((result) => {
				if (result.type === 'delete_post') navigate('/');
			});
	};

	/** 기술 스택 */
	const renderTags = () =>
		POST.tags?.split(',').map((tag, idx) => <Tag tag={tag} key={idx} />);

	/** 글 작성자일 때만 마감, 수정, 삭제 버튼 보이도록 처리 */
	const handlePostWriter = () => {
		if (POST.user?.nickname === userInfo.nickname) {
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
					<button className='alert-btn' onClick={handlePostUpdate}>
						수정
					</button>
					<button className='alert-btn' onClick={handleDeleteConfirm}>
						삭제
					</button>
				</>
			);
		}
	};

	return (
		<section className='post-detail-container'>
			<div className='content-container'>
				<ArrowLeftOutlined onClick={() => navigate(-1)} />
				<h1>{POST.title}</h1>
				<div className='content-container_post-info'>
					<div className='user-info'>
						<img src={profileImg} className='user-info_profile' />
						<p className='user-info_nickname'>{POST.user?.nickname}</p>
					</div>
					<p className='writing-date'>{POST.createdAt?.split('T')[0]}</p>
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
		</section>
	);
};

export default PostDetailPage;
