const promoCodes = [
    {
        id: 1,
        code: "PROMO123",
        isPercent: true,
        minSpend: 50,
        maxDiscount: 100,
        useLimit: 10,
        discount: 20,
        expiry: "2024-12-31"
    },
    {
        id: 2,
        code: "SAVE20",
        isPercent: false,
        minSpend: 100,
        maxDiscount: 50,
        useLimit: 5,
        discount: 20,
        expiry: "2024-11-30"
    },
    {
        id: 3,
        code: "DEAL50",
        isPercent: true,
        minSpend: 30,
        maxDiscount: 75,
        useLimit: 15,
        discount: 10,
        expiry: "2024-10-15"
    },
    {
        id: 4,
        code: "WINTER25",
        isPercent: false,
        minSpend: 20,
        maxDiscount: 25,
        useLimit: 7,
        discount: 25,
        expiry: "2024-09-01"
    },
    {
        id: 5,
        code: "SUMMER10",
        isPercent: true,
        minSpend: 10,
        maxDiscount: 20,
        useLimit: 20,
        discount: 10,
        expiry: "2024-08-20"
    },
    {
        id: 6,
        code: "HOLIDAY50",
        isPercent: false,
        minSpend: 200,
        maxDiscount: 100,
        useLimit: 2,
        discount: 50,
        expiry: "2024-07-04"
    },
    {
        id: 7,
        code: "NEWYEAR25",
        isPercent: true,
        minSpend: 150,
        maxDiscount: 50,
        useLimit: 10,
        discount: 25,
        expiry: "2024-12-31"
    },
    {
        id: 8,
        code: "FALLSALE30",
        isPercent: false,
        minSpend: 70,
        maxDiscount: 30,
        useLimit: 8,
        discount: 30,
        expiry: "2024-11-01"
    },
    {
        id: 9,
        code: "SPRING15",
        isPercent: true,
        minSpend: 60,
        maxDiscount: 15,
        useLimit: 12,
        discount: 15,
        expiry: "2024-03-21"
    },
    {
        id: 10,
        code: "BLACKFRIDAY",
        isPercent: false,
        minSpend: 500,
        maxDiscount: 200,
        useLimit: 1,
        discount: 100,
        expiry: "2024-11-29"
    }
];

export default promoCodes;
