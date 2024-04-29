import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const { userId } = auth();
        const id = params.id;

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const favorite = await prisma.favorite.delete({
            where: {
                destinationId: id,
            },
        })

        return NextResponse.json({ favorite, status: 200 });
    } catch (error) {
        console.log("Lỗi xóa yêu thích: ", error);
        return NextResponse.json({ error: "Lỗi xóa yêu thích", status: 500 });
    }
}