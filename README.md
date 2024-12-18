# StudentHub

StudentHub 是一個學生管理系統，提供用戶友善的介面來管理學生資料，包括新增、查詢、更新與刪除功能。本系統採用前後端分離架構，並整合資料庫來儲存學生資訊。

## 1. 安裝與執行指引

### 前置需求
- Node.js (版本 >= 16)
- MongoDB (版本 >= 4.4)
- 安裝 `npm` 或 `yarn` 工具

### 安裝步驟
1. 克隆專案到本地：
   ```bash
   git clone https://github.com/your-repo/StudentHub.git
   cd StudentHub
   ```

2. 安裝後端依賴：
   ```bash
   cd server
   npm install
   ```

3. 安裝前端依賴：
   ```bash
   cd ../client
   npm install
   ```

### 啟動系統
1. 啟動 MongoDB：
   確保本地 MongoDB 正在運行，或根據 `.env` 文件中的設定連接到遠端 MongoDB。

2. 啟動後端：
   ```bash
   cd server
   npm run start
   ```
   後端服務將啟動於 `http://localhost:8877`

3. 啟動前端：
   ```bash
   cd ../client
   npm run start
   ```
   前端服務將啟動於 `http://localhost:5173`

4. 使用瀏覽器訪問 `http://localhost:5173` 查看系統。

---

## 2. API 規格說明

### 1. 查詢所有學生資料
**請求方式**: `GET`

**端點**: `/api/v1/user/findAll`

**回應範例**:
```json
{
  "code": 200,
  "message": "find success",
  "body": [
    {
      "id": "123456",
      "userName": "john_doe",
      "name": "John Doe",
      "department": "Computer Science",
      "grade": "Sophomore",
      "class": "A",
      "email": "john@example.com",
      "absences": 0
    }
  ]
}
```

### 2. 新增學生資料
**請求方式**: `POST`

**端點**: `/api/v1/user/insertOne`

**請求 Body**:
```json
{
  "userName": "jane_doe",
  "name": "Jane Doe",
  "department": "Information Management",
  "grade": "Junior",
  "class": "B",
  "email": "jane@example.com"
}
```

**回應範例**:
```json
{
  "code": 200,
  "message": "新增成功",
  "body": {
    "id": "67890",
    "userName": "jane_doe",
    "name": "Jane Doe",
    "department": "Information Management",
    "grade": "Junior",
    "class": "B",
    "email": "jane@example.com",
    "absences": 0
  }
}
```

### 3. 刪除學生資料（透過 userName）
**請求方式**: `DELETE`

**端點**: `/api/v1/user/deleteById/:userName`

**回應範例**:
- 成功刪除
  ```json
  {
    "code": 200,
    "message": "刪除成功",
    "body": null
  }
  ```

- 找不到學生
  ```json
  {
    "code": 404,
    "message": "找不到該學生資料",
    "body": null
  }
  ```

### 4. 更新學生名稱（透過 ID）
**請求方式**: `PUT`

**端點**: `/api/v1/user/updateNameById`

**請求 Body**:
```json
{
  "id": "123456",
  "name": "John Smith"
}
```

**回應範例**:
```json
{
  "code": 200,
  "message": "更新成功",
  "body": {
    "id": "123456",
    "name": "John Smith"
  }
}
```

---

## 3. 架構圖

```plaintext
+--------------------+          +--------------------+
|      Frontend      |          |      Backend       |
| (React + Vite)     | <------> | (Node.js + Express)|
+--------------------+          +--------------------+
          |                              |
          v                              v
+--------------------+          +--------------------+
|      Database      | <------> |    Service Layer   |
| (MongoDB)          |          |                   |
+--------------------+          +--------------------+
```

- **Frontend**: 提供用戶介面與使用者互動。
- **Backend**: 提供 API 服務，包含學生資料的 CRUD 操作。
- **Database**: 儲存學生資料。

---

## 4. 流程圖

以下是 CRUD 功能的操作流程：

### 新增學生
```plaintext
[User] ---> [Frontend] ---> [Backend (POST /insertOne)] ---> [Database]
```

### 查詢學生資料
```plaintext
[User] ---> [Frontend] ---> [Backend (GET /findAll)] ---> [Database]
                                ^                       |
                                |<----------------------+
```

### 更新學生名稱
```plaintext
[User] ---> [Frontend] ---> [Backend (PUT /updateNameById)] ---> [Database]
                                ^                             |
                                |<---------------------------+
```

### 刪除學生
```plaintext
[User] ---> [Frontend] ---> [Backend (DELETE /deleteById/:userName)] ---> [Database]
                                ^                                      |
                                |<------------------------------------+
```

