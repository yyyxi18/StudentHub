import React, { useEffect, useRef, useState } from 'react'
import '../style/app.css'
import { asyncDelete, asyncGet, asyncPost, asyncPut } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'
import AddStudentForm from './AddStudentForm'
import StudentList from './StudentList'
import UpdateStudent from "./UpdateStudent"; 
import axios from "axios";


const App: React.FC = () => {
  /**
   * studentsList => 學生證列的狀態
   * setStudentsList => 用來設置學生證列的狀態 , 是一個function
   */
  const [studentsList, setStudentsList] = useState<Student[]>([]); // 初始值設為空陣列
  const [editingStudent, setEditingStudent] = useState<Student | null>(null); // 當前編輯的學生

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

  // 刪除學生處理
  const deleteStudentHandler = async (id: string) => {
    try {
      const response = await asyncDelete(`${api.deleteByUserId}/${id}`); // 假設後端 API 支援根據 ID 刪除學生
      console.log("刪除學生成功:", response);
      setStudentsList((prev) => prev.filter((student) => student._id !== id)); // 從列表中移除學生
    } catch (error) {
      console.error("刪除學生失敗:", error);
    }
  };
//console.log("傳遞給 StudentList 的刪除函數:", deleteStudentHandler);

// 更新學生處理
const updateStudentHandler = async (updatedStudent: Student) => {
  try {
    const response = await asyncPut(api.updateNameById, updatedStudent); // 發送更新請求
    console.log("更新學生成功:", response);
    setStudentsList((prev) =>
      prev.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    ); // 更新列表中的學生資料
    setEditingStudent(null); // 返回學生列表頁面
  } catch (error) {
    console.error("更新學生失敗:", error);
  }
};

// 進入編輯模式
const editStudentHandler = (student: Student) => {
  setEditingStudent(student); // 設置要編輯的學生資料
};

  /**
   * dom: 從index.html裡面拖出來
   */
  return (
    <div className="home">
      <h1>歡迎使用 StudentHub！</h1>
      {/* 如果正在編輯學生，顯示編輯表單 */}
      {editingStudent ? (
        <UpdateStudent
          student={editingStudent}
          onUpdate={updateStudentHandler}
          onCancel={() => setEditingStudent(null)} // 取消編輯
        />
      ) : (
        <>
          {/* 傳遞新增學生的處理函數給 AddStudentForm */}
          <AddStudentForm onSubmit={addStudentHandler} />
          {/* 傳遞學生列表資料與刪除、編輯函數給 StudentList */}
          <StudentList
            students={studentsList}
            onDelete={deleteStudentHandler}
            onEdit={editStudentHandler}
          />
        </>
      )}
    </div>
  )
};
export default App;


