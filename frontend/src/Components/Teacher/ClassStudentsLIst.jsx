import React, { useContext, useEffect, useState } from 'react'
import { TeacherContext } from '../../context/TeacherContext'
import api from '../../api';
const ClassStudentsLIst = () => {
  const { teacher } = useContext(TeacherContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/teacher/studentsList', {withCredentials : true});
        console.log(response.data)
        setStudents(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch students", error)
        setLoading(false)
      }
    };
    fetchStudents()
  }, [])

  if(loading){
    return <p>Loading students...</p>
  }
  return (
    <>
    <h2>Studetns List</h2>
    <ul>
      {
        students.map((student) => (
          <li key={student.admissionNumber}>
            {student.name}
          </li>
        ))
      }
    </ul>
    </>
  )
}

export default ClassStudentsLIst