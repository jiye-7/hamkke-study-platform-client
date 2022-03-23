import React from 'react';
import { CalendarOutlined, FireOutlined } from '@ant-design/icons';
import CheckBox from '../../utils/CheckBox/CheckBox';

const FilterPage = (props) => {
	return (
		<div className='filter-container'>
			<div className='left-filter'>
				<div
					className={`${
						props.isSort === 'recent'
							? 'left-filter_recent sorted'
							: 'left-filter_recent'
					}`}
					onClick={() => props.handleSortPostsFilter('recent')}
				>
					<CalendarOutlined />
					<span>최신</span>
				</div>
				<div
					className={`${
						props.isSort === 'hit'
							? 'left-filter_hit sorted'
							: 'left-filter_hit'
					}`}
					onClick={() => props.handleSortPostsFilter('hit')}
				>
					<FireOutlined />
					<span>인기</span>
				</div>
			</div>
			<div className='right-filter'>
				<CheckBox
					message={`모집 중인 글만 보기`}
					recruitingPost={props.recruitingPost}
					recruitState={props.recruitState}
				/>
			</div>
		</div>
	);
};

export default FilterPage;
