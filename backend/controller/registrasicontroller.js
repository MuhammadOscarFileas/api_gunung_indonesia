// controllers/registrasiController.js
import { RegistrasiPendakian } from "../model/registrasimodel.js";
import { AnggotaPendakian } from "../model/anggota_pendakian.js";
import { Pembayaran } from "../model/pembayaran.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllRegistrasi = async (req, res) => {
  try {
    const registrasiList = await RegistrasiPendakian.findAll({
      include: [
        {
          model: AnggotaPendakian,
          as: "anggota_pendakians"
        },
        {
          model: Pembayaran,
          as: "pembayaran"
        }
      ]
    });

    res.status(200).json({
      message: "Daftar registrasi berhasil diambil",
      data: registrasiList
    });
  } catch (err) {
    console.error('Error fetching registrasi:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const createRegistrasi = async (req, res) => {
    const { user_id, basecamp_id, total_orang, harga_idr, mata_uang, harga_mata_uang, anggota, metode_pembayaran } = req.body;

    try {
        // Hasilkan string barcode unik
        const uniqueBarcode = uuidv4(); // Menghasilkan UUID unik

        // Anda dapat memilih salah satu API QR code di bawah ini:
        // Pilihan 1: GoQR.me
        // const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uniqueBarcode}`;

        // Pilihan 2: QuickChart.io
        // Lebih fleksibel dan direkomendasikan jika Anda butuh kustomisasi lebih lanjut
        const qrCodeUrl = `https://quickchart.io/qr?text=${uniqueBarcode}&size=150`;


        // Buat registrasi baru
        const registrasi = await RegistrasiPendakian.create({
            user_id,
            basecamp_id,
            total_orang,
            harga_idr, // Anda perlu menghitung ini berdasarkan logika bisnis Anda (misalnya, harga per orang * total_orang)
            harga_mata_uang, // Ini akan diisi jika ada konversi mata uang
            mata_uang, // Ini akan diisi jika ada konversi mata uang
            status: 'pending',
            status_pembayaran: metode_pembayaran === 'Bayar Langsung' ? 'pending' : 'pending',
            barcode: qrCodeUrl // Simpan URL QR code di database
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

        // Buat entry pembayaran untuk melacak pembayaran user
        await Pembayaran.create({
            registrasi_id: registrasi.id,
            metode_pembayaran,
            jumlah: 0,          // Jumlah nanti diisi sesuai perhitungan harga (bisa hitung di backend)
            status_pembayaran: metode_pembayaran === 'Bayar Langsung' ? 'pending' : 'belum bayar'
        });

        res.status(201).json({
            registrasi: {
                ...registrasi.toJSON(), // Konversi instance Sequelize ke objek JSON
                qr_code_url: qrCodeUrl // Tambahkan URL QR code ke respons
            },
            message: "Registrasi berhasil dibuat!"
        });
    } catch (err) {
        console.error('Error creating registrasi:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const updateStatusRegistrasi = async (req, res) => {
  const { id } = req.params;
  const { status, status_pembayaran } = req.body;

  try {
    // Cari registrasi berdasarkan ID
    const registrasi = await RegistrasiPendakian.findByPk(id);
    if (!registrasi) {
      return res.status(404).json({ message: "Registrasi tidak ditemukan" });
    }

    // Update status dan/atau status_pembayaran
    if (status) registrasi.status = status;
    if (status_pembayaran) registrasi.status_pembayaran = status_pembayaran;

    await registrasi.save();

    res.status(200).json({
      message: "Status registrasi berhasil diperbarui",
      data: registrasi
    });
  } catch (err) {
    console.error("Error updating registrasi status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
