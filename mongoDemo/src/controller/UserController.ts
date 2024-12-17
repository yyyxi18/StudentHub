import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async findAll(Request: Request, Response: Response) {

        const res: resp<Array<DBResp<Student>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        const dbResp = await this.service.getAllStudents();
        if (dbResp) {
            res.body = dbResp;
            res.message = "find sucess";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "server error";
            Response.status(500).send(res);
        }

    }

    public async insertOne(Request: Request, Response: Response) {
        const { userName, name, department, grade, class: studentClass, email } = Request.body;
        //Response.status(resp.code).send(resp)

        // 驗證必要欄位是否存在
        if (!userName || !name || !department || !grade || !studentClass || !email) {
            return Response.status(400).send({
                code: 400,
                message: "缺少必要的欄位",
            });
        }

        // 建立學生資料物件
        const newStudent: Student = {
            userName,
            name,
            department,
            grade,
            class: studentClass,
            Email: email,
            absences: 0, // 假設缺席次數預設為 0
        };

        try {
            // 呼叫 UserService 的 insertOne 方法來儲存學生資料
            const insertResp = await this.service.insertOne(newStudent);
            Response.status(insertResp.code).send(insertResp);
        } catch (error) {
            // 若有錯誤，回傳錯誤訊息
            console.error("新增學生資料時出錯: ", error);

            // 進行類型檢查，確保 error 是 Error 物件
            if (error instanceof Error) {
                Response.status(500).send({
                    code: 500,
                    message: "新增學生資料失敗",
                    error: error.message, // 正確訪問 error.message
                });
            } else {
                // 若不是 Error 類型，返回一個通用錯誤訊息
                Response.status(500).send({
                    code: 500,
                    message: "新增學生資料失敗",
                    error: "未知錯誤", // 默認錯誤訊息
                });
            }
        }

    }

    public async deleteById(Request: Request, Response: Response) {
        const { id } = Request.params;  // 從路由參數中獲取 id
        const resp = await this.service.deleteById(id);
        Response.status(resp.code).send(resp);
    }



    public async updateNameById(Request: Request, Response: Response) {
        const resp = await this.service.updateNameById(Request.body.id, Request.body.id)
        Response.status(resp.code).send(resp)
    }
}