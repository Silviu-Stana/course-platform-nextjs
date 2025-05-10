import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface InfoCardProps {
    label: string;
    icon: LucideIcon;
    numberOfItems: number;
    variant?: 'default' | 'success';
}

export const InfoCard = ({
    label,
    icon: Icon,
    numberOfItems,
    variant,
}: InfoCardProps) => {
    return (
        <div className="outline-1 rounded-xl flex items-center gap-x-2 p-3">
            <IconBadge variant={variant} icon={Icon} />
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-gray-500 text-sm">
                    {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
                </p>
            </div>
        </div>
    );
};
