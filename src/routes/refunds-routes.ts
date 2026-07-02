import { Router } from "express"

import { RefundsController } from "@/controllers/refunds-controller"

export const refundsRoutes = Router()
const refundsController = new RefundsController()

refundsRoutes.post("/", refundsController.create)