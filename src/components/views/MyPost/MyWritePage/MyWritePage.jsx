import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortBy, useTable } from 'react-table/dist/react-table.development';
import styled from 'styled-components';
import { myWritePost } from '../../../../_actions/postAction';
import { postsColumns } from '../../../utils/ReactTable/columns';

const Styles = styled.div`
	padding: 3rem 1rem;
`;

const MyWritePage = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(({ user }) => user);
	const [myPosts, setMyPosts] = useState([]);

	const handlePostChange = (payload) => {
		return payload.posts.map((post) => {
			post.contents = post.contents.replace(/(<([^>]+)>)/gi, '');
			post.contents = post.contents.substring(0, 20) + '...';
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

	useEffect(() => {
		(async () => {
			const { payload } = await dispatch(myWritePost(userInfo.id));
			if (payload.success) {
				const resultPost = handlePostChange(payload);
				setMyPosts(resultPost);
			}
		})();
	}, []);

	const columns = useMemo(() => postsColumns, []);
	const data = useMemo(() => myPosts, [myPosts]);
	const tableInstance = useTable({ columns, data }, useSortBy);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<div className='my-post-container'>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										borderBottom: 'solid 3px gray',
										background: 'aliceblue',
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
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											style={{
												padding: '10px',
												border: 'solid 1px gray',
												background: 'rgb(247, 242, 236)',
											}}
										>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MyWritePage;
