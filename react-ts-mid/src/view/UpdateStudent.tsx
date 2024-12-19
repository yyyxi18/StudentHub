import React, { useState } from "react";
import axios from "axios";
import "../style/app.css"; // 確保樣式與 DeleteStudent.tsx 一致

interface Student {
  _id: string;
  userName: string; // 不可修改
  sid: string; // 不可修改
  name: string;
  department: string;
  grade: string;
  class: string;
  email: string;
  absences: number;
}

interface UpdateStudentProps {
  student: Student; // 傳入需要編輯的學生資料
  onUpdateSuccess: () => void; // 修改成功後的回調函數
}

const UpdateStudent: React.FC<UpdateStudentProps> = ({
  student,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<Student>(student);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 更新表單資料
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 提交修改
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://127.0.0.1:8877/api/v1/user/updateNameById`, {id:formData._id,name:formData.userName});
      alert("修改成功！");
    //   onUpdateSuccess(); // 調用回調，返回到主頁或刷新列表
    } catch (error) {
      console.error("修改失敗:", error);
      alert("修改失敗！");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-student">
      <h1>編輯學生資料</h1>
      <form>
        {/* 使用者帳號與座號（不可修改） */}
        <div className="form-group">
          <label>帳號</label>
          <input type="text" value={formData.userName} disabled />
        </div>
        <div className="form-group">
          <label>座號</label>
          <input type="text" value={formData.sid} disabled />
        </div>

        {/* 可修改的欄位 */}
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>科系</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>年級</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>班級</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>電子郵件</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>缺席次數</label>
          <input
            type="number"
            name="absences"
            value={formData.absences}
            onChange={handleInputChange}
          />
        </div>

        {/* 提交按鈕 */}
        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "提交中..." : "提交修改"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
