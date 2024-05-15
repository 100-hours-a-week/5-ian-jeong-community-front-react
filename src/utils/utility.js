const makeShortNumber = (number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
        
    } else {
        return number.toString();
    }
}

const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

const validatePasswordFormat = (password) => {
    const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegax.test(password);
}

const validatePasswordDouble = (a, b) => {
    return a === b;
}

export default {
    makeShortNumber,
    validateEmailFormat,
    validatePasswordFormat,
    validatePasswordDouble
}

