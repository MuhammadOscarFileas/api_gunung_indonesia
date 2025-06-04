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

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371; // Radius bumi dalam kilometer

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Mendapatkan 3 gunung terdekat dari lokasi pengguna
export const getNearestGunung = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude dan longitude harus dikirim" });
    }

    try {
        const gunungList = await Gunung.findAll();

        const withDistance = gunungList.map(gunung => {
            const distance = calculateDistance(
                parseFloat(lat),
                parseFloat(lng),
                parseFloat(gunung.latitude),
                parseFloat(gunung.longitude)
            );
            return { ...gunung.toJSON(), distance };
        });

        // Urutkan berdasarkan jarak terdekat
        withDistance.sort((a, b) => a.distance - b.distance);

        // Ambil 3 terdekat
        const nearestThree = withDistance.slice(0, 6);

        res.json(nearestThree);
    } catch (err) {
        console.error("Error finding nearest mountains:", err);
        res.status(500).json({ message: "Server error" });
    }
};