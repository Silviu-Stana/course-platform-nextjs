import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { courseId, chapterId } = await params;

        const { userId } = await auth();
        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        if (!params.courseId || !params.chapterId) {
            return new NextResponse('Course ID and Chapter ID are required', {
                status: 400,
            });
        }

        const body = await req.json();
        const { isCompleted } = body;
        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                },
            },
            update: {
                isCompleted,
            },
            create: {
                userId,
                chapterId,
                isCompleted,
            },
        });

        if (typeof isCompleted !== 'boolean') {
            return new NextResponse('Invalid request body', { status: 400 });
        }

        const progress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: chapterId,
                },
            },
            update: {
                isCompleted,
            },
            create: {
                userId,
                chapterId: chapterId,
                isCompleted,
            },
        });

        return NextResponse.json(progress);
    } catch (error) {
        console.log('[CHAPTER_ID_PROGRESS]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
