import prisma from "../config/connect.config.js";

const hanldeGetListPic = async (req, res) => {
  const listImg = await prisma.pictures.findMany();
  res.status(200).send(listImg);
};

export { hanldeGetListPic };
