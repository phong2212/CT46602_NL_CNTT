import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        const id = params.id;

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const destination = await prisma.destinations.findUnique({
            where: {
                id,
            },
        });

        if (!destination) {
            return NextResponse.json({ error: "Địa điểm không tồn tại", status: 404 });
        }

        return NextResponse.json({ destination, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi lấy địa điểm", status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const { userId } = auth();
        const id = params.id;

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const destination = await prisma.destinations.delete({
            where: {
                id,
            },
        })

        return NextResponse.json(destination);
    } catch (error) {
        console.log("Lỗi xóa địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi xóa địa điểm", status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        const { name, description, continent, country, city, imageURL } = await req.json();
        const id = params.id;

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 });
        }

        if (!name || !description || !continent || !country || !city || !imageURL) {
            return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin", status: 400 })
        }

        if (name.length < 3) {
            return NextResponse.json({ error: "Tiêu đề phải dài hơn 3 kí tự", status: 400 })
        }

        const updatedDestination = await prisma.destinations.update({
            where: { id },
            data: { name, description, continent, country, city, imageURL },
        });

        return NextResponse.json({ updatedDestination, status: 200 });
    } catch (error) {
        console.log("Lỗi cập nhật địa điểm: ", error);
        return NextResponse.json({ error: "Lỗi cập nhật địa điểm", status: 500 });
    }
}

