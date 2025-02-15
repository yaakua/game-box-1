import crypto from "crypto-js"
import {jwtVerify, SignJWT} from "jose"

// 定义一个工具类
class JWTUtils {
    secret: Uint8Array

    constructor(secret: string) {
        this.secret = new TextEncoder().encode(secret)
    }

    // 生成临时用户，userId 为 0，tempUserId 为临时用户唯一标识
    async genTempUser() {
        const tempUserId = this.generateUniqueId()
        return {tempUserId, userId: 0, isTempUser: true}
    }

    // 编码方法：生成 JWT，payload 支持 JSON 格式
    async encode(payload: Record<string, any>) {
        return await new SignJWT(payload)
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .sign(this.secret)
    }

    // 解码方法：验证 JWT 并返回 payload
    async decode(token: string) {
        try {
            const {payload} = await jwtVerify(token, this.secret)
            return payload
        } catch (error) {
            console.error("JWT verification failed:", error)
            throw new Error("Invalid token")
        }
    }

    // 生成类似 Git 提交 ID 的短唯一标识符
    generateUniqueId() {
        const timestamp = Date.now().toString()
        const randomStr = Math.random().toString(36).slice(2, 9)
        const hash = crypto.enc.Hex.stringify(crypto.SHA1(timestamp + randomStr))
        return `t-${hash.slice(0, 8)}` // 取前8位字符
    }
}

// 导出工具类实例
const jwtUtils = new JWTUtils("randomx-ai-secret")
export default jwtUtils
