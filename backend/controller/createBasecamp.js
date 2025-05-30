// controllers/createBasecamp.js
import { Basecamp } from "../model/basecampmodel.js";

// Menambahkan Basecamp Baru
export const addBasecamp = async (req, res) => {
    const { gunung_id, name, elevation, description, price_wni_weekday, price_wni_weekend, price_wna_weekday, price_wna_weekend, camping_fee_wni, camping_fee_wna } = req.body;

    try {
        const basecamp = await Basecamp.create({
            gunung_id,
            name,
            elevation,
            description,
            price_weekday,
            price_weekend,
            camping_fee
        });

        res.status(201).json({ message: "Basecamp berhasil ditambahkan", basecamp });
    } catch (err) {
        console.error('Error adding basecamp:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Menampilkan basecamp berdasarkan ID gunung
export const getBasecampByGunung = async (req, res) => {
    const { gunung_id } = req.params;
    try {
        const basecampList = await Basecamp.findAll({ where: { gunung_id } });
        res.json(basecampList);
    } catch (err) {
        console.error('Error fetching basecamp:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mengedit informasi basecamp
export const editBasecamp = async (req, res) => {
    const { id } = req.params;
    const { gunung_id, name, elevation, description, price_wni_weekday, price_wni_weekend, camping_fee_wni } = req.body;

    try {
        const basecamp = await Basecamp.findByPk(id);
        if (!basecamp) {
            return res.status(404).json({ message: 'Basecamp tidak ditemukan' });
        }

        basecamp.gunung_id = gunung_id || basecamp.gunung_id;
        basecamp.name = name || basecamp.name;
        basecamp.elevation = elevation || basecamp.elevation;
        basecamp.description = description || basecamp.description;
        basecamp.price_weekday = price_wni_weekday || basecamp.price_weekday;
        basecamp.price_weekend = price_wni_weekend || basecamp.price_weekend;
        basecamp.camping_fee = camping_fee_wni || basecamp.camping_fee;

        await basecamp.save();
        res.json({ message: 'Basecamp berhasil diperbarui', basecamp });
    } catch (err) {
        console.error('Error editing basecamp:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Menghapus basecamp
export const deleteBasecamp = async (req, res) => {
    const { id } = req.params;

    try {
        const basecamp = await Basecamp.findByPk(id);
        if (!basecamp) {
            return res.status(404).json({ message: 'Basecamp tidak ditemukan' });
        }

        await basecamp.destroy();
        res.json({ message: 'Basecamp berhasil dihapus' });
    } catch (err) {
        console.error('Error deleting basecamp:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
