import prisma from "../config/connect.config.js";
import { checkToken } from "../config/jwt.js";

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

const handleListCreateByUser = async (req, res) => {
  let { token } = req.headers;
  let isValidUser = checkToken(token);
  let { user_id } = isValidUser.deCode;

  let resultData = await prisma.users.findFirst({
    where: {
      user_id,
    },
    include: { pictures: true },
  });
  res.status(200).send(resultData);
};

const handleCreatePictureByUser = async (req, res) => {
  let { token } = req.headers;
  let isValidUser = checkToken(token);
  let { user_id } = isValidUser.deCode;

  let data = req.body;
  for (const key in data) {
    if (
      data[key] == "" ||
      data[key] === null ||
      data[key] !== String(data[key])
    ) {
      res.status(400).send("Pls!! Fill all valid, type String");
      return;
    }
  }

  let { name, description, linkPicture } = req.body;

  if (!name || !description || !linkPicture) {
    res.status(400).send("Pls!! Fill all valid, type String");
    return;
  }

  let newData = {
    name,
    linkPicture,
    description,
    user_id,
  };

  await prisma.pictures.create({
    data: newData,
  });
  res.status(201).send("Create Picture Success");
};

const handleDeletePic = async (req, res) => {
  let { picture_id } = req.params;
  let { token } = req.headers;
  let isValidUser = checkToken(token);
  let { user_id } = isValidUser.deCode;

  let dataPic = await prisma.pictures.findFirst({
    where: {
      picture_id: +picture_id,
    },
  });

  if (!dataPic) {
    res.status(400).send("This image not exsited in DataBase");
    return;
  }
  
  if (user_id !== dataPic.user_id) {
    res
      .status(400)
      .send(
        "You are not the creator of this image, so you cann't delete this image"
      );
    return;
  }

  await prisma.pictures.delete({
    where: {
      picture_id: +picture_id,
    },
  });

  res.status(200).send("Delete Picture Success");
};
export {
  hanldeGetListPic,
  handleListByName,
  handleDetailPicAndUser,
  handleListCreateByUser,
  handleCreatePictureByUser,
  handleDeletePic,
};
