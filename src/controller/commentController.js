import prisma from "../config/connect.config.js";
import { checkToken } from "../config/jwt.js";

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

const addCommentToPicture = async (req, res) => {
  const { picture_id } = req.params;
  const { content } = req.body;
  const user_id = req.user_id;
  const date = new Date();
  if (!content || content.trim() === "") {
    return res.status(400).json({ Error: "Content cannot be empty" });
  }
  try {
    const comment = await prisma.comments.create({
      data: {
        picture_id: +picture_id,
        content,
        user_id,
        date_comment: date,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export { getCommentsByPicture, addCommentToPicture };
