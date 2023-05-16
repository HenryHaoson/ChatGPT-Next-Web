import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return new Response("User already exists", {
      status: 400,
    });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
    });
  }
}
