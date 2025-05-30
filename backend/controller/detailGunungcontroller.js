// controllers/detailGunungController.js
import { Gunung } from "../models/gunungmodel.js";
import { Basecamp } from "../models/basecampmodel.js";

export const getGunungDetail = async (req, res) => {
    const { id } = req.params;  // ID gunung yang dipilih

    try {
        const gunung = await Gunung.findByPk(id, {
            include: [{
                model: Basecamp,
                attributes: ['name', 'elevation']
            }]
        });

        if (!gunung) {
            return res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }

        res.json(gunung);
    } catch (err) {
        console.error('Error fetching gunung detail:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
