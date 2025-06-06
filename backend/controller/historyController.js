import { RegistrasiPendakian, Basecamp, Gunung } from "../model/index.js";

export const getHistory = async (req, res) => {
  const userId = req.params.userId; // ambil dari query parameter

  if (!userId) {
    return res.status(400).json({ message: "user_id wajib dikirim di query parameter" });
  }

  console.log("User ID:", userId);

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

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "History tidak ditemukan untuk user ini" });
    }

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
