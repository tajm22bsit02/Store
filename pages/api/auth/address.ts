import type { NextApiRequest, NextApiResponse } from "next";
import { addressSchema } from "@/lib/validators";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = addressSchema.parse(req.body);
    return res.status(200).json({ address: payload });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request" });
  }
}
