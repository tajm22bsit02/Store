import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/lib/data";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ products });
}
