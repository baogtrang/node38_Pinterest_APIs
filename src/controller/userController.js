import prisma from "../config/connect.config.js";
import bcrypt from "bcrypt";
import { checkToken, createToken } from "../config/jwt.js";

const handleLogin = async (req, res) => {
  let { email, pass_word } = req.body;

  let dataEmail = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (!dataEmail) {
    res.status(404).send("Email not correct");
    return;
  }

  let passwordDecode = bcrypt.compareSync(
    String(pass_word),
    dataEmail.pass_word
  );
  if (!passwordDecode) {
    res.status(404).send("PassWord not correct");
    return;
  }
  let user_id = dataEmail.user_id;
  let payload = {
    email,
    user_id,
  };
  let token = createToken(payload);
  res.status(200).send(token);
};

const handleSignUp = async (req, res) => {
  let data = req.body;
  const partten = /^\w+\@(gmail)[\.\w+]+$/;

  for (const key in data) {
    if (data[key] === "" || data.avatar !== null) {
      res
        .status(400)
        .send(
          "Pls!! Fill in all information, avatar set null and can be upload later"
        );
      return;
    }
  }

  if (!data.email.match(partten)) {
    res.status(400).send("Pls!! enter correct type email");
    return;
  }

  let { email, pass_word, name, age, avatar } = req.body;
  let dataUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (dataUser) {
    res.status(400).send("This email already exists");
    return;
  }

  const passEncode = bcrypt.hashSync(pass_word, 10);
  await prisma.users.create({
    data: {
      email,
      pass_word: passEncode,
      name,
      age: Number(age),
      avatar,
    },
  });
  res.status(201).send("Create User Success");
};

const handleUploadAvatar = async (req, res) => {
  const img = req.file;
  if (!img) {
    res.status(400).send("pls!! fill in valid Img");
    return;
  }

  let { token } = req.headers;
  let dataEmail = checkToken(token);
  let { user_id } = dataEmail.deCode;
  await prisma.users.update({
    where: {
      user_id,
    },
    data: {
      avatar: img.path,
    },
  });

  res.status(201).send("Update Avatar Success");
};

const handlUpdateUser = async (req, res) => {
  let data = req.body;
  let newData = {};

  if (data.email !== null && data.email) {
    res.status(400).send("Email cann't edit, you can set email: null");
    return;
  }
  if (
    (Number(data.age) !== data.age && data.age !== null) ||
    (String(data.name) !== data.name && data.name !== null)
  ) {
    res.status(400).send("Age Should be Number and Name Should be String");
    return;
  }

  for (let key in data) {
    if (data[key] !== null && data[key] !== "") {
      newData[key] = data[key];
    }
  }

  if (newData.pass_word) {
    newData.pass_word = bcrypt.hashSync(String(newData.pass_word), 10);
  }

  let { token } = req.headers;
  let dataEmail = checkToken(token);
  let { user_id } = dataEmail.deCode;

  await prisma.users.update({
    where: {
      user_id,
    },
    data: newData,
  });

  res.status(201).send("Update Success");
};
export { handleLogin, handleSignUp, handleUploadAvatar, handlUpdateUser };
