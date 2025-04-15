import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
    PORT: z
        .number({
            coerce: true,
        })
        .default(3001),
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    TEST_SERVER_ENDPOINT: z.string(),
});

export const env = schema.parse(process.env);
