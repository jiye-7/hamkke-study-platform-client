import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';
import languageOptions from '../../utils/data/language';
import { createPost } from '../../../_actions/postAction';

const animatedComponents = makeAnimated();

function PostWritePage() {
	const navigate = useNavigate();
	const { id: userId } = useSelector((state) => state.user.userInfo);

	const [title, setTitle] = useState('');
	const [stacks, setStacks] = useState([]);
	const [contents, setContents] = useState('');

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			[{ color: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			// ['link', 'image'],
		],
	};

	const formats = [
		'header',
		'color',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		// 'link',
		// 'image',
	];

	const handleTitle = (e) => {
		setTitle(e.currentTarget.value);
	};

	const handleStacks = (e) => {
		let selectStacks = e.map((stack) => stack.label);
		setStacks(selectStacks);
	};

	const handleContentChange = (content, delta, source, editor) => {
		setContents(content);
	};

	const handleCreatePost = async () => {
		const data = {
			userId,
			title,
			tags: stacks,
			contents,
		};
		// server 요청 보내기
		const result = await createPost(data);
		if (result.type === 'create_post') {
			navigate('/');
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
					<label className='post-language-use'>사용 언어 :</label>
					<Select
						isMulti
						options={languageOptions}
						closeMenuOnSelect={false}
						components={animatedComponents}
						className='post-language-select'
						placeholder='프로젝트/스터디 진행 언어 선택해주세요 :)'
						onChange={handleStacks}
					/>
				</div>
				<div className='post-editor'>
					<ReactQuill
						theme='snow'
						className='post-editor-form'
						modules={modules}
						formats={formats}
						onChange={(content, delta, source, editor) =>
							handleContentChange(content, delta, source, editor)
						}
						value={contents}
						placeholder='프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성해주세요 :)'
					></ReactQuill>
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
