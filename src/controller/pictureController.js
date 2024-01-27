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

const handleDetailPicAndUser = async (req, res) => {
  let { picture_id } = req.params;

  let dataPic = await prisma.pictures.findFirst({
    where: {
      picture_id: +picture_id,
    },
  });

  if (!dataPic) {
    res.status(404).send("Picture not exsited");
    return;
  }

  let resultData = await prisma.pictures.findFirst({
    where: {
      picture_id: +picture_id,
    },
    include: {
      users: {
        select: {
          user_id: true,
          name: true,
          email: true,
          age: true,
          avatar: true,
        },
      },
    },
  });
  res.status(200).send(resultData);
};

export { hanldeGetListPic, handleListByName, handleDetailPicAndUser };
