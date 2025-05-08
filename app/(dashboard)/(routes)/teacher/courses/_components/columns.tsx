'use client';

import { Course } from '@/lib/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Title
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Price
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'isPublished',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Published
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const isPublished = row.getValue('isPublished') || false;

            return (
                <Badge className={cn('bg-transparent text-md')}>
                    {isPublished ? '✅' : '❌'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
