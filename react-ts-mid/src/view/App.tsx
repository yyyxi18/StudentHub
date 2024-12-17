import React, { useEffect, useRef, useState } from 'react'
import '../style/app.css'
import { asyncGet, asyncPost } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'
import AddStudentForm from './AddStudentForm'
import StudentList from './StudentList'
import axios from "axios";


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
        setStudentsList(res.body); //設置學生列表
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
      {/* 傳遞新增學生的處理函數給 AddStudentForm */}
      <AddStudentForm onSubmit={addStudentHandler} />
      {/* 傳遞學生列表資料給 StudentList */}
      <StudentList students={studentsList} />
    </div>
  )
};
export default App;


