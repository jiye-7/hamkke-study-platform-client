import React from 'react';
import { CalendarOutlined, FireOutlined } from '@ant-design/icons';
import CheckBox from '../../utils/CheckBox/CheckBox';

const FilterPage = (props) => {
	/** 최신 글 보기 */
	const handleRecentPosts = () => {
		console.log('최신 글 보기');
	};
	/** 인기 글 보기 */
	const handleHitPosts = () => {
		console.log('좋아요, 인기글 보기');
	};

	return (
		<div className='filter-container'>
			<div className='left-filter'>
				<div className='left-filter_recent' onClick={handleRecentPosts}>
					<CalendarOutlined />
					<span>최신</span>
				</div>
				<div className='left-filter_l' onClick={handleHitPosts}>
					<FireOutlined />
					<span>인기</span>
				</div>
			</div>
			<div className='right-filter'>
				<CheckBox
					message={`모집 중인 글만 보기`}
					recruitingPost={props.recruitingPost}
				/>
			</div>
		</div>
	);
};

export default FilterPage;
