const prisma = require("../../prisma/index");

// Create post
const createPost = async (req, res) => {
  try {
    const { slug, title, body, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    return res.status(200).send({ data: post });
  } catch (error) {
    throw new Error(error);
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const data = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        body,
      },
    });
    return res.status(200).send({ "updated-data": data });
  } catch (error) {
    throw new Error(error);
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.post.delete({
      where: { id: id },
    });
    return res.status(200).send(data);
  } catch (error) {
    throw new Error(error);
  }
};

// Get post by Id

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const postInstance = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).send(postInstance);
  } catch (error) {
    throw new Error(error);
  }
};

// Get all post
const list = async (req, res) => {
  try {
    const data = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).send({ result: data });
  } catch (error) {
    throw new Error(error);
  }
};

// To search post
const search = async (req, res) => {
  try {
    const query = req.query.q;
    const data = await prisma.post.findMany({
      where: {
        body: {
          contains: query,
          mode: 'insensitive'  //To ignore capitalization
        },
      },
    });
    return res.status(200).send({ result: data });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createPost, updatePost, deletePost, list, getById, search };
