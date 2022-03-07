import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { getPost, updatePost } from '../../../../_actions/postAction';
import languageOptions from '../../../utils/data/language';
import { editorModules, editorFormats } from '../../../utils/quill/quill';

const PostUpdatePage = () => {
	const navigate = useNavigate();
	const { id: postId } = useParams();
	const [title, setTitle] = useState('');
	const [selectTags, setSelectTags] = useState([]);
	const [contents, setContents] = useState('');

	useEffect(() => {
		async function post() {
			const { payload } = await getPost(postId);
			if (payload && payload.post) {
				setTitle(payload.post.title);
				setSelectTags(
					payload.post.tags.split(',').map((tag) => ({ value: tag })),
				);
				setContents(payload.post.contents);
			}
		}
		post();
	}, []);

	const hashStacks = useMemo(() => {
		return selectTags.reduce((acc, cur) => {
			acc[cur.value] = 1;
			return acc;
		}, {});
	}, [selectTags]);

	const handleTitleUpdate = (e) => {
		setTitle(e.target.value);
	};

	const handleStacksUpdate = (option) => {
		setSelectTags(option);
	};

	const handleContentUpdate = (content) => {
		setContents(content);
	};

	const handleUpdatePost = async () => {
		const requestData = {
			postId,
			title,
			tags: selectTags.map((tag) => tag.value),
			contents,
		};

		let result = await updatePost(requestData);
		if (result.payload.success) {
			navigate(`/post/${postId}`);
		}
	};

	return (
		<section className='post-update-container'>
			<div className='update'>
				<header>
					<input placeholder={title} onChange={handleTitleUpdate} />
				</header>
				<hr />
				<div>
					<p>사용 언어 : </p>
					<Select
						options={languageOptions}
						isMulti
						closeMenuOnSelect={false}
						onChange={handleStacksUpdate}
						placeholder='프로젝트/스터디 진행 언어 선택해주세요 :)'
						value={languageOptions.filter((option) => {
							return option.value in hashStacks;
						})}
					/>
				</div>
				<ReactQuill
					theme='snow'
					modules={editorModules}
					formats={editorFormats}
					value={contents}
					onChange={(content) => handleContentUpdate(content)}
				/>
				<div>
					<button onClick={() => navigate(-1)}>취소</button>
					<button onClick={handleUpdatePost}>수정</button>
				</div>
			</div>
		</section>
	);
};

export default PostUpdatePage;
