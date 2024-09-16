import { createContext, useState, useEffect } from "react";

export const adminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const loggedInAdmin = localStorage.getItem('admin');
        if(loggedInAdmin) {
            setAdmin(JSON.parse(loggedInAdmin));
        }
    }, [])

    //function to handle admin login
    const handleLogin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData));
    }

    return(
        <adminContext.Provider value={{ admin, handleLogin }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminProvider;