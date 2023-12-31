import { z } from "zod"

const schemaEnv = z.object({JSONTOKEN: z.string(),DATABASE_URL:z.string()})

export function env() {
    const envValue = schemaEnv.parse(process.env)
    return envValue
}