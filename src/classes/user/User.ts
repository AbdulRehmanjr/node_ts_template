import { IRole } from "./Role"

export interface IUser{

    _id:string
    firstName:string
    lastName:string
    email:string
    picture:string
    password:string
    date:Date
    role:IRole
}