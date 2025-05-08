'use client';
import { Category } from '@/lib/generated/prisma';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { CategoryItem } from './category-item';
import { PiCodeBold } from 'react-icons/pi';
import { GrGraphQl } from 'react-icons/gr';
import { FaJava } from 'react-icons/fa';
import { BiMath } from 'react-icons/bi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';

interface CategoriesProps {
    items: Category[];
}
//prettier-ignore
const iconMap: Record<Category['name'], IconType> = {
    'C#': PiCodeBold,
    'C++': PiCodeBold,
    'Graphs': GrGraphQl,
    'Java': FaJava,
    'Math': BiMath,
    'Statistics': BsGraphUpArrow,
    'Web Dev': CgWebsite,
};

export const Categories = ({ items }: CategoriesProps) => {
    console.log(items);
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    );
};
