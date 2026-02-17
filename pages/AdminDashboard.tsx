import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Newspaper, Users, Calendar, Plus, Trash2, Edit, Save, X, Image as ImageIcon, Settings, Building, Phone, Database, ArrowLeft, Upload, Download, FileText, Link as LinkIcon, Menu, ChevronLeft, RefreshCw, CloudUpload, GraduationCap, AlertCircle, BookOpen } from 'lucide-react';
import { NewsItem, Teacher, Event, Facility, SchoolConfig, DownloadItem, QuickLink } from '../types';

const ImageUploader = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-800">{label}</label>
      <div className="flex gap-4 items-start">
        <div className="w-20 h-20 bg-gray-100 rounded border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="text-gray-400" size={24} />
          )}
        </div>
        <div className="flex-1">
          <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 text-sm mb-1" 
            placeholder="https://..."
          />
          <p className="text-xs text-gray-500">Masukkan URL gambar (jpg/png) atau link Google Drive.</p>
        </div>
      </div>
    </div>
  );
};

const EntryForm = ({ type, initialData, onSubmit }: { type: string, initialData: any, onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState<any>(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      id: formData.id || Date.now()
    };
    onSubmit(dataToSubmit);
  };

  const renderFields = () => {
    switch (type) {
      case 'news':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Judul Berita</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
              <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select name="category" value={formData.category || 'Berita'} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                <option value="Berita">Berita</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ringkasan</label>
              <textarea name="summary" value={formData.summary || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 h-24" required />
            </div>
            <ImageUploader label="Gambar Berita" value={formData.image} onChange={(val) => setFormData({...formData, image: val})} />
          </>
        );
      case 'teachers':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
              <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan / Mata Pelajaran</label>
              <input name="subject" value={formData.subject || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <ImageUploader label="Foto Profil" value={formData.image} onChange={(val) => setFormData({...formData, image: val})} />
          </>
        );
      case 'events':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Agenda</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
              <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tipe Agenda</label>
              <select name="type" value={formData.type || 'academic'} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                <option value="academic">Akademik</option>
                <option value="holiday">Libur</option>
                <option value="activity">Kegiatan</option>
              </select>
            </div>
          </>
        );
      case 'facilities':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Fasilitas</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <ImageUploader label="Foto Fasilitas" value={formData.image} onChange={(val) => setFormData({...formData, image: val})} />
          </>
        );
      case 'downloads':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Dokumen</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select name="category" value={formData.category || 'Akademik'} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                <option value="Akademik">Akademik</option>
                <option value="Tata Tertib">Tata Tertib</option>
                <option value="Kurikulum">Kurikulum</option>
                <option value="Kesiswaan">Kesiswaan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">URL Dokumen</label>
              <input name="url" value={formData.url || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="https://..." required />
            </div>
          </>
        );
      case 'quick-links':
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Label Link</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">URL Tujuan</label>
              <input name="url" value={formData.url || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="https://..." required />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderFields()}
      <div className="pt-4 flex justify-end gap-3">
        <button type="submit" className="bg-primary hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md">
          Simpan Data
        </button>
      </div>
    </form>
  );
};

