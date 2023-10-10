import { Router } from "express"
import categoryRoutes from "./business/CategoryRoutes"
import productRoutes from "./inverntory/ProductRoutes"
import sellerRequestRoutes from "./seller/SellerRoutes"
import roleRoutes from "./user/RoleRoute"
import userRoutes from "./user/UserRoute"
import chatListRoutes from "./communication/ChatListRoutes"
import messageRoutes from "./communication/MessageRoutes"




const router:Router = Router()

router.use('/api/user',userRoutes)
router.use('/api/role',roleRoutes)
router.use('/api/category',categoryRoutes)
router.use('/api/product',productRoutes)
router.use('/api/request',sellerRequestRoutes)
router.use('/api/chatlist',chatListRoutes)
router.use('/api/message',messageRoutes)


export { router }