import { getAnalytics } from '@/actions/get-analytics';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';

const AnalyticsPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect('/');

    const { data, totalRevenue, totalSales } = await getAnalytics(userId);

    return (
        <div className="p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-4">
                <DataCard value={totalSales} label="Total Sales" />
                <DataCard
                    value={totalRevenue}
                    label="Total Revenue"
                    shouldFormat
                />
            </div>
            <Chart data={data} />
        </div>
    );
};

export default AnalyticsPage;
