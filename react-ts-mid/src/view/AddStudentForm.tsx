import React, { useState } from "react";
import axios from "axios";
import "../style/app.css";
import { Student } from "../interface/Student";

/**
 * 處理新增按鈕
 */
interface AddStudentFormProps {
  onSubmit: (newStudent: Student) => void; // 讓 onSubmit 函數接收一個 Student 參數，重新加載提交資料
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: "",
    sid: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    email: "",
    absences: 0,
  });

  // 處理輸入變化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成缺席次數
      const newStudent: Student = {
      _id: "",  // 暫時設為空字符串或 undefined，等待後端返回
      userName: formData.userName,
      sid: formData.sid,
      name: formData.name,
      department: formData.department,
      grade: formData.grade,
      class: formData.class,
      email: formData.email,
      absences: randomAbsences,
    };
      
      // 發送 POST 請求到後端 API
      await axios.post(" http://127.0.0.1:8877/api/v1/user/insertOne", newStudent);
      alert("新增成功！");

      // 清空表單
      setFormData({
        userName: "",
        sid: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        email: "",
        absences: 0,
      });

      // 提交成功後，重新加載學生列表
      onSubmit(newStudent);
    } catch (error) {
      console.error("新增失敗:", error);
      alert("新增失敗，請檢查輸入內容！");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="userName" placeholder="帳號" value={formData.userName} onChange={handleChange} />
      <input type="number" name="sid" placeholder="座號" value={formData.sid} onChange={handleChange} />
      <input type="text" name="name" placeholder="姓名" value={formData.name} onChange={handleChange} />
      <input type="text" name="department" placeholder="院系" value={formData.department} onChange={handleChange} />
      <input type="text" name="grade" placeholder="年級" value={formData.grade} onChange={handleChange} />
      <input type="text" name="class" placeholder="班級" value={formData.class} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <button type="submit">新增</button>
    </form>
  );
};

export default AddStudentForm;
