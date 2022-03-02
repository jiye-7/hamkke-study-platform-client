import React from 'react';
import ReactQuill from 'react-quill';

const Editor = (props) => {
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

	return (
		<>
			<ReactQuill
				theme='snow'
				className='post-editor-form'
				modules={modules}
				formats={formats}
				onChange={props.handleEditor}
				value={props.value}
				placeholder='프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성해주세요 :)'
			>
				<div contentEditable='true' className='post-editor-editing'></div>
			</ReactQuill>
		</>
	);
};

export default Editor;
