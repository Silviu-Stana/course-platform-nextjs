import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { isTeacher } from '@/lib/teacher';

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId || !isTeacher(userId))
            return new NextResponse('Unauthorized', { status: 401 });

        const { courseId } = await params;

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        if (!course) {
            return new NextResponse('Not Found', { status: 404 });
        }

        //Delete All Existing Videos (inside any of the course chapters)
        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await video.assets.delete(chapter.muxData.assetId);
            }
        }

        //Now we can safely delete the course...
        const deletedCourse = await db.course.delete({
            where: {
                id: courseId,
            },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.log('[COURSE_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId || !isTeacher(userId))
            return new NextResponse('Unauthorized', { status: 401 });

        const values = await req.json();
        const { courseId } = await params;

        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log('[COURSE_ID]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
