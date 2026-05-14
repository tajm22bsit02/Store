import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = registerSchema.parse(req.body);

    return res.status(200).json({
      user: {
        id: `u-${Date.now()}`,
        name: payload.name,
        email: payload.email,
        role: "customer",
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request" });
  }
}
