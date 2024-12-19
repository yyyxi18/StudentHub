import { Route } from "../abstract/Route"
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";
import { Request, Response } from 'express';

export class UserRoute extends Route {

    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super()
        this.url = '/api/v1/user/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.get(`${this.url}findAll`, (req, res) => {
            this.Contorller.findAll(req, res);
        })

        /**
         * 新增學生
         *  request body {
         *  userName: string,
         *  name: string",
         *  department: string,
         *  grade: string,
         *  class: string,
         *  Email: string
         * } 
         * @returns resp<Student>
         */

        /**
         * 新增學生
         */
        this.router.post(`${this.url}insertOne`, (req: Request, res: Response) => {
            const { userName, name, department, grade, class: studentClass, email } = req.body;

            // 驗證必填欄位
            if (!userName || !name || !department || !grade || !studentClass || !email) {
                return res.status(400).json({ message: "缺少必要的欄位" });
            }

            // 呼叫 UserController 新增學生資料
            this.Contorller.insertOne(req, res);
        });

        /**
         * 刪除學生
         */
        this.router.delete(`${this.url}deleteById`, (req, res) => {
            this.Contorller.deleteByID(req, res);
        })

        /**
         * 更新學生
         */
        this.router.put(`${this.url}updateNameById`, (req, res) => {
            this.Contorller.updateNameById(req, res);
        })
    }
}