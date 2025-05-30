import { RegistrasiPendakian, Basecamp, Gunung } from "../model/index.js";

export const getHistory = async (req, res) => {
  const userId = req.user.id; // Pastikan middleware auth mengisi req.user

  try {
    const history = await RegistrasiPendakian.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Basecamp,
          attributes: ["id", "name", "elevation"],
          include: [
            {
              model: Gunung,
              attributes: ["id", "name"]
            }
          ]
        }
      ],
      order: [["registrasi_date", "DESC"]]
    });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
