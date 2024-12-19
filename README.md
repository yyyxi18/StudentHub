# StudentHub

StudentHub 是一個學生管理系統，提供用戶友善的介面來管理學生資料，包括新增、查詢、更新與刪除功能。本系統採用前後端分離架構，並整合資料庫來儲存學生資訊。

## 安裝與執行指引

### 前置需求
- Node.js (版本 >= 16)
- MongoDB (版本 >= 4.4)
- 安裝 `npm`工具

### 安裝步驟
1. git clone專案到本地：
   ```bash
   git clone https://github.com/yyyxi18/StudentHub.git
   cd StudentHub
   ```

2. 安裝後端依賴：
   ```bash
   cd mongoDemo
   npm install
   npm run dev
   ```

3. 安裝前端依賴：
   ```bash
   cd react-ts-mid
   npm install
   npm run dev
   ```

### 關於資料庫
1. 打開Docker，打開MongoDB Compass：
   根據 `.env` 文件中的設定連接到遠端 MongoDB。

2. 啟動後端：
   ```bash
   npm run dev
   ```
   log日誌顯示連線成功的消息：
   ```bash
   info: Dec-18-2024 02:34:30: 	listening on *:8877
   info: Dec-18-2024 02:34:30: 	suscess: connet to mongoDB @mongodb://yyyxi:yyyxi411631269@127.0.0.1:27017/411631269
  ```

3. 啟動前端：
   ```bash
   npm run dev
   ```

   顯示：
   ```bash
   > my-react-app@0.0.0 dev
   > vite

   Port 5173 is in use, trying another one...
   Port 5174 is in use, trying another one...

   VITE v5.4.10  ready in 726 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

  4. 前往瀏覽器查看 `http://localhost:5173/`

---

## API 規格說明
`mongoDemo/src/Service/UserService.ts`
### 1. 查詢所有學生資料(取得所有資料，並按照座號排序)

**請求方式**: `GET`

**端點**: `/api/v1/user/findAll`

**回應範例**:
```json
{
  "code": 200,
  "message": "find success",
  "body": [
    {
      "_id": "6759060c8080b5e17e4d101d",
            "userName": "tkuee0787",
            "sid": "1",
            "name": "張佳慧",
            "department": "電機工程系",
            "grade": "四年級",
            "class": "A",
            "Email": "tkuee0787@tkuim.com"
    }
  ]
}
```

### 2. 新增學生資料
**請求方式**: `POST`

**端點**： `/api/v1/user/insertOne`

**請求 Body**:
```json
{
  "userName": "tkuim8765",
  "name": "姚育祺",
  "department": "資訊管理學系",
  "grade": "三",
  "class": "C",
  "email": "yaoyuci@gmail.com"
}
```

**回應範例**:
```json
{
  "code": 200,
    "message": "",
    "body": {
        "userName": "tkuim8765",
        "sid": "54",
        "name": "姚育祺",
        "department": "資訊管理學系",
        "grade": "三",
        "class": "C",
        "Email": "yaoyuci@gmail.com",
        "absences": 0,
        "_id": "67622a45f7ab6cd3084cf8a8",
        "__v": 0
  }
}
```

### 3. 刪除學生資料（透過 id刪除學生）
**請求方式**： `DELETE`

**端點**： `/api/v1/user/deleteById`

**回應範例**:
- 成功刪除
  ```json
  {
    "code": 200,
    "message": "sucess",
    "body": {
        "acknowledged": true,
        "deletedCount": 0
    }
  }
  ```

### 4. 更新學生名稱（透過id索引編輯學生資料）
**請求方式**: `PUT`

**端點**: `/api/v1/user/updateNameById`

**請求 Body**:
```json
{
    "id": "67618b31de2a3d02cddbd931",
    "name":"TEST"
}
```

**回應範例**:
```json
{
    "code": 200,
    "message": " update sucess",
    "body": {
        "_id": "67618b31de2a3d02cddbd931",
        "userName": "tkuim9999",
        "sid": "53",
        "name": "TEST",
        "department": "資訊管理學系",
        "grade": "三",
        "class": "C",
        "Email": "yaoyuci@gmail.com",
        "absences": 0,
        "__v": 0
    }
}
```

---

## 架構圖/流程圖

![架構圖/流程圖](./image.jpg)

- **前端react-ts-mid**: 提供用戶介面與使用者互動。
- **後端mongoDemo**: 提供 API 服務，包含學生資料的 CRUD 操作。
- **資料庫**: 儲存學生資料。

---
