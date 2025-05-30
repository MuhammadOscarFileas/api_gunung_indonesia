import { Gunung, Basecamp } from "../model/index.js";

export const getGunungDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const gunung = await Gunung.findByPk(id, {
      attributes: ["id", "name", "height", "location", "latitude", "longitude", "description"],
      include: [{
        model: Basecamp,
        attributes: ["id", "name", "elevation", "description", "price_weekday", "price_weekend", "camping_fee"],
      }]
    });

    if (!gunung) {
      return res.status(404).json({ message: "Gunung tidak ditemukan" });
    }

    res.json(gunung);
  } catch (error) {
    console.error("Error fetching gunung detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};
