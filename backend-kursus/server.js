const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Hapus object options {}, cukup URL saja
mongoose.connect('mongodb://localhost:27017/dbkursus')
  .then(() => console.log('Terhubung ke MongoDB'))
  .catch(err => console.error('Gagal koneksi MongoDB:', err));

const PesertaSchema = new mongoose.Schema({
    nama: String,
    level: String,
    alamat: String,
    no_hp: String,
    tanggal_daftar: { type: Date, default: Date.now }
});

const Peserta = mongoose.model('Peserta', PesertaSchema);


app.get('/api/peserta', async (req, res) => {
    try {
        const data = await Peserta.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/peserta/:id', async (req, res) => {
    try {
        const data = await Peserta.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/peserta', async (req, res) => {
    try {
        const pesertaBaru = new Peserta(req.body);
        const result = await pesertaBaru.save();
        res.json({ message: 'Peserta berhasil ditambahkan', data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/peserta/:id', async (req, res) => {
    try {
        await Peserta.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Data peserta diperbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/peserta/:id', async (req, res) => {
    try {
        await Peserta.findByIdAndDelete(req.params.id);
        res.json({ message: 'Peserta dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
});