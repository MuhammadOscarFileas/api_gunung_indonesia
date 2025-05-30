// controllers/detailHistoryController.js
import { RegistrasiPendakian } from "../model/registrasimodel.js";
import { Pembayaran } from "../model/pembayaran.js";
import { Gunung } from "../model/gunungmodel.js";
import { Basecamp } from "../model/basecampmodel.js";


export const getHistoryDetail = async (req, res) => {
    const { id } = req.params;  // ID registrasi yang dipilih

    try {
        const history = await RegistrasiPendakian.findByPk(id, {
            include: [
                { model: Pembayaran }, {model: Gunung, attributes: ['name']}, {model: Basecamp, attributes: ['name']}
                // Tambahkan model lain jika perlu (Basecamp, Gunung, dll)
            ]
        });

        if (!history) {
            return res.status(404).json({ message: 'History tidak ditemukan' });
        }

        res.json(history);
    } catch (err) {
        console.error('Error fetching history detail:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
