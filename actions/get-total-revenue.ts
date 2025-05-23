import {db} from "@/lib/db";

export const getStoreRevenue = async (storeId: string) => {
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

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.OrderItem.reduce((orderSum, item) => {
            return orderSum + Number(item.Products.Price);
        }, 0);
        return total + orderTotal;
    }, 0);

    return totalRevenue;
}

export const getTotalRevenue = async () => {
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

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.OrderItem.reduce((orderSum, item) => {
            return orderSum + Number(item.Products.Price);
        }, 0);
        return total + orderTotal;
    }, 0);

    return totalRevenue;
}