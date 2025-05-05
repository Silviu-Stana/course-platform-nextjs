'use client';
import { Chapter } from '@/lib/generated/prisma';
import { useEffect, useState } from 'react';

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}

export const ChaptersList = ({
    items,
    onReorder,
    onEdit,
}: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    //In server, this entire component wont render. Only in client side. (little trick)
    if (!isMounted) return null;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(
            result.source.index,
            result.destination.index
        );
        const endIndex = Math.max(
            result.source.index,
            result.destination.index
        );

        setChapters(items);

        const updatedChapters = items.slice(startIndex, endIndex + 1);
        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id),
        }));

        onReorder(bulkUpdateData);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            'flex items-center gap-x-2 bg-sky-100 border-sky-100 border text-sky-700 rounded-md mb-4 text-sm',
                                            chapter.isPublished &&
                                                'bg-sky-100 border-sky-200 text-sky-700'
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                'px-2 py-3 border-r border-r-sky-200 hover:bg-sky-300 rounded-l-md transition',
                                                chapter.isPublished &&
                                                    'border-r-sky-200 hover:bg-sky-200'
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-4 w-4" />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>Free</Badge>
                                            )}
                                            <Badge
                                                className={cn(
                                                    'bg-slate-500',
                                                    chapter.isPublished &&
                                                        'bg-sky-700'
                                                )}
                                            >
                                                {chapter.isPublished
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </Badge>
                                            <Pencil
                                                className="w-4 h-4 cursor-pointer hover:opacity-75"
                                                onClick={() =>
                                                    onEdit(chapter.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {/* this last line prevents the box from resizing while drag-and-dropping which would look jarring */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
