import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const emailChange = (e) => {
        setEmail(e);
    }

    const passwordChange = (p) => {
        setPassword(p);
    }

    const toggleErrors = (err) => {
        setErrors(err);
    }

    return <AuthContext.Provider value={{
        email, emailChange,
        password, passwordChange,
        errors, toggleErrors}}>
            {children}
		</AuthContext.Provider>;
} 

export { AuthProvider };
export default AuthContext;



