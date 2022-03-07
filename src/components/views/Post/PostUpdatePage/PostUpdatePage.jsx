import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import ReactQuill from 'react-quill';
// import { isEmpty } from 'lodash';
import { getPost } from '../../../../_actions/postAction';
import languageOptions from '../../../utils/data/language';

const PostUpdatePage = () => {
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
		return selectTags.reduce((acc, cur, idx) => {
			acc[cur.value] = idx;
			return acc;
		}, {});
	}, [selectTags]);

	/* 	useEffect(() => {
		!isEmpty(POST) &&
			setSelectTags(
				POST.tags.split(',').map((tag) => ({ label: tag, value: tag })),
			);
	}, [POST]); */

	/*const hashStacks = useMemo(() => {
		// selectTags에 존재하는 값들이 있을 때, 1개의 객체로 변환한다.
		// ex) [{ value: "JS"}, {value: "TS"}] -> { JS : 1, TS : 1}
		const hashObj = {};

		selectTags.map((tag) => (hashObj[tag.value] = 1));
		return hashObj;
	}, [selectTags]); */

	const handleStacks = (option) => {
		setSelectTags(option);
	};

	return (
		<section className='post-update-container'>
			<div className='update'>
				<header>
					<input value={title} />
				</header>
				<hr />
				<div>
					<p>사용 언어 : </p>
					<Select
						options={languageOptions}
						isMulti
						closeMenuOnSelect={false}
						onChange={handleStacks}
						value={languageOptions.filter((option) => {
							return option.value in hashStacks;
							// return hashStacks[option.value] !== undefined;
						})}
					/>
				</div>
				<ReactQuill value={contents} />
			</div>
		</section>
	);
};

export default PostUpdatePage;
