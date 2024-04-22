import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '4', 10);
        const skip = (page - 1) * limit;

        const blogs = await prisma.blogs.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                ],
            },
            take: limit,
            skip: skip,
        });

        const total = await prisma.blogs.count({
            where: {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                ],
            },
        });

        return NextResponse.json({ blogs, total, page, limit, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy blog: ", error);
        return NextResponse.json({ error: "Lỗi lấy blog", status: 500 });
    }
}


