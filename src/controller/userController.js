import prisma from "../config/configConnectDB.js";
import bcrypt from "bcrypt";

const handleLogin = (req, res) => {
  res.send("Login.....");
};

const handleSignUp = async (req, res) => {
  let data = req.body;
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

  let { email, pass_word, name, age, avatar } = req.body;
  let dataUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (dataUser) {
    res.status(404).send("User had email is exsited");
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
export { handleLogin, handleSignUp };
