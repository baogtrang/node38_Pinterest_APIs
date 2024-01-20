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
    res.status(404).send("The user with this email not exsited");
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

  let payload = {
    email,
  };
  let token = createToken(payload);
  res.status(200).send(token);
};

const handleSignUp = async (req, res) => {
  let data = req.body;
  const partten = /^\w+\@(gmail)[\.\w+]+$/;

  for (const key in data) {
    if (data[key] === "") {
      res
        .status(404)
        .send(
          "Pls!! Fill in all information, avatar set null and can be upload later"
        );
      return;
    }
  }

  if (!data.email.match(partten)) {
    res.status(404).send("Pls!! enter correct type email");
    return;
  }

  let { email, pass_word, name, age, avatar } = req.body;
  let dataUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (dataUser) {
    res.status(404).send("The user with this email already exists");
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
  let { email } = dataEmail.deCode;
  const dataUserID = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  let { user_id } = dataUserID;
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
export { handleLogin, handleSignUp, handleUploadAvatar };
