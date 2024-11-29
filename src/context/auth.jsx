import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [profile, setProfile] = useState(null);

    const emailChange = (e) => {
        setEmail(e);
    }

    const passwordChange = (p) => {
        setPassword(p);
    }

    const toggleErrors = (err) => {
        setErrors(err);
    }

    const toggleProfile = (prof) => {
        console.log('profile to toggle: ', prof);
        setProfile(prof);
    }

    useEffect(() => {
        if (profile) {
            console.log('profile: ', profile);
        }
    }, [profile]);
   

    return <AuthContext.Provider value={{
        email, emailChange,
        password, passwordChange,
        errors, toggleErrors,
        profile, toggleProfile}}>
            {children}
		</AuthContext.Provider>;
} 

export { AuthProvider };
export default AuthContext;



