import {db} from "@/lib/db";

interface GraphData {
    name: string;
    total: number;
}

export const getStoreGraphRevenue = async (storeId: string) => {
    const paidOrders = await db.order.findMany({
        where: {
            StoreId: storeId,
            IsPaid: true,
        },
        include: {
            OrderItem: {
                include: {
                    Products: true
                }
            }
        }
    });

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.CreatedAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.OrderItem) {
            revenueForOrder += Number(item.Products.Price);
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = [
        { name: 'Jan', total: 0 },
        { name: 'Feb', total: 0 },
        { name: 'Mar', total: 0 },
        { name: 'Apr', total: 0 },
        { name: 'May', total: 0 },
        { name: 'Jun', total: 0 },
        { name: 'Jul', total: 0 },
        { name: 'Aug', total: 0 },
        { name: 'Sep', total: 0 },
        { name: 'Oct', total: 0 },
        { name: 'Nov', total: 0 },
        { name: 'Dec', total: 0 }
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
}

export const getTotalGraphRevenue = async () => {
    const paidOrders = await db.order.findMany({
        where: {
            IsPaid: true,
        },
        include: {
            OrderItem: {
                include: {
                    Products: true
                }
            }
        }
    });

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.CreatedAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.OrderItem) {
            revenueForOrder += Number(item.Products.Price);
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = [
        { name: 'Jan', total: 0 },
        { name: 'Feb', total: 0 },
        { name: 'Mar', total: 0 },
        { name: 'Apr', total: 0 },
        { name: 'May', total: 0 },
        { name: 'Jun', total: 0 },
        { name: 'Jul', total: 0 },
        { name: 'Aug', total: 0 },
        { name: 'Sep', total: 0 },
        { name: 'Oct', total: 0 },
        { name: 'Nov', total: 0 },
        { name: 'Dec', total: 0 }
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
}