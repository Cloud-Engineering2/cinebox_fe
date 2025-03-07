import { showToast } from "./toast";

export const checkEmailRegExp = (email) => {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (email.match(regExp) == null) {
        showToast('이메일 규칙이 올바르지 않습니다.', 'warn');
    }

    return email;
}

export const checkPhoneRegExp = (phone) => {
    var regExp = /^(\d{0,3})-(\d{0,4})-(\d{0,4})$/g;

    if (phone.match(regExp) == null) {
        showToast('전화번호 규칙이 올바르지 않습니다.', 'warn');
    }

    return phone;
}