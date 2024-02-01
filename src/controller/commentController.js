import prisma from "../config/connect.config.js";

const getCommentsByPicture = async (req, res) => {
  const { picture_id } = req.params;
  try {
    const comments = await prisma.comments.findMany({
      where: {
        picture_id: +picture_id,
      },
      include: {
        users: {
          select: {
            user_id: true,
            email: true,
            name: true,
            age: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export { getCommentsByPicture };
