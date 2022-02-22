import { Tag } from 'antd';

const options = [
	{ value: 'gold' },
	{ value: 'lime' },
	{ value: 'green' },
	{ value: 'cyan' },
];

export default function tagRender(props) {
	const { label, value, closable, onClose } = props;
	const onPreventMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag
			color={value}
			onMouseDown={onPreventMouseDown}
			closable={closable}
			onClose={onClose}
			style={{ marginRight: 3 }}
		>
			{label}
		</Tag>
	);
}
