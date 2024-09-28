import { createContext, useEffect, useState } from "react"

export const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
    const [ teacher, setTeacher ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Retrieve teacher data from local storage
        const loggedInTeacher = localStorage.getItem('teacher');
        if(loggedInTeacher) {
            setTeacher(JSON.parse(loggedInTeacher));
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [])
    
    if(loading) {
        return <div>Loading...</div>
    }
    
//function to handle teacher login

const handleLogin = (teacherData) => {
    setTeacher(teacherData);
    localStorage.setItem('teacher', JSON.stringify(teacherData));
}

//function to handle teacher logout

const handleLogout = () => {
    setTeacher(null);
    localStorage.removeItem('teacher');
}

return(
    <TeacherContext.Provider value={{ teacher, loading, handleLogin, handleLogout }}>
        {children}
    </TeacherContext.Provider>
)
}



export default TeacherProvider;