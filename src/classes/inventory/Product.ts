import { Category } from "../Category"

export class Product{
    name:string
    code:string
    category?: Category
    imageSrc:string
    price:number
    quantity:number
    rating:number
    createdAt?:string
}