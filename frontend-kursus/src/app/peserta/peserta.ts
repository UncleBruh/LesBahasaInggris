import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  
import { PesertaService } from '../services/peserta';

@Component({
  selector: 'app-peserta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './peserta.html',
  styleUrls: ['./peserta.css']   
})
export class PesertaComponent implements OnInit {
  pesertaList: any[] = [];
  form: any = {
    nama: '',
    level: '',
    alamat: '',
    no_hp: ''
  };
  idEdit: string | null = null;

  constructor(private pesertaSvc: PesertaService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.pesertaSvc.getAll().subscribe(data => {
      this.pesertaList = data;
    });
  }

  simpan() {
    if (!this.form.nama || !this.form.level) {
      alert('Nama dan Level harus diisi!');
      return;
    }

    if (this.idEdit) {
      this.pesertaSvc.update(this.idEdit, this.form).subscribe(() => {
        alert('Data berhasil diupdate!');
        this.resetForm();
        this.load();
      });
    } else {
      this.pesertaSvc.create(this.form).subscribe(() => {
        alert('Peserta berhasil ditambahkan!');
        this.resetForm();
        this.load();
      });
    }
  }

  edit(data: any) {
    this.idEdit = data._id; // MongoDB pakai _id
    this.form = {
      nama: data.nama,
      level: data.level,
      alamat: data.alamat,
      no_hp: data.no_hp
    };
  }

  hapus(id: string) {
    if (confirm('Yakin ingin menghapus data ini?')) {
      this.pesertaSvc.delete(id).subscribe(() => this.load());
    }
  }

  resetForm() {
    this.form = { nama: '', level: '', alamat: '', no_hp: '' };
    this.idEdit = null;
  }
}