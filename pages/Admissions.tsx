import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SchoolConfig } from '../types';

interface AdmissionsProps {
    config?: SchoolConfig;
}

export const Admissions: React.FC<AdmissionsProps> = ({ config }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use state for form fields to facilitate data sending
  const [formData, setFormData] = useState({
      namaLengkap: '',
      nisn: '',
      tempatLahir: '',
      tanggalLahir: '',
      asalSekolah: '',
      namaAyah: '',
      namaIbu: '',
      email: '',
      whatsapp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // Prepare data for sending
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });
        // Also add timestamp
        payload.append('timestamp', new Date().toISOString());

        // Send to Google Spreadsheet (using the configured URL)
        // Note: Direct fetch to a spreadsheet edit URL usually returns 200 but HTML content, not API response.
        // Ideally, this should be a Google Apps Script Web App URL.
        // We use mode 'no-cors' because Google Scripts/Forms typically don't allow CORS for direct reading.
        if (config?.spmbGoogleFormUrl) {
             await fetch(config.spmbGoogleFormUrl, {
                method: 'POST',
                body: payload,
                mode: 'no-cors' 
            });
        } else {
            // Fallback simulation if no URL configured
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        setSubmitted(true);
    } catch (error) {
        console.error("Submission error", error);
        alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Pendaftaran Berhasil!</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Data Anda telah kami kirimkan ke panitia SPMB. Silakan cek email atau tunggu informasi selanjutnya melalui WhatsApp.
        </p>
        <button 
          onClick={() => {
              setSubmitted(false);
              setFormData({
                namaLengkap: '', nisn: '', tempatLahir: '', tanggalLahir: '', 
                asalSekolah: '', namaAyah: '', namaIbu: '', email: '', whatsapp: ''
              });
          }}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800"
        >
          Kembali ke Form
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">Sistem Penerimaan Murid Baru (SPMB)</h1>
        <p className="text-gray-600 text-lg">Tahun Ajaran 2026/2027</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Formulir Pendaftaran Online</h2>
            
            {/* Display Admin Configured Description if available */}
            {config?.spmbDescription && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 text-sm whitespace-pre-line">
                    {config.spmbDescription}
                </div>
            )}

            <div className="space-y-6">
              {/* Data Siswa */}
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Data Calon Siswa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Sesuai Ijazah" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                    <input name="nisn" value={formData.nisn} onChange={handleChange} type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Nomor Induk Siswa Nasional" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                    <input name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                    <input name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} type="date" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
                    <input name="asalSekolah" value={formData.asalSekolah} onChange={handleChange} type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4 mt-2">Data Orang Tua / Wali</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                    <input name="namaAyah" value={formData.namaAyah} onChange={handleChange} type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                    <input name="namaIbu" value={formData.namaIbu} onChange={handleChange} type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Aktif</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Untuk pengiriman hasil seleksi" />
                  </div>
                   <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:bg-amber-600 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Mengirim...
                      </>
                  ) : (
                      "Kirim Pendaftaran"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Info SPMB */}
        <div className="space-y-6">
           <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Persyaratan & Alur
            </h3>
            
             {/* Display Admin Configured Requirements if available */}
             {config?.spmbRequirements && (
                <div className="mb-6 bg-white p-4 rounded border border-blue-100">
                    <h4 className="font-bold text-gray-800 mb-2 text-sm">Persyaratan Dokumen:</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{config.spmbRequirements}</p>
                </div>
            )}

            <ol className="relative border-l border-blue-200 ml-2 space-y-6">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">1</span>
                <h4 className="font-semibold text-gray-900">Isi Formulir</h4>
                <p className="text-sm text-gray-500">Lengkapi data diri secara online.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">2</span>
                <h4 className="font-semibold text-gray-900">Verifikasi Dokumen</h4>
                <p className="text-sm text-gray-500">Upload berkas yang dibutuhkan.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">3</span>
                <h4 className="font-semibold text-gray-900">Tes Seleksi</h4>
                <p className="text-sm text-gray-500">Mengikuti tes akademik & wawancara.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">4</span>
                <h4 className="font-semibold text-gray-900">Pengumuman</h4>
                <p className="text-sm text-gray-500">Hasil seleksi dikirim via Email/WA.</p>
              </li>
            </ol>
           </div>
        </div>
      </div>
    </div>
  );
};