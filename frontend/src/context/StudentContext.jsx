import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

const StudentProvider = ({children}) => {
    const [student, setstudent] = useState(null);

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
    localStorage.setItem('token', studentData.token);
}

return(
    <StudentContext.Provider value={{ student, handleLogin }}>
        {children}
    </StudentContext.Provider>
 );

};

export default StudentProvider;
