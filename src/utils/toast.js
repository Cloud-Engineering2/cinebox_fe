import { Bounce, toast } from "react-toastify";

const toast_style = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}

export const showToast = (content, type) => {
    if (type == 'warn') {
        toast.warn(content, toast_style);
    } else if (type == 'error') {
        toast.error(content, toast_style);
    } else if (type == 'success') {
        toast.success(content, toast_style);
    } else {
        toast(content, toast_style);
    };
};