const prisma = require("../../prisma/index");

const list = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  try {
    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 10;
    }

    const skip = (page - 1) * limit;

    const userInstance = await prisma.user.findMany({
      // We cann't use select and include both at the same time
      // select: {
      //   name: true,
      //   posts: true,
      // },
      include: {
        //To fetch post data
        posts: true,
        // To select fields
        // posts: {
        //   select: {
        //     id:true,
        //     title:true,
        //     slug:true,
        //   },
        // },
      },

      //To count number of post user has submitted
      //   select: {
      //     _count: {
      //       select: {
      //         posts: true,
      //         comments: true,
      //       },
      //     },
      //   },

      // Filter user based on name
      where: {
        // name: {
        // startsWith: "J",
        // endsWith:"y"
        // equals:"Jay"
        // },
        // Using logical operator OR,AND,NOT
        // OR: [
        //   {
        //     name: {
        //       startsWith: "J",
        //     },
        //   },
        //   {
        //     name: {
        //       endsWith: "y",
        //     },
        //   },
        // ],
        // NOT :{
        //   name :{
        //     startsWith: "J"
        //   }
        // }
      },
      // Pagination
      take: limit,
      skip: skip,

      // Sorting
      orderBy: {
        id: "desc",
      },
    });

    // To get total user count
    const totalUser = await prisma.user.count();

    // Total pages
    const totalPages = Math.ceil(totalUser / limit);

    res.status(200).send({
      data: userInstance,
      meta: { totalPages, currentPage: page, limit: limit },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const groupBy = async (req, res) => {
  try {
    const userInstance = await prisma.user.groupBy({
      by: ["name","email"],
      where: { email: { startsWith: "abc", mode: "insensitive" } },
    });

    res.status(200).send({
      data: userInstance,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { list, groupBy };
