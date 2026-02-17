import React from 'react';
import { Download, Calendar as CalendarIcon, Book, Clock } from 'lucide-react';
import { Event, DownloadItem, QuickLink, SchoolConfig } from '../types';

interface AcademicProps {
  events: Event[];
  downloads: DownloadItem[];
  quickLinks: QuickLink[];
  config: SchoolConfig;
}

export const Academic: React.FC<AcademicProps> = ({ events, downloads, quickLinks, config }) => {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Portal Akademik</h1>
          <p className="text-gray-600">Pusat informasi kegiatan belajar mengajar</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
            <Book size={18} />
            Login E-Learning (LMS)
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Kalender Akademik */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CalendarIcon className="text-secondary" />
              Agenda Mendatang
            </h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-50 text-primary p-3 rounded-lg text-center min-w-[80px]">
                    <div className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('id-ID', { month: 'short' })}</div>
                    <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                            event.type === 'holiday' ? 'bg-red-100 text-red-700' :
                            event.type === 'activity' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                            {event.type === 'holiday' ? 'Libur' : event.type === 'activity' ? 'Kegiatan' : 'Akademik'}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Area */}
          <div className="bg-white rounded-xl shadow-md p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Download className="text-secondary" />
              Unduhan Materi & Dokumen
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {downloads.map((item) => (
                    <a key={item.id} href={item.url} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary cursor-pointer group hover:bg-gray-50 transition-colors">
                        <div>
                            <span className="text-sm text-gray-700 font-medium group-hover:text-primary block">{item.title}</span>
                            <span className="text-xs text-gray-500">{item.category}</span>
                        </div>
                        <Download size={16} className="text-gray-400 group-hover:text-primary" />
                    </a>
                ))}
                {downloads.length === 0 && <p className="text-gray-500 text-sm">Belum ada dokumen untuk diunduh.</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-blue-800 text-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Clock size={20} /> Jam Operasional
                </h3>
                <div className="space-y-2 text-sm text-blue-100">
                    <div className="flex justify-between">
                        <span>Senin - Kamis</span>
                        <span>{config.hoursMondayThursday}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Jumat</span>
                        <span>{config.hoursFriday}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Sabtu (Ekskul)</span>
                        <span>{config.hoursSaturday}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Tautan Cepat</h3>
                <ul className="space-y-2">
                    {quickLinks.map((link) => (
                        <li key={link.id}>
                            <a href={link.url} className="text-gray-600 hover:text-primary hover:underline text-sm block py-1">
                                &bull; {link.title}
                            </a>
                        </li>
                    ))}
                    {quickLinks.length === 0 && <li className="text-sm text-gray-500">Belum ada tautan.</li>}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};