import React, { useEffect, useRef, useState } from 'react'
import '../style/app.css'
import { asyncGet, asyncPost } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'
import AddStudentForm from './AddStudentForm'
import StudentList from './StudentList'

const App: React.FC = () => {
  /**
   * studentsList => 學生證列的狀態
   * setStudentsList => 用來設置學生證列的狀態 , 是一個function
   */
  const [studentsList, setStudentsList] = useState<Student[]>([]); // 初始值設為空陣列

  // 網頁剛進的時候，取得學生資料
  useEffect(() => {
    asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
      if (res && res.code === 200) {
        setStudentsList(res.body);
      }
    });
  }, []);

  //console.log("新增學生資料：", newStudent);
  // 後續可呼叫 API 發送 newStudent 資料到後端
  // 新增學生處理
  const addStudentHandler = async (newStudent: Student) => {
    try {
      const response = await asyncPost(api.insertOne, newStudent);
      console.log("新增學生成功:", response);
      setStudentsList((prev) => [...prev, newStudent]);
    } catch (error) {
      console.error("新增學生失敗:", error);
    }
  };

  /**
   * dom: 從index.html裡面拖出來
   */
  return (
    <div className="home">
      <h1>歡迎使用 StudentHub！</h1>
      <StudentList students={studentsList} />
      <AddStudentForm onSubmit={addStudentHandler} />
      <table>
        <thead>
          <tr>
            <th>帳號</th>
            <th>座號</th>
            <th>姓名</th>
            <th>院系</th>
            <th>年級</th>
            <th>班級</th>
            <th>Email</th>
            <th>缺席次數</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="studentsList">
        </tbody>
      </table>
    </div>
  )
};
export default App;


/**
  * 處理新增按鈕
  
 const submitHandler = async () => {
   const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成 0 到 9 的數值
   const newStudent = {
     userName: (document.getElementById("newAccount") as HTMLInputElement).value,
     sid: parseInt((document.getElementById("newSeatNo") as HTMLInputElement).value),
     name: (document.getElementById("newName") as HTMLInputElement).value,
     department: (document.getElementById("newDepartment") as HTMLInputElement).value,
     grade: ((document.getElementById("newGrade") as HTMLInputElement).value),
     class: (document.getElementById("newClass") as HTMLInputElement).value,
     email: (document.getElementById("newEmail") as HTMLInputElement).value,
     absences: randomAbsences, // 使用隨機數值
     const response = await asyncPost(api.insertOne, newStudent);
   }*/