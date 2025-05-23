import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IconBadge } from './icon-badge';
import { BookOpen } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { CourseProgress } from './course-progress';

interface CourseCardProps {
    id: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
    title: string;
}

export const CourseCard = ({
    id,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
    title,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-lg transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">{category}</p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size={'success'} icon={BookOpen} />
                            <span>
                                {chaptersLength}{' '}
                                {chaptersLength === 1 ? 'Lesson' : 'Lessons'}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress
                            size="sm"
                            variant={progress === 100 ? 'success' : 'default'}
                            value={progress}
                        />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};
