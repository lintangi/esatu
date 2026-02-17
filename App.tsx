import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Academic } from './pages/Academic';
import { Admissions } from './pages/Admissions';
import { AdminDashboard } from './pages/AdminDashboard';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Page, AccessibilityState, NewsItem, Teacher, Event, Facility, SchoolConfig, DownloadItem, QuickLink } from './types';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { 
  INITIAL_SCHOOL_CONFIG, 
  NEWS_DATA, 
  TEACHERS_DATA, 
  EVENTS_DATA, 
  FACILITIES_DATA, 
  DOWNLOADS_DATA, 
  QUICK_LINKS_DATA 
} from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [accessSettings, setAccessSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    dyslexiaFont: false,
  });

  // State initialization: Strictly from Constants (Code) initially.
  // We DO NOT use localStorage.
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [teachers, setTeachers] = useState<Teacher[]>(TEACHERS_DATA);
  const [events, setEvents] = useState<Event[]>(EVENTS_DATA);
  const [facilities, setFacilities] = useState<Facility[]>(FACILITIES_DATA);
  const [downloads, setDownloads] = useState<DownloadItem[]>(DOWNLOADS_DATA);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(QUICK_LINKS_DATA);
  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>(INITIAL_SCHOOL_CONFIG);

  // Fetch data.json on mount from the SERVER (GitHub/Vercel)
  // This is the SINGLE Source of Truth.
  useEffect(() => {
    // Add timestamp to bypass browser cache and ensure we get the latest deployment data
    fetch(`data.json?t=${new Date().getTime()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.news) setNews(data.news);
          if (data.teachers) setTeachers(data.teachers);
          if (data.events) setEvents(data.events);
          if (data.facilities) setFacilities(data.facilities);
          if (data.downloads) setDownloads(data.downloads);
          if (data.quickLinks) setQuickLinks(data.quickLinks);
          if (data.schoolConfig) setSchoolConfig(data.schoolConfig);
        }
      })
      .catch(err => console.log('Using default constants', err));
  }, []);

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement;
    if (accessSettings.largeText) root.classList.add('text-lg');
    else root.classList.remove('text-lg');

    if (accessSettings.dyslexiaFont) document.body.style.fontFamily = '"Open Dyslexic", "Comic Sans MS", sans-serif';
    else document.body.style.fontFamily = '';
  }, [accessSettings]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setCurrentPage} news={news} config={schoolConfig} />;
      case 'profile': return <Profile teachers={teachers} facilities={facilities} config={schoolConfig} />;
      case 'academic': return <Academic events={events} downloads={downloads} quickLinks={quickLinks} config={schoolConfig} />;
      case 'admissions': return <Admissions config={schoolConfig} />;
      case 'admin': return (
        <AdminDashboard 
          news={news} setNews={setNews}
          teachers={teachers} setTeachers={setTeachers}
          events={events} setEvents={setEvents}
          facilities={facilities} setFacilities={setFacilities}
          downloads={downloads} setDownloads={setDownloads}
          quickLinks={quickLinks} setQuickLinks={setQuickLinks}
          config={schoolConfig} setConfig={setSchoolConfig}
          onExit={() => setCurrentPage('home')}
        />
      );
      case 'news': return (
         <div className="container mx-auto px-4 py-8 animate-in fade-in">
           <h1 className="text-3xl font-bold text-primary mb-6">Berita Sekolah</h1>
           
           {/* PDF Flipbook Viewer Canvas */}
           {schoolConfig.flipbookUrl && (
             <div className="mb-12 animate-in slide-in-from-bottom-5 duration-700">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-secondary pl-3">Buletin Digital</h2>
                <div className="w-full md:w-[60%] mx-auto aspect-[16/9] bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 relative group">
                   <iframe 
                     src={schoolConfig.flipbookUrl}
                     className="w-full h-full border-0"
                     allowFullScreen
                     title="Flipbook Viewer"
                   ></iframe>
                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-2 py-1 rounded">
                      PDF Viewer
                   </div>
                </div>
                <p className="text-center text-gray-500 text-sm mt-2 italic">Geser atau klik untuk membalik halaman (jika didukung).</p>
             </div>
           )}

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {news.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4">
                  <img src={item.image || "https://picsum.photos/400/300?grayscale"} alt={item.title} className="rounded mb-4 h-48 w-full object-cover" />
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.category}</span>
                  <h2 className="font-bold text-lg mb-2 mt-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
                  <button className="text-primary text-sm font-semibold hover:underline">Baca Selengkapnya</button>
                </div>
             ))}
           </div>
         </div>
      );
      case 'contact': return (
        <div className="container mx-auto px-4 py-8 animate-in fade-in">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">Hubungi Kami</h1>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nama</label>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pesan</label>
                    <textarea className="w-full border rounded p-2 h-32"></textarea>
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-800">Kirim Pesan</button>
                </form>
             </div>
             <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center overflow-hidden">
                {schoolConfig.mapsLink && schoolConfig.mapsLink.includes('embed') ? (
                   <iframe 
                      src={schoolConfig.mapsLink} 
                      className="w-full h-full border-0" 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                   ></iframe>
                ) : (
                  <div className="text-center text-gray-500">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p>Peta Lokasi Sekolah Google Maps</p>
                    <p className="text-sm mt-2">{schoolConfig.address}</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      );
      default: return <Home setPage={setCurrentPage} news={news} config={schoolConfig} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${accessSettings.highContrast ? 'grayscale contrast-125' : ''}`}>
      {currentPage !== 'admin' && <Navbar currentPage={currentPage} setPage={setCurrentPage} schoolName={schoolConfig.name} schoolLogo={schoolConfig.logo} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {currentPage !== 'admin' && (
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">{schoolConfig.name}</h3>
              <p className="text-sm mb-4">Membangun generasi cerdas, berkarakter, dan berdaya saing global.</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href={schoolConfig.facebookLink} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                <a href={schoolConfig.instagramLink} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                <a href={schoolConfig.youtubeLink} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Tautan</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('profile')} className="hover:text-white">Profil</button></li>
                <li><button onClick={() => setCurrentPage('academic')} className="hover:text-white">E-Learning</button></li>
                <li><button onClick={() => setCurrentPage('admissions')} className="hover:text-white">SPMB</button></li>
                <li><button onClick={() => setCurrentPage('news')} className="hover:text-white">Berita</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start justify-center md:justify-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>{schoolConfig.address}</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Phone size={16} />
                  <span>{schoolConfig.phone}</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} />
                  <span>{schoolConfig.email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            {schoolConfig.footerText}
          </div>
        </footer>
      )}

      {currentPage !== 'admin' && (
        <>
          <AccessibilityWidget settings={accessSettings} onUpdate={setAccessSettings} />
        </>
      )}
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;