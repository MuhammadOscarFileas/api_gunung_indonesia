import { RegistrasiPendakian, Pembayaran, Basecamp, Gunung, AnggotaPendakian } from "../model/index.js";

export const getHistoryDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const history = await RegistrasiPendakian.findByPk(id, {
      include: [
        {
          model: Pembayaran,
          attributes: ['id', 'metode_pembayaran', 'jumlah', 'status_pembayaran']
        },
        {
          model: Basecamp,
          attributes: ['id', 'name', 'elevation'],
          include: [
            {
              model: Gunung,
              attributes: ['id', 'name', 'height', 'location']
            }
          ]
        },
        {
          model: AnggotaPendakian,
          attributes: ['id', 'nama_lengkap', 'nik']
        }
      ]
    });

    if (!history) {
      return res.status(404).json({ message: "History tidak ditemukan" });
    }

    res.json(history);
  } catch (error) {
    console.error("Error fetching history detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};
