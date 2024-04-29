import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const { destinationId } = await req.json();


        const favorite = await prisma.favorite.create({
            data: {
                userId,
                destinationId,
            }
        });


        return NextResponse.json({ favorite, status: 200 });

    } catch (error) {
        console.log("Lỗi tạo yêu thích: ", error);
        return NextResponse.json({ error: "Lỗi tạo yêu thích", status: 500 });
    }
}

export async function GET(req: Request) {
    try {

        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const favorite = await prisma.favorite.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                userId,
            },
        });

        return NextResponse.json({ favorite, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy blog: ", error);
        return NextResponse.json({ error: "Lỗi lấy blog", status: 500 });
    }
}



