const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    log:["query"] //To log query in terminal
});

module.exports = prisma;
