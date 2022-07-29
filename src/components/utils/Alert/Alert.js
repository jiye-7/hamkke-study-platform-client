import Swal from 'sweetalert2';

/** confirm 함수 */
const handleConfirm = (props) => {
	const {
		title,
		text,
		icon = 'question',
		allowOutsideClick = false,
		showConfirmButton = true,
		showCancelButton = true,
		confirmButtonText = '확인',
		cancelButtonText = '취소',
		confirmButtonColor = '#3085d6', // #7066e0
		cancelButtonColor = '#d33', // #6e7881
		confirmFunction = () => {},
		// cancelFunction = () => {},
		className = '',
	} = props;

	Swal.fire({
		title,
		text,
		icon,
		allowOutsideClick,
		showConfirmButton,
		showCancelButton,
		confirmButtonText,
		cancelButtonText,
		confirmButtonColor,
		cancelButtonColor,
		className,
		// didClose: cancelFunction,
	}).then((result) => {
		if (result.isConfirmed) {
			confirmFunction();
		}
	});
};

export default handleConfirm;
