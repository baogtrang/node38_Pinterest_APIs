import prisma from "../config/connect.config.js";

const hanldeGetListPic = async (req, res) => {
  let listImg = await prisma.pictures.findMany();
  res.status(200).send(listImg);
};

const handleListByName = async (req, res) => {
  let { fillter } = req.query;
  let validFillter = fillter + "";
  let listByName = await prisma.pictures.findMany({
    where: {
      name: {
        contains: validFillter,
      },
    },
  });
  res.status(200).send(listByName);
};

export { hanldeGetListPic, handleListByName };
