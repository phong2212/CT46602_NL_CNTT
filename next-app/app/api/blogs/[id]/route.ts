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

        const blog = await prisma.blogs.findUnique({
            where: {
                id,
            },
        });

        if (!blog) {
            return NextResponse.json({ error: "Blog không tồn tại", status: 404 });
        }

        return NextResponse.json({ blog, status: 200 });
    } catch (error) {
        console.log("Lỗi lấy blog: ", error);
        return NextResponse.json({ error: "Lỗi lấy blog", status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const { userId } = auth();
        const id = params.id;

        if (!userId) {
            return NextResponse.json({ error: "Không có quyền truy cập", status: 401 })
        }

        const blog = await prisma.blogs.delete({
            where: {
                id,
            },
        })

        return NextResponse.json(blog);
    } catch (error) {
        console.log("Lỗi xóa blog: ", error);
        return NextResponse.json({ error: "Lỗi xóa blog", status: 500 });
    }
}

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { userId } = auth();
//         const { name, description, continent, country, city, imageURL } = await req.json();
//         const id = params.id;

//         if (!userId) {
//             return NextResponse.json({ error: "Không có quyền truy cập", status: 401 });
//         }

//         if (!name || !description || !continent || !country || !city || !imageURL) {
//             return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin", status: 400 })
//         }

//         if (name.length < 3) {
//             return NextResponse.json({ error: "Tiêu đề phải dài hơn 3 kí tự", status: 400 })
//         }

//         const updatedDestination = await prisma.blogs.update({
//             where: { id },
//             data: { name, description, continent, country, city, imageURL },
//         });

//         return NextResponse.json({ updatedDestination, status: 200 });
//     } catch (error) {
//         console.log("Lỗi cập nhật blog: ", error);
//         return NextResponse.json({ error: "Lỗi cập nhật blog", status: 500 });
//     }
// }

