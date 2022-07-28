const form = document.getElementsByTagName("form")[0];

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPass");
const fname = document.getElementById("firstName");
const lname = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phoneNumber");

const checkName = (element) => {
    let valid = false;

    const min = 3,
        max = 20;

    const name = element.value.trim();

    if (!isRequired(name)) {
        showError(element, "Must enter a name");
    } else if (!isBetween(name.length, min, max)) {
        showError(element, `Name must be between ${min} and ${max} characters`)
    } else {
        showSuccess(element);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const mail = email.value.trim();

    if (!isRequired(mail)) {
        showError(email, "Must enter an email");
    } else if (!isEmailValid(mail)) {
        showError(email, "Must enter a valid email address");
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    valid = false;
    const pass = password.value.trim();

    if (!isRequired(pass)) {
        showError(password, "Must enter a Password");
    } else if (!isPasswordSecure(pass)) {
        showError(password, "Password must have at least 8 characters including at least 1 uppercase, 1 lowercase, 1 number, and 1 special character in (!@#$%^&*)");
    } else {
        showSuccess(password);
        valid = true;
    }
    return valid;
}

const checkConfirmPass = () => {
    let valid = false;

    const confirmPass = confirmPassword.value.trim();
    const pass = password.value.trim();

    if (!isRequired(confirmPass)) {
        showError(confirmPassword, "Please enter the password again");
    } else if (pass !== confirmPass) {
        showError(confirmPassword, "Passwords do not match");
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }
    return valid;
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const errDisplay = input.parentElement.querySelector(`span`);

    input.parentElement.classList.remove("success");
    input.parentElement.classList.add("error");

    errDisplay.textContent = message;
}

const showSuccess = (input) => {
    const errDisplay = input.parentElement.querySelector(`span`);

    input.parentElement.classList.remove("error");
    input.parentElement.classList.add("success");

    errDisplay.textContent = '';
}


form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isFnameValid = checkName(fname),
        isLnamevalid = checkName(lname),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPassValid = checkConfirmPass();

    let isFormValid = isFnameValid &&
        isLnamevalid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPassValid;

    if (isFormValid) {
        alert("Form submitted succesfully");
    }
});



