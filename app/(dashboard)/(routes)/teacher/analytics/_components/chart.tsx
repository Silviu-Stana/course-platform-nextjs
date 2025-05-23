'use client';
import { Card } from '@/components/ui/card';
import React from 'react';

interface ChartProps {
    data: {
        name: string;
        total: number;
    }[];
}

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export const Chart = ({ data }: ChartProps) => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={350}>
                <>
                    <BarChart data={data}>
                        <XAxis
                            dataKey={'name'}
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                    </BarChart>
                    <Bar
                        dataKey="total"
                        fill="#0369a1"
                        radius={[4, 4, 0, 0]}
                    ></Bar>
                </>
            </ResponsiveContainer>
        </Card>
    );
};
