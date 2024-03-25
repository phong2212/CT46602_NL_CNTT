import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
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

        console.log("Địa điểm được tạo: ", destinations);

        return NextResponse.json({ destinations, status: 200 });

    } catch (error) {
        console.log("Lỗi tạo địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi tạo địa điểm", status: 500 });
    }
}

export async function GET(req: Request, res: Response) {
    try {
    } catch (error) {
        console.log("Lỗi lấy địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi lấy địa điểm", status: 500 });
    }
}

export async function PUT(req: Request, res: Response) {
    try {
    } catch (error) {
        console.log("Lỗi cập nhật địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi cập nhật địa điểm", status: 500 });
    }
}

export async function DELETE(req: Request, res: Response) {
    try {
    } catch (error) {
        console.log("Lỗi xóa địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi xóa địa điểm", status: 500 });
    }
}
