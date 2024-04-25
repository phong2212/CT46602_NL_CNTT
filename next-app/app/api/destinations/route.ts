import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const { name, description, continent, country, city, imageURL } = await req.json();

        if (!name || !description || !continent || !country || !city || !imageURL) {
            return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin", status: 400 })
        }

        if (name.length < 3) {
            return NextResponse.json({ error: "Tiêu đề phải dài hơn 3 kí tự", status: 400 })
        }

        const destinations = await prisma.destinations.create({
            data: {
                name,
                description,
                continent,
                country,
                city,
                imageURL,
            }
        });


        return NextResponse.json({ destinations, status: 200 });

    } catch (error) {
        console.log("Lỗi tạo địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi tạo địa điểm", status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '4', 10);
        const skip = (page - 1) * limit;

        const destinations = await prisma.destinations.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { continent: { contains: search, mode: 'insensitive' } },
                    { country: { contains: search, mode: 'insensitive' } },
                    { city: { contains: search, mode: 'insensitive' } },
                ],
            },
            take: limit,
            skip: skip,
        });

        const asia = await prisma.destinations.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                continent: 'Châu Á',
            },
        });

        const total = await prisma.destinations.count({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { continent: { contains: search, mode: 'insensitive' } },
                    { country: { contains: search, mode: 'insensitive' } },
                    { city: { contains: search, mode: 'insensitive' } },
                ],
            },
        });

        const random = await prisma.destinations.findManyRandom(6, {
            select: { id: true, name: true, imageURL: true },
            where: {},
        });

        return NextResponse.json({ destinations, asia, random, total, page, limit, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi lấy địa điểm", status: 500 });
    }
}



