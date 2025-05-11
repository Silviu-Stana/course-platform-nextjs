'use client';
import React from 'react';
import { BarChart, Compass, Layout, List } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';

const guestRoutes = [
    {
        icon: Layout,
        label: 'Cursurile Mele',
        href: '/',
    },
    {
        icon: Compass,
        label: 'Gaseste Un Curs',
        href: '/search',
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: 'Creaza Un Curs',
        href: '/teacher/courses',
    },
    {
        icon: BarChart,
        label: 'Analitice',
        href: '/teacher/analytics',
    },
];

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes('/teacher');
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}{' '}
        </div>
    );
};
