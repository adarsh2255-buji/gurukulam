import { createContext, useState } from "react";

export const StudentContext = createContext();

const StudentProvider = ({children}) => {
    const [student, setStudent] = useState(null);
}