interface AdminDashboardProps {
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  teachers: Teacher[];
  setTeachers: (teachers: Teacher[]) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
  facilities: Facility[];
  setFacilities: (facilities: Facility[]) => void;
  downloads: DownloadItem[];
  setDownloads: (downloads: DownloadItem[]) => void;
  quickLinks: QuickLink[];
  setQuickLinks: (links: QuickLink[]) => void;
  config: SchoolConfig;
  setConfig: (config: SchoolConfig) => void;
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  news, setNews, teachers, setTeachers, events, setEvents, facilities, setFacilities,
  downloads, setDownloads, quickLinks, setQuickLinks,
  config, setConfig, onExit
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('admin123'); // Default, no persistence
  const [activeTab, setActiveTab] = useState<'news' | 'teachers' | 'events' | 'facilities' | 'downloads' | 'quick-links' | 'settings' | 'identity' | 'contact' | 'backup' | 'spmb'>('news');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // GitHub Sync States
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  // Simple authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Password salah!');
    }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setPassword('');
  };

  // Sync Data to GitHub via Vercel Function
  const handleSyncToGitHub = async () => {
    if (!confirm("Simpan perubahan ke Server?\n\nIni akan memperbarui file 'data.json' di repositori GitHub Anda dan memicu build ulang otomatis di Vercel.\n\nProses ini memakan waktu 1-3 menit sampai perubahan terlihat di website publik.")) {
        return;
    }

    setIsSyncing(true);
    setSyncStatus('idle');
    setSyncMessage('Menghubungkan ke server...');

    const payload = {
        schoolConfig: config,
        news,
        teachers,
        events,
        facilities,
        downloads,
        quickLinks
    };

    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            setSyncStatus('success');
            setSyncMessage('Berhasil! Data tersimpan di GitHub. Vercel sedang melakukan redeploy otomatis. Mohon tunggu beberapa menit.');
        } else {
            setSyncStatus('error');
            setSyncMessage(`Gagal: ${result.message || 'Terjadi kesalahan saat menyimpan.'}`);
        }
    } catch (error) {
        setSyncStatus('error');
        setSyncMessage('Error jaringan. Pastikan koneksi internet stabil.');
    } finally {
        setIsSyncing(false);
        // Clear success message after 10 seconds
        if (syncStatus === 'success') {
            setTimeout(() => setSyncMessage(''), 10000);
        }
    }
  };

  // Generic delete handler
  const handleDelete = (id: number, type: 'news' | 'teachers' | 'events' | 'facilities' | 'downloads' | 'quick-links') => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      if (type === 'news') setNews(news.filter(i => i.id !== id));
      if (type === 'teachers') setTeachers(teachers.filter(i => i.id !== id));
      if (type === 'events') setEvents(events.filter(i => i.id !== id));
      if (type === 'facilities') setFacilities(facilities.filter(i => i.id !== id));
      if (type === 'downloads') setDownloads(downloads.filter(i => i.id !== id));
      if (type === 'quick-links') setQuickLinks(quickLinks.filter(i => i.id !== id));
    }
  };

  // Open form for adding
  const handleAdd = () => {
      setEditingItem(null);
      setShowForm(true);
  };

  // Open form for editing
  const handleEdit = (item: any) => {
      setEditingItem(item);
      setShowForm(true);
  };

  // Save handler (Create or Update)
  const handleSave = (data: any) => {
      if (activeTab === 'news') {
          if (editingItem) {
              setNews(news.map(i => i.id === data.id ? data : i));
          } else {
              setNews([data, ...news]);
          }
      } else if (activeTab === 'teachers') {
          if (editingItem) {
              setTeachers(teachers.map(i => i.id === data.id ? data : i));
          } else {
              setTeachers([...teachers, data]);
          }
      } else if (activeTab === 'events') {
          if (editingItem) {
              setEvents(events.map(i => i.id === data.id ? data : i));
          } else {
              setEvents([...events, data]);
          }
      } else if (activeTab === 'facilities') {
          if (editingItem) {
              setFacilities(facilities.map(i => i.id === data.id ? data : i));
          } else {
              setFacilities([...facilities, data]);
          }
      } else if (activeTab === 'downloads') {
          if (editingItem) {
              setDownloads(downloads.map(i => i.id === data.id ? data : i));
          } else {
              setDownloads([...downloads, data]);
          }
      } else if (activeTab === 'quick-links') {
          if (editingItem) {
              setQuickLinks(quickLinks.map(i => i.id === data.id ? data : i));
          } else {
              setQuickLinks([...quickLinks, data]);
          }
      }
      setShowForm(false);
  };

  const handleConfigChange = (name: string, value: string) => {
      setConfig({ ...config, [name]: value });
  };

  const handleBackup = () => {
      const data = {
          news, teachers, events, facilities, downloads, quickLinks, config
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `backup_sekolah_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
          try {
              const data = JSON.parse(ev.target?.result as string);
              if (confirm("Apakah Anda yakin ingin merestore data? Data saat ini akan tertimpa.")) {
                  if (data.news) setNews(data.news);
                  if (data.teachers) setTeachers(data.teachers);
                  if (data.events) setEvents(data.events);
                  if (data.facilities) setFacilities(data.facilities);
                  if (data.downloads) setDownloads(data.downloads);
                  if (data.quickLinks) setQuickLinks(data.quickLinks);
                  if (data.schoolConfig) setConfig(data.schoolConfig); else if (data.config) setConfig(data.config);
                  alert("Data berhasil direstore!");
              }
          } catch (error) {
              alert("Gagal membaca file backup. Pastikan format JSON valid.");
          }
      };
      reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset halaman? Ini akan memuat ulang data dari server.")) {
        window.location.reload();
    }
  };


  const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const newPass = (form.elements.namedItem('newPass') as HTMLInputElement).value;
      const confirmPass = (form.elements.namedItem('confirmPass') as HTMLInputElement).value;

      if (newPass && newPass === confirmPass) {
          setAdminPassword(newPass);
          alert('Password admin sementara berhasil diubah (hanya untuk sesi ini).');
          form.reset();
      } else {
          alert('Password tidak cocok atau kosong!');
      }
  };

  const SidebarItem = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium whitespace-nowrap overflow-hidden ${
            activeTab === id ? 'bg-white text-primary shadow-md' : 'text-gray-200 hover:bg-gray-800 hover:text-white'
        }`}
        title={isSidebarCollapsed ? label : ''}
    >
        <div className="flex-shrink-0">{icon}</div>
        <span className={`${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'} transition-all duration-300`}>{label}</span>
    </button>
  );


  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 relative">
        <button 
            onClick={onExit}
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-bold"
        >
            <ArrowLeft size={20} /> Kembali ke Beranda
        </button>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-4 rounded-full">
              <Lock size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                placeholder="Masukkan password..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div 
        className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white flex flex-col fixed h-full shadow-xl transition-all duration-300 z-20`}
      >
        <div className="p-4 border-b border-gray-700 bg-gray-950 flex items-center justify-between">
          {!isSidebarCollapsed && (
             <div>
                <h2 className="text-xl font-bold text-white tracking-wide">Admin Panel</h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Content Manager</p>
             </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-200 hover:text-white mx-auto">
             {isSidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <SidebarItem id="news" label="Berita" icon={<Newspaper size={20} />} />
          <SidebarItem id="teachers" label="Guru & Staf" icon={<Users size={20} />} />
          <SidebarItem id="events" label="Agenda" icon={<Calendar size={20} />} />
          <SidebarItem id="facilities" label="Media & Fasilitas" icon={<ImageIcon size={20} />} />
          <SidebarItem id="downloads" label="Unduhan" icon={<FileText size={20} />} />
          <SidebarItem id="quick-links" label="Link Akademik" icon={<LinkIcon size={20} />} />
          
          <div className={`my-2 border-t border-gray-700 pt-2 pb-1 px-4 text-xs text-gray-400 uppercase ${isSidebarCollapsed ? 'text-center' : ''}`}>
             {isSidebarCollapsed ? 'CFG' : 'Konfigurasi'}
          </div>
          
          <SidebarItem id="identity" label="Identitas Sekolah" icon={<Building size={20} />} />
          <SidebarItem id="contact" label="Kontak & Link" icon={<Phone size={20} />} />
          <SidebarItem id="spmb" label="Manajemen SPMB" icon={<GraduationCap size={20} />} />
          <SidebarItem id="backup" label="Backup & Restore" icon={<Database size={20} />} />

          <div className="my-2 border-t border-gray-700"></div>
          <SidebarItem id="settings" label="Pengaturan Akun" icon={<Settings size={20} />} />
        </nav>
        <div className="p-4 border-t border-gray-800 bg-gray-950">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-gray-900 py-2 rounded transition-colors ${isSidebarCollapsed ? 'px-0' : ''}`}
            title="Keluar"
          >
            <LogOut size={18} />
            {!isSidebarCollapsed && <span>Keluar</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8 overflow-y-auto transition-all duration-300 flex flex-col`}>
        {/* Sync Status Banner */}
        {syncMessage && (
             <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2 ${
                 syncStatus === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
                 syncStatus === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                 'bg-blue-100 text-blue-800 border border-blue-200'
             }`}>
                {isSyncing && <RefreshCw className="animate-spin" size={20} />}
                <p className="font-medium text-sm">{syncMessage}</p>
             </div>
        )}

        {['news', 'teachers', 'events', 'facilities', 'downloads', 'quick-links'].includes(activeTab) && (
            <>
                <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight">
                        Manajemen {activeTab === 'facilities' ? 'Media' : activeTab.replace('-', ' ')}
                    </h1>
                    <p className="text-gray-700 mt-1 font-medium">Kelola konten website dengan mudah.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                        title="Simpan permanen ke GitHub"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 shadow-md transition-transform hover:scale-105 font-bold"
                    >
                        <Plus size={20} /> Tambah Data
                    </button>
                </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full overflow-x-auto">
                {activeTab === 'news' && (
                    <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-200 text-left border-b border-gray-300">
                        <tr>
                        <th className="p-4 font-bold text-gray-900">Judul</th>
                        <th className="p-4 font-bold text-gray-900">Tanggal</th>
                        <th className="p-4 font-bold text-gray-900">Kategori</th>
                        <th className="p-4 font-bold text-gray-900 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {news.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{item.title}</td>
                            <td className="p-4 text-gray-800">{item.date}</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-1 rounded-full">{item.category}</span></td>
                            <td className="p-4 text-right flex justify-end gap-2">
                            <button onClick={() => handleEdit(item)} className="text-blue-700 hover:bg-blue-100 p-2 rounded-lg transition-colors" title="Edit">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'news')} className="text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors" title="Hapus">
                                <Trash2 size={18} />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                {/* ... other tabs ... */}
                {activeTab === 'teachers' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {teachers.map(teacher => (
                            <div key={teacher.id} className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow bg-white">
                                <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{teacher.name}</h3>
                                    <p className="text-sm text-gray-700 font-medium truncate">{teacher.subject}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => handleEdit(teacher)} className="text-blue-700 hover:bg-blue-100 p-1.5 rounded-lg">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(teacher.id, 'teachers')} className="text-red-700 hover:bg-red-100 p-1.5 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'events' && (
                    <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-200 text-left border-b border-gray-300">
                        <tr>
                        <th className="p-4 font-bold text-gray-900">Tanggal</th>
                        <th className="p-4 font-bold text-gray-900">Nama Agenda</th>
                        <th className="p-4 font-bold text-gray-900">Tipe</th>
                        <th className="p-4 font-bold text-gray-900 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {events.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 text-gray-900 font-medium">{item.date}</td>
                            <td className="p-4 font-bold text-gray-900">{item.title}</td>
                            <td className="p-4">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                    item.type === 'holiday' ? 'bg-red-100 text-red-800' :
                                    item.type === 'activity' ? 'bg-green-100 text-green-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                {item.type}
                                </span>
                            </td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-700 hover:bg-blue-100 p-2 rounded-lg" title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(item.id, 'events')} className="text-red-700 hover:bg-red-100 p-2 rounded-lg" title="Hapus">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                {activeTab === 'facilities' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {facilities.map(facility => (
                            <div key={facility.id} className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white">
                                <div className="h-48 overflow-hidden">
                                     <img src={facility.image} alt={facility.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-lg mb-4">{facility.title}</h3>
                                    <div className="flex gap-2">
                                         <button onClick={() => handleEdit(facility)} className="flex-1 flex items-center justify-center gap-2 text-blue-700 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg font-bold text-sm transition-colors">
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(facility.id, 'facilities')} className="flex-1 flex items-center justify-center gap-2 text-red-700 bg-red-50 hover:bg-red-100 py-2 rounded-lg font-bold text-sm transition-colors">
                                            <Trash2 size={16} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'downloads' && (
                    <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-200 text-left border-b border-gray-300">
                        <tr>
                        <th className="p-4 font-bold text-gray-900">Nama Dokumen</th>
                        <th className="p-4 font-bold text-gray-900">Kategori</th>
                        <th className="p-4 font-bold text-gray-900">URL</th>
                        <th className="p-4 font-bold text-gray-900 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {downloads.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{item.title}</td>
                            <td className="p-4"><span className="bg-gray-200 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">{item.category}</span></td>
                            <td className="p-4 text-sm text-blue-700 truncate max-w-xs">{item.url}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-700 hover:bg-blue-100 p-2 rounded-lg" title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(item.id, 'downloads')} className="text-red-700 hover:bg-red-100 p-2 rounded-lg" title="Hapus">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                {activeTab === 'quick-links' && (
                    <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-200 text-left border-b border-gray-300">
                        <tr>
                        <th className="p-4 font-bold text-gray-900">Nama Link</th>
                        <th className="p-4 font-bold text-gray-900">URL Tujuan</th>
                        <th className="p-4 font-bold text-gray-900 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {quickLinks.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{item.title}</td>
                            <td className="p-4 text-sm text-blue-700 truncate max-w-xs">{item.url}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-700 hover:bg-blue-100 p-2 rounded-lg" title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(item.id, 'quick-links')} className="text-red-700 hover:bg-red-100 p-2 rounded-lg" title="Hapus">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                </div>
            </>
        )}

        {/* Identity Tab */}
        {activeTab === 'identity' && (
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Identitas Sekolah</h1>
                        <p className="text-gray-700 font-medium">Ubah nama, logo, dan sambutan kepala sekolah.</p>
                    </div>
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Nama Sekolah</label>
                        <input name="name" value={config.name} onChange={(e) => handleConfigChange('name', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" />
                    </div>
                     <div>
                        <ImageUploader 
                            label="Logo Sekolah"
                            value={config.logo}
                            onChange={(val) => handleConfigChange('logo', val)}
                        />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                           <BookOpen className="text-primary" size={20} />
                           <h3 className="font-bold text-gray-800">Media Publikasi Digital</h3>
                        </div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Link PDF Flipbook / Buletin Sekolah</label>
                        <input name="flipbookUrl" value={config.flipbookUrl || ''} onChange={(e) => handleConfigChange('flipbookUrl', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://heyzine.com/..." />
                        <p className="text-xs text-gray-500 mt-1">Masukkan URL embed atau link PDF viewer (contoh: AnyFlip, Heyzine, atau Google Drive preview link).</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Nama Kepala Sekolah</label>
                        <input name="headmasterName" value={config.headmasterName} onChange={(e) => handleConfigChange('headmasterName', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" />
                    </div>
                    <div>
                        <ImageUploader 
                            label="Foto Kepala Sekolah"
                            value={config.headmasterImage}
                            onChange={(val) => handleConfigChange('headmasterImage', val)}
                        />
                    </div>
                    <div>
                        <ImageUploader 
                            label="Foto Header Beranda"
                            value={config.heroImage}
                            onChange={(val) => handleConfigChange('heroImage', val)}
                        />
                    </div>
                    <div>
                        <ImageUploader 
                            label="Foto Banner Halaman Profil"
                            value={config.profileBanner}
                            onChange={(val) => handleConfigChange('profileBanner', val)}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Running Text (Pengumuman Berjalan)</label>
                        <textarea name="runningText" value={config.runningText} onChange={(e) => handleConfigChange('runningText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-20" placeholder="Masukkan teks pengumuman..." />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Sambutan Kepala Sekolah</label>
                        <textarea name="welcomeMessage" value={config.welcomeMessage} onChange={(e) => handleConfigChange('welcomeMessage', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-32" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Halo Text Halaman Profil</label>
                        <textarea name="profileGreeting" value={config.profileGreeting} onChange={(e) => handleConfigChange('profileGreeting', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-24" placeholder="Masukkan sapaan di halaman profil..." />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Visi Sekolah</label>
                            <textarea name="vision" value={config.vision} onChange={(e) => handleConfigChange('vision', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-32" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Misi Sekolah (Pisahkan dengan baris baru)</label>
                            <textarea name="mission" value={config.mission} onChange={(e) => handleConfigChange('mission', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-32" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Teks Footer (Copyright)</label>
                        <input name="footerText" value={config.footerText} onChange={(e) => handleConfigChange('footerText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="© 2024 Sekolah..." />
                    </div>
                    <div className="bg-blue-50 text-blue-900 p-4 rounded-lg text-sm font-medium border border-blue-100">
                        Perubahan akan langsung tersimpan di aplikasi.
                    </div>
                </div>
            </div>
        )}

         {/* ... other tabs ... */}
         {/* SPMB Tab */}
         {activeTab === 'spmb' && (
             <div className="max-w-4xl mx-auto w-full">
                {/* ... SPMB content same as original ... */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manajemen SPMB</h1>
                        <p className="text-gray-700 font-medium">Atur informasi pendaftaran siswa baru.</p>
                    </div>
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Deskripsi / Pengantar SPMB</label>
                        <textarea name="spmbDescription" value={config.spmbDescription} onChange={(e) => handleConfigChange('spmbDescription', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-24" placeholder="Contoh: Pendaftaran dibuka mulai..." />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">Persyaratan Dokumen</label>
                        <textarea name="spmbRequirements" value={config.spmbRequirements} onChange={(e) => handleConfigChange('spmbRequirements', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900 h-32" placeholder="1. Akta Kelahiran..." />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1.5">URL Google Spreadsheet / Apps Script Web App</label>
                        <input name="spmbGoogleFormUrl" value={config.spmbGoogleFormUrl} onChange={(e) => handleConfigChange('spmbGoogleFormUrl', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://script.google.com/..." />
                        <p className="text-xs text-gray-500 mt-1">Masukkan URL Google Apps Script Web App untuk menerima data form, atau URL Spreadsheet (view only).</p>
                    </div>
                </div>
            </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
             <div className="max-w-4xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Kontak & Operasional</h1>
                        <p className="text-gray-700 font-medium">Atur informasi kontak dan tautan penting.</p>
                    </div>
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Alamat Lengkap</label>
                            <input name="address" value={config.address} onChange={(e) => handleConfigChange('address', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Nomor Telepon</label>
                            <input name="phone" value={config.phone} onChange={(e) => handleConfigChange('phone', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Email Sekolah</label>
                            <input name="email" value={config.email} onChange={(e) => handleConfigChange('email', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">Jam Operasional (Ringkas)</label>
                            <input name="openingHours" value={config.openingHours} onChange={(e) => handleConfigChange('openingHours', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="e.g. 07:00 - 15:00" />
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4 text-primary">Jam Operasional Detail (Tampil di Halaman Akademik)</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Senin - Kamis</label>
                                <input name="hoursMondayThursday" value={config.hoursMondayThursday} onChange={(e) => handleConfigChange('hoursMondayThursday', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="07:00 - 15:30" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Jumat</label>
                                <input name="hoursFriday" value={config.hoursFriday} onChange={(e) => handleConfigChange('hoursFriday', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="07:00 - 11:30" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Sabtu</label>
                                <input name="hoursSaturday" value={config.hoursSaturday} onChange={(e) => handleConfigChange('hoursSaturday', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="08:00 - 12:00" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t pt-6">
                         <h3 className="font-bold text-gray-900 mb-4">Tautan Eksternal</h3>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Link E-Learning / LMS</label>
                                <input name="elearningLink" value={config.elearningLink} onChange={(e) => handleConfigChange('elearningLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Link Pendaftaran SPMB</label>
                                <input name="ppdbLink" value={config.ppdbLink} onChange={(e) => handleConfigChange('ppdbLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://..." />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Link Embed Google Maps (src iframe)</label>
                                <input name="mapsLink" value={config.mapsLink} onChange={(e) => handleConfigChange('mapsLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://www.google.com/maps/embed?..." />
                            </div>
                         </div>
                    </div>

                    <div className="border-t pt-6">
                         <h3 className="font-bold text-gray-900 mb-4">Sosial Media</h3>
                         <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Facebook Link</label>
                                <input name="facebookLink" value={config.facebookLink} onChange={(e) => handleConfigChange('facebookLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://facebook.com/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Instagram Link</label>
                                <input name="instagramLink" value={config.instagramLink} onChange={(e) => handleConfigChange('instagramLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://instagram.com/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">YouTube Link</label>
                                <input name="youtubeLink" value={config.youtubeLink} onChange={(e) => handleConfigChange('youtubeLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://youtube.com/..." />
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {/* ... backup & settings ... */}
        {activeTab === 'backup' && (
             <div className="max-w-4xl mx-auto">
                {/* ... backup content same as original ... */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Backup & Restore</h1>
                        <p className="text-gray-700 font-medium">Amankan data website Anda.</p>
                    </div>
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Download className="text-blue-700" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Backup Data</h3>
                        <p className="text-gray-700 mb-6 text-sm">Unduh seluruh konten website (Berita, Guru, Agenda, Konfigurasi) dalam format JSON.</p>
                        <button onClick={handleBackup} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors shadow-md">
                            Download Backup
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                         <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Upload className="text-amber-700" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Restore Data</h3>
                        <p className="text-gray-700 mb-6 text-sm">Kembalikan konten website dari file backup JSON. <span className="text-red-600 font-bold">Data saat ini akan tertimpa.</span></p>
                        <div className="relative mb-6">
                            <input 
                                type="file" 
                                accept=".json" 
                                onChange={handleRestore}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" 
                            />
                        </div>

                         <div className="border-t border-gray-200 pt-6 mt-2">
                             <div className="flex items-center gap-2 mb-2 text-red-600 font-bold text-sm">
                                <RefreshCw size={16} /> Reset
                             </div>
                             <p className="text-gray-500 text-xs mb-3">Jika terjadi kesalahan data, Anda dapat mengembalikan website ke pengaturan awal.</p>
                             <button onClick={handleResetDefaults} className="w-full border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 rounded-lg transition-colors text-sm">
                                Reset ke Default
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pengaturan Akun</h1>
                        <p className="text-gray-700 font-medium">Kelola keamanan akun administrator.</p>
                    </div>
                    <button
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 shadow-md transition-all font-bold disabled:opacity-50"
                    >
                        {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
                        Simpan Permanen
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                     <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b">
                        <Lock size={20} className="text-primary" />
                        Ganti Password
                     </h3>
                     <form onSubmit={handlePasswordChange} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Password Baru</label>
                            <input name="newPass" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="Minimal 6 karakter" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Konfirmasi Password</label>
                            <input name="confirmPass" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="Ulangi password baru" />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                                <Save size={18} /> Simpan Password
                            </button>
                        </div>
                     </form>
                </div>
            </div>
        )}
      </div>

      {/* Unified Form Modal */}
      {showForm && !['settings', 'identity', 'contact', 'backup', 'stats', 'spmb'].includes(activeTab) && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit Data' : 'Tambah Data'} {activeTab === 'facilities' ? 'Media' : activeTab}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-1 rounded-full border border-gray-200 hover:border-red-200">
                  <X size={20} />
              </button>
            </div>
            <div className="p-6">
               <EntryForm 
                 type={activeTab} 
                 initialData={editingItem}
                 onSubmit={handleSave}
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};