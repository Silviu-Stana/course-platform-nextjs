import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CoursePage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect('/');

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="p-6">
            <Link href={'/teacher/create'}>
                <Button className="mb-3">New Course</Button>
            </Link>
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursePage;
