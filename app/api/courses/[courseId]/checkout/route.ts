import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    const { courseId } = params;

    try {
        const userId = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (!courseId) {
            return new NextResponse('Course ID is required', { status: 400 });
        }

        const purchase = await db.purchase.create({
            data: {
                courseId,
                userId,
            },
        });

        return NextResponse.json(purchase);
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 400 });
    }
}
