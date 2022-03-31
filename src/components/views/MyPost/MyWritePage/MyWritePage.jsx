import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table/dist/react-table.development';
import { myWritePost } from '../../../../_actions/postAction';

const MyWritePage = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(({ user }) => user);
	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const { payload } = await dispatch(myWritePost(userInfo.id));
			if (payload.success) {
				setMyPosts(payload.posts);
				const resultPost = await payload.posts.reduce((acc, cur) => {
					cur.contents = cur.contents.replace(/(<([^>]+)>)/gi, '');
					acc.push(cur);
					return acc;
				}, []);
				setMyPosts(resultPost);
			}
		})();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
			},
			{
				Header: 'Title',
				accessor: 'title',
			},
			{
				Header: 'Contents',
				accessor: 'contents',
			},
			{
				Header: 'Stacks',
				accessor: 'stacks',
			},
			{
				Header: 'Hit',
				accessor: 'hit',
			},
			{
				Header: 'Completed',
				accessor: 'completed',
			},
			{
				Header: 'Like',
				accessor: 'like',
			},
			{
				Header: 'Comment',
				accessor: 'comment',
			},
			{
				Header: 'CreateAt',
				accessor: 'createAt',
			},
			{
				Header: 'UpdateAt',
				accessor: 'updateAt',
			},
		],
		[],
	);
	const data = useMemo(() => myPosts, [myPosts]);
	const tableInstance = useTable({ columns, data });
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
									{...column.getHeaderProps()}
									style={{
										borderBottom: 'solid 3px gray',
										background: 'aliceblue',
										color: 'black',
										fontWeight: 'bold',
									}}
								>
									{column.render('Header')}
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
