// controllers/registrasiController.js
import { RegistrasiPendakian } from "../model/registrasimodel.js";
import { AnggotaPendakian } from "../model/anggota_pendakian.js";
import { Pembayaran } from "../model/pembayaran.js";


export const createRegistrasi = async (req, res) => {
    const { user_id, basecamp_id, total_orang, anggota, metode_pembayaran } = req.body;

    try {
        // Buat registrasi baru
        const registrasi = await RegistrasiPendakian.create({
            user_id,
            basecamp_id,
            total_orang,
            status: 'pending',
            status_pembayaran: metode_pembayaran === 'Bayar Langsung' ? 'pending' : 'pending',  // Bisa disesuaikan jika mau beda status
            // Bisa juga simpan metode_pembayaran di tabel registrasi jika perlu
        });

        // Simpan anggota pendakian
        for (let i = 0; i < anggota.length; i++) {
            const { nama_lengkap, nik } = anggota[i];
            await AnggotaPendakian.create({
                registrasi_id: registrasi.id,
                nama_lengkap,
                nik
            });
        }

        // Buat entry pembayaran untuk track pembayaran user
        await Pembayaran.create({
            registrasi_id: registrasi.id,
            metode_pembayaran,
            jumlah: 0,          // Jumlah nanti diisi sesuai perhitungan harga (bisa hitung di backend)
            status_pembayaran: metode_pembayaran === 'Bayar Langsung' ? 'pending' : 'belum bayar'
        });

        res.status(201).json({ registrasi, message: "Registrasi berhasil dibuat!" });
    } catch (err) {
        console.error('Error creating registrasi:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
