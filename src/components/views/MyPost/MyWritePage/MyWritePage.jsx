import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table/dist/react-table.development';
import styled from 'styled-components';
import { myWritePost } from '../../../../_actions/postAction';
import { postsColumns } from '../../../utils/ReactTable/columns';

const Message = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MyWritePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector(({ user }) => user);
	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const { payload } = await dispatch(myWritePost(userInfo.id));
			if (payload.success) {
				const resultPost = handlePostChange(payload);
				setMyPosts(resultPost);
			}
		})();
	}, []);

	const handlePostChange = (payload) => {
		return payload.posts.map((post) => {
			if (post.contents) {
				post.contents = post.contents.replace(/(<([^>]+)>)/gi, '');
				post.contents.length > 20 &&
					(post.contents = post.contents.substring(0, 20) + '...');
			}
			post.stacks = post.stacks.split(',').join(', ');
			if (post.completed) {
				post.completed = '마감 완료';
			} else {
				post.completed = '마감 전';
			}
			post.createdAt = post.createdAt.split('T')[0];
			post.updatedAt = post.updatedAt.substring(0, 10);

			return post;
		});
	};

	const columns = useMemo(() => postsColumns, []);
	const tableInstance = useTable({ columns, data: myPosts }, useSortBy);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	const handleMoveDetailPage = (postId) => {
		navigate(`/post/${postId}`);
	};

	return myPosts.length > 0 ? (
		<div className='my-post-container'>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							style={{ height: '40px' }}
						>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										borderBottom: 'solid 2px gray',
										background: '#d7ccc8',
										color: 'black',
										fontWeight: 'bold',
									}}
								>
									{column.render('Header')}
									<span>
										{column.isSorted ? (column.isSortDesc ? ' 🔽' : ' 🔼') : ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<>
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												onClick={() =>
													handleMoveDetailPage(cell.row.original.id)
												}
											>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	) : (
		<Message>
			<h1 style={{ fontSize: '20px' }}>작성한 글이 없습니다</h1>
		</Message>
	);
};

export default MyWritePage;
