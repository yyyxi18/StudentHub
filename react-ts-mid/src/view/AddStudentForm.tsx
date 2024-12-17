import React from "react";

/**
 * 處理新增按鈕
 */
interface AddStudentFormProps {
  onSubmit: (newStudent: any) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成 0 到 9 的數值
    const newStudent = {
      userName: (document.getElementById("newAccount") as HTMLInputElement).value,
      sid: parseInt((document.getElementById("newSeatNo") as HTMLInputElement).value),
      name: (document.getElementById("newName") as HTMLInputElement).value,
      department: (document.getElementById("newDepartment") as HTMLInputElement).value,
      grade: (document.getElementById("newGrade") as HTMLInputElement).value,
      class: (document.getElementById("newClass") as HTMLInputElement).value,
      email: (document.getElementById("newEmail") as HTMLInputElement).value,
      absences: randomAbsences,
    };
    onSubmit(newStudent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="newAccount" placeholder="帳號" />
      <input type="number" id="newSeatNo" placeholder="座號" />
      <input type="text" id="newName" placeholder="姓名" />
      <input type="text" id="newDepartment" placeholder="院系" />
      <input type="text" id="newGrade" placeholder="年級" />
      <input type="text" id="newClass" placeholder="班級" />
      <input type="email" id="newEmail" placeholder="Email" />
      <button type="submit">新增</button>
    </form>
  );
};

export default AddStudentForm;
