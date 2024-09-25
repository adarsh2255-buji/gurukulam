import { createContext, useState, useEffect } from "react";

export const adminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loggedInAdmin = localStorage.getItem('admin');
        if(loggedInAdmin) {
            setAdmin(JSON.parse(loggedInAdmin));
        }
        setLoading(false);
    }, [])

    if (loading) {
        return <p>Loading...</p>; // Show loading until admin state is set
      }
    //function to handle admin login
    const handleLogin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData));
    }

    return(
        <adminContext.Provider value={{ admin,loading, handleLogin , setAdmin}}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminProvider;