import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';
import languageOptions from '../../utils/data/language';

const animatedComponents = makeAnimated();

function WritePage() {
	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
		],
	};

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];

	const handleContentChange = () => {};

	return (
		<section className='post-write-container'>
			<header>
				<input type='text' placeholder='제목을 입력하세요' />
			</header>
			<div>
				<label htmlFor='use-language'>사용 언어:</label>
				<Select
					isMulti
					options={languageOptions}
					closeMenuOnSelect={false}
					components={animatedComponents}
				/>
			</div>
			<div>
				<ReactQuill
					theme='snow'
					modules={modules}
					formats={formats}
					onChange={handleContentChange}
				>
					<div style={{ fontStyle: 'italic' }}>
						'프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해
						구체적으로 작성해주세요 :)'
					</div>
				</ReactQuill>
			</div>
			<div>
				<button>취소</button>
				<button>글 등록</button>
			</div>
		</section>
	);
}

export default WritePage;
