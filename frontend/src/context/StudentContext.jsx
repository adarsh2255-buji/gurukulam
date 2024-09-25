import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminContext } from "./AdminContext";

export const StudentContext = createContext();

const StudentProvider = ({children}) => {
    const [student, setstudent] = useState(null);
    
    const { setAdmin } = useContext(adminContext)

    useEffect(() => {
        const loggedInStudent = localStorage.getItem('student');
        if(loggedInStudent) {
            setstudent(JSON.parse(loggedInStudent));
        }
    }, [])

    //function to handle student login
    const handleLogin = (studentData) => {
    setstudent(studentData);
    localStorage.setItem('student', JSON.stringify(studentData));
}

    //function to handle student logout
    const handleLogout = () => {
        setstudent(null);
        setAdmin(null);
        localStorage.removeItem('student');
        localStorage.removeItem('admin')
        toast.success('Logged out successful')
    }


return(
    <StudentContext.Provider value={{ student, handleLogin, handleLogout }}>
        {children}
    </StudentContext.Provider>
 );

};

export default StudentProvider;
