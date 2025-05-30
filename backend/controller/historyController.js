// controllers/historyController.js
import { RegistrasiPendakian} from "../model/registrasimodel.js";
import { Gunung } from "../model/gunungmodel.js";
import { Basecamp } from "../model/basecampmodel.js";


export const getHistory = async (req, res) => {
  const userId = req.user.id; // Dari middleware auth

  try {
    const history = await RegistrasiPendakian.findAll({
      where: { user_id: userId },
      include: [
        { model: Gunung, attributes: ["name"] },
        { model: Basecamp, attributes: ["name"] }
      ],
      order: [["registrasi_date", "DESC"]]
    });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
