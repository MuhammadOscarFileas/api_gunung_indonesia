// controllers/createGunung.js
import { Gunung } from "../model/gunungmodel.js";

// Menambahkan Gunung Baru
export const addGunung = async (req, res) => {
    const { name, height, location, latitude, longitude, description } = req.body;

    try {
        const gunung = await Gunung.create({
            name,
            height,
            location,
            latitude,
            longitude,
            description
        });

        res.status(201).json({ message: "Gunung berhasil ditambahkan", gunung });
    } catch (err) {
        console.error('Error adding mountain:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Menampilkan semua gunung
export const getAllGunung = async (req, res) => {
    try {
        const gunungList = await Gunung.findAll();
        res.json(gunungList);
    } catch (err) {
        console.error('Error fetching mountains:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mengedit informasi gunung
export const editGunung = async (req, res) => {
    const { id } = req.params;
    const { name, height, location, latitude, longitude, description } = req.body;

    try {
        const gunung = await Gunung.findByPk(id);
        if (!gunung) {
            return res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }

        gunung.name = name || gunung.name;
        gunung.height = height || gunung.height;
        gunung.location = location || gunung.location;
        gunung.latitude = latitude || gunung.latitude;
        gunung.longitude = longitude || gunung.longitude;
        gunung.description = description || gunung.description;

        await gunung.save();
        res.json({ message: 'Gunung berhasil diperbarui', gunung });
    } catch (err) {
        console.error('Error editing mountain:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Menghapus gunung
export const deleteGunung = async (req, res) => {
    const { id } = req.params;

    try {
        const gunung = await Gunung.findByPk(id);
        if (!gunung) {
            return res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }

        await gunung.destroy();
        res.json({ message: 'Gunung berhasil dihapus' });
    } catch (err) {
        console.error('Error deleting mountain:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
