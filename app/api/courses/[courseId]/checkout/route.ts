import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Ensure this path is correct based on your project structure

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (!params.courseId) {
            return new NextResponse('Course ID is required', { status: 400 });
        }

        const purchase = await db.purchase.create({
            data: {
                courseId: params.courseId,
                userId,
            },
        });

        return NextResponse.json(purchase);
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 400 });
    }
}
