'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { isTeacher } from '@/lib/teacher';

export const NavbarRoutes = () => {
    const { userId } = useAuth();

    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith('/teacher');
    const isCoursePage = pathname?.includes('/courses');
    const isSearchPage = pathname === '/search';

    return (
        <>
            {isSearchPage && (
                <div className="hidden! md:block!">
                    <Suspense fallback={<div>Loading search input...</div>}>
                        <SearchInput />
                    </Suspense>
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href={'/'}>
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href={'/teacher/courses'}>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="bg-sky-50 text-sky-700 hover:text-sky-800"
                        >
                            Teacher Mode
                        </Button>
                    </Link>
                )}
                <UserButton />
            </div>
        </>
    );
};
