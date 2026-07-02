import type { SignOptions } from "jsonwebtoken"
import { env } from "../env"

export const authConfig = {
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: "1d" as SignOptions["expiresIn"],
    },
}