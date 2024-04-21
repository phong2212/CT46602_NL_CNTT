import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        const user = await prisma.users.findUnique({
            where: {
                clerkId: id,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Tài khoản không tồn tại", status: 404 });
        }

        return NextResponse.json({ user, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy tài khoản: ", error);
        return NextResponse.json({ error: "Lỗi lấy tài khoản", status: 500 });
    }
}