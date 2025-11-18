import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text)
    return NextResponse.json({ error: "Missing text" }, { status: 400 });

  // Tokenize user input
  const tokens = (text.toLowerCase().match(/\b[a-z']+\b/g) ?? []) as string[];
  const uniqueTokens: string[] = [...new Set(tokens)].slice(0, 40);

  // Find scripture matches using simple LIKE matching
  const matches: any[] = [];

  for (const token of uniqueTokens) {
    const found = await prisma.scripture.findMany({
      where: {
        OR: [{ text: { contains: token } }, { ref: { contains: token } }],
      },
      take: 3,
    });
    matches.push(...found);
  }

  // Deduplicate by ID
  const deduped = Array.from(new Map(matches.map((m) => [m.id, m])).values());

  return NextResponse.json({ footnotes: deduped });
}
