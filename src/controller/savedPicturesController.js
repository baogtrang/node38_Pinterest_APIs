import prisma from "../config/connect.config.js";

//controller to check if the picture is saved
const checkPictureSaved = async (req, res) => {
  const { pictures_id } = req.params; // Ensure this matches your route parameter
  const user_id = req.user_id; // Retrieved from verifyToken middleware
  try {
    const savedEntries = await prisma.save_pictures.findMany({
      where: {
        AND: [{ user_id: user_id }, { picture_id: parseInt(pictures_id) }],
      },
    });
    // Assuming savedEntries should only return one record due to the unique combination of user_id and picture_id
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

export { checkPictureSaved };
