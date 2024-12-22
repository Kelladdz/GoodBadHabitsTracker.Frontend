import { useDispatch } from "react-redux";

import { signUpFail } from "../store/slices/authSlice";

export function useAuthValidation() {
    const dispatch = useDispatch();

    const isRegisterFormValid = (form) => {
        let errors = [];
        
        const userName = form.userName;
        const password = form.password;
        const confirmPassword = form.confirmPassword;
        const email = form.email;
    
        if (!isEmailValid(email)){
            errors.push({property: 'Email', error: 'Invalid email address'});
        }
        if (userName === ''){
            errors.push({property: 'UserName', error: 'User name cannot be empty'});
        }
    
        if(!isPasswordsMatch(password, confirmPassword)){
            errors.push({property: 'ConfirmPassword', error: `Passwords doesn't match`});
        }
        
        if (!hasPasswordAtLeastSixChars(password) || !hasPasswordAtLeastOneNonAlphanumericChar(password) || !hasPasswordAtLeastOneLowercaseChar(password) || !hasPasswordAtLeastOneUppercaseChar(password)){
            errors.push({property: 'Password', error: 'Invalid password'});
        }

        if(errors.length > 0){
            console.log(errors);
            dispatch(signUpFail(errors));
            return false;
        } else {
            return true;
        }
    }
    
    const isEmailValid = (email) => {
        const emailRegex = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

        return emailRegex.test(email)
    }
    const isPasswordsMatch = (password, confirmPassword) => {
        console.log(password, confirmPassword);
        return password === confirmPassword;
    }
    const hasPasswordAtLeastSixChars = (password) => {
        return password.length >= 6;
    }

    const hasPasswordAtLeastOneNonAlphanumericChar = (password) => {
        const nonAlphanumericChar = /[^0-9A-Za-z_]/;
        
        return nonAlphanumericChar.test(password);
    }

    const hasPasswordAtLeastOneLowercaseChar = (password) => {
        const lowercaseRegex = /[a-z]/;
        return lowercaseRegex.test(password);
    }

    const hasPasswordAtLeastOneUppercaseChar = (password) => {
        const uppercaseRegex = /[A-Z]/;
        return uppercaseRegex.test(password);
    }
    

    return {isRegisterFormValid, isEmailValid, isPasswordsMatch, hasPasswordAtLeastSixChars, hasPasswordAtLeastOneNonAlphanumericChar, hasPasswordAtLeastOneLowercaseChar, hasPasswordAtLeastOneUppercaseChar};
}