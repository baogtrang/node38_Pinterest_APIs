import prisma from "../config/connect.config.js";

//controller to check if the picture is saved
const checkPictureSaved = async (req, res) => {
  const { pictures_id } = req.params;
  const user_id = req.user_id;
  try {
    const savedEntries = await prisma.save_pictures.findMany({
      where: {
        AND: [{ user_id: user_id }, { picture_id: parseInt(pictures_id) }],
      },
    });

    const savedEntry = savedEntries[0]; // Take the first entry if exists
    if (savedEntry) {
      res.status(200).json({
        saved: true,
        date_saved: savedEntry.date_save,
      });
    } else {
      res.status(200).json({ saved: false });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const getPicListByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const pictures = await prisma.pictures.findMany({
      where: {
        user_id: +user_id,
      },
    });
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export { checkPictureSaved, getPicListByUserId };
