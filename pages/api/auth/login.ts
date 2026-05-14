import type { NextApiRequest, NextApiResponse } from "next";
import { demoUsers } from "@/lib/data";
import { authSchema } from "@/lib/validators";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = authSchema.partial({ name: true }).parse(req.body);
    const user = demoUsers.find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request" });
  }
}
