const { PrismaClient } = require('../lib/generated/prisma');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Web Dev' },
                { name: 'C++' },
                { name: 'Java' },
                { name: 'C#' },
                { name: 'Statistics' },
                { name: 'Math' },
                { name: 'Graphs' },
            ],
        });

        console.log('Success');
    } catch (error) {
        console.log('Error seeding the database categories', error);
    } finally {
        await db.$disconnect();
    }
}

main();

//RUN terminal command:
//node scripts/seed.ts
