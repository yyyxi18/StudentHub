import React, { useState } from "react";
import "../style/app.css"; // 確保你的樣式檔包含浮起效果
import { asyncDelete } from "../utils/fetch";
import { api } from "../enum/api";

interface Student {
    _id: string;
    userName: string;
    sid: string;
    name: string;
    department: string;
    grade: string;
    class: string;
    email: string;
    absences: number;
}

interface DeleteStudentProps {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>; // 用於更新學生列表
    onEdit: (student: Student) => void; // 點擊編輯按鈕的回呼
}

const DeleteStudent: React.FC<DeleteStudentProps> = ({
    students,
    setStudents,
    onEdit,
}) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // 刪除學生資料
    const deleteStudent = async (id: string) => {
        try {
            await asyncDelete(`${api.deleteByUserId}?id=${id}`)
            // 刪除成功後，更新學生列表
            setStudents((prev) => prev.filter((student) => student._id !== id));
            alert("刪除成功！");
            setSelectedStudent(null);
        } catch (error) {
            console.error("刪除失敗:", error);
            alert("刪除失敗！");
        }
    };

    // 點擊學生框框
    const handleStudentClick = (student: Student) => {
        setSelectedStudent(student);
    };

    return (
        <div className="student-list">
            {students.map((student) => (
                <div
                    key={student._id}
                    className={`student-item ${selectedStudent?._id === student._id ? "selected" : ""
                        }`}
                    onMouseEnter={() => setSelectedStudent(student)}
                    onMouseLeave={() => setSelectedStudent(null)}
                    onClick={() => handleStudentClick(student)}
                >
                    <p>{student.name}</p>
                    <p>{student.email}</p>
                    {selectedStudent?._id === student._id && (
                        <div className="action-buttons">
                            <button onClick={() => deleteStudent(student._id)}>刪除</button>
                            <button onClick={() => onEdit(student)}>編輯</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DeleteStudent;
