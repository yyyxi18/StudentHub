import React from "react";
import '../style/app.css'
import { Student } from "../interface/Student";
/**
* 渲染列表
*/
interface StudentListProps {
  students: Student[];
  onEdit: (info:Student) => void;
  onDelete: (id: string) => void; // 將刪除功能作為 props 傳入
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit ,onDelete }) => {
  return (
    <div className="container">
      {students.map((student) => (
        <div className="student" key={student._id}>
          <p><strong>帳號：</strong>{student.userName}</p>
          <p><strong>座號：</strong>{student.sid}</p>
          <p><strong>姓名：</strong>{student.name}</p>
          <p><strong>院系：</strong>{student.department}</p>
          <p><strong>年級：</strong>{student.grade}</p>
          <p><strong>班級：</strong>{student.class}</p>
          <p><strong>Email：</strong>{student.email}</p>
          <p><strong>缺席次數：</strong>{student.absences ?? 0}</p>

          {/* 刪除與編輯按鈕 */}
          <div className="action-buttons">
            <button className="edit" onClick={()=>{onEdit(student)}}>編輯</button>
            <button className="delete" onClick={() => onDelete(student._id)}>刪除</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
