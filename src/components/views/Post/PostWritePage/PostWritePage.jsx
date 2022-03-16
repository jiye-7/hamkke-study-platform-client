import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import languageOptions from '../../../utils/data/language';
import { createPost } from '../../../../_actions/postAction';
import { editorModules, editorFormats } from '../../../utils/quill/quill';
import handleConfirm from '../../../utils/Alert/Alert';

function PostWritePage() {
	const navigate = useNavigate();
	const { id: userId } = useSelector((state) => state.user.userInfo);

	const [title, setTitle] = useState('');
	const [stacks, setStacks] = useState([]);
	const [contents, setContents] = useState('');

	const handleTitle = (e) => {
		setTitle(e.currentTarget.value);
	};

	const handleStacks = (e) => {
		const selectStacks = e.map((stack) => stack.value);
		setStacks(selectStacks);
	};

	const handleContentChange = (content) => {
		setContents(content);
	};

	const handleCreatePost = async () => {
		if (
			title !== '' &&
			stacks.length >= 1 &&
			contents &&
			contents !== `<p><br></p>`
		) {
			const data = {
				userId,
				title,
				stacks,
				contents,
			};

			const result = await createPost(data);
			if (result.type === 'create_post') {
				navigate('/');
			}
		} else {
			handleConfirm({
				title: `${
					`${title === '' ? '제목이 비었습니다.' : ''}` ||
					`${stacks.length === 0 ? '사용언어를 선택해주세요.' : ''}` ||
					`${
						contents === '' || contents === `<p><br></p>`
							? '내용을 입력해주세요'
							: ''
					}`
				}`,
				icon: 'warning',
				showCancelButton: false,
			});
		}
	};

	return (
		<section className='post-container'>
			<div className='post-write-container'>
				<header>
					<input
						type='text'
						placeholder='제목을 입력하세요'
						onChange={handleTitle}
					/>
				</header>
				<div className='post-language'>
					<label>사용 언어 :</label>
					<Select
						isMulti
						options={languageOptions}
						closeMenuOnSelect={false}
						className='post-language-select'
						placeholder='프로젝트/스터디 진행 언어 선택해주세요 :)'
						onChange={handleStacks}
					/>
				</div>
				<div className='post-editor'>
					<ReactQuill
						theme='snow'
						className='post-editor-form'
						modules={editorModules}
						formats={editorFormats}
						onChange={(content) => handleContentChange(content)}
						value={contents}
						placeholder='프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성해주세요 :)'
					/>
				</div>
				<div className='post-btn'>
					<button className='post-btn-cancel' onClick={() => navigate(-1)}>
						취소
					</button>
					<button className='post-btn-submit' onClick={handleCreatePost}>
						글 등록
					</button>
				</div>
			</div>
		</section>
	);
}

export default PostWritePage;
