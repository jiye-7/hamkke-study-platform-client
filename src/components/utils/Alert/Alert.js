import Swal from 'sweetalert2';

/** confirm 함수 */
const handleConfirm = (props) => {
	const {
		title,
		text,
		icon,
		confirmButtonText,
		cancelButtonText,
		confirmFunction,
		cancelFunction,
	} = props;
	Swal.fire({
		title,
		text,
		icon,
		allowOutsideClick: false,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText,
		cancelButtonText,
		confirmButtonColor: '#3085d6', // #7066e0
		cancelButtonColor: '#d33', // #6e7881
		// didClose: cancelFunction
	}).then((result) => {
		if (result.isConfirmed) {
			confirmFunction();
		}
	});
};

export default handleConfirm;
