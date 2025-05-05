import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = await auth();
    if (!userId) return redirect('/');

    const { chapterId, courseId } = await params;

    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: courseId,
        },
        include: {
            muxData: true,
        },
    });

    return <div>ChapterIdPage</div>;
};

export default ChapterIdPage;
