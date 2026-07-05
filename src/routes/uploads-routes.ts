import { Router } from "express"
import multer from "multer"

import uploadConfig from "@/configs/upload"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"
import { UploadsController } from "@/controllers/uploads-controller"

export const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRoutes.use(verifyUserAuthorization(["employee"]))
uploadsRoutes.use("/", upload.single("file"), uploadsController.create)