import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const authorId = userId;

        const { title, content, imageURL } = await req.json();

        if (!title || !content || !imageURL) {
            return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin", status: 400 })
        }

        if (title.length < 3) {
            return NextResponse.json({ error: "Tiêu đề phải dài hơn 3 kí tự", status: 400 })
        }

        const blogs = await prisma.blogs.create({
            data: {
                authorId,
                title,
                content,
                imageURL,
            }
        });


        return NextResponse.json({ blogs, status: 200 });

    } catch (error) {
        console.log("Lỗi tạo blog: ", error);
        return NextResponse.json({ error: "Lỗi tạo blog", status: 500 });
    }
}

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

        const listblogs = await prisma.blogs.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ blogs, listblogs, total, page, limit, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy blog: ", error);
        return NextResponse.json({ error: "Lỗi lấy blog", status: 500 });
    }
}


