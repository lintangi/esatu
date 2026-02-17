import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Page, NewsItem, SchoolConfig } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
  news: NewsItem[];
  config: SchoolConfig;
}

export const Home: React.FC<HomeProps> = ({ setPage, news, config }) => {
  // Use all news for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [news.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section - Reduced height to 250px */}
      <div className="relative h-[250px] w-full bg-gray-900 overflow-hidden">
        <img
          src={config.heroImage || "https://picsum.photos/1920/1080?random=school"}
          alt="School Building"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 animate-in fade-in slide-in-from-bottom-5 duration-700">
            Mewujudkan Generasi <span className="text-secondary">Unggul</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 hidden md:block">
            Pendidikan berkualitas dengan teknologi terkini untuk masa depan yang lebih cerah.
          </p>
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <button
              onClick={() => setPage('admissions')}
              className="px-6 py-2 bg-secondary hover:bg-amber-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
            >
              Daftar SPMB
            </button>
            <button
              onClick={() => setPage('profile')}
              className="px-6 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-full transition-all text-sm md:text-base"
            >
              Profil Sekolah
            </button>
          </div>
        </div>

        {/* Running Text */}
        <div className="absolute bottom-0 w-full bg-blue-900/90 text-white py-2 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block px-4">
            <span className="mx-4 font-semibold text-sm">{config.runningText}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        {/* Welcome Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-1 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-secondary pl-4">Sambutan Kepala Sekolah</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              "{config.welcomeMessage}"
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Kami mengintegrasikan teknologi dalam pembelajaran dan menyediakan berbagai ekstrakurikuler untuk mengembangkan bakat siswa.
            </p>
          </div>
          <div className="order-2 md:order-2 flex flex-col justify-center items-center">
            <div className="relative w-1/2">
                <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-xl"></div>
                <img 
                    src={config.headmasterImage || "https://picsum.photos/100/100?random=headmaster"} 
                    alt="Kepala Sekolah" 
                    className="relative w-full rounded-2xl shadow-2xl object-cover border-4 border-white transform hover:scale-105 transition-transform duration-500" 
                />
            </div>
            <div className="mt-6 text-center">
                <p className="font-bold text-gray-900 text-xl">{config.headmasterName}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Kepala Sekolah</p>
            </div>
          </div>
        </div>

        {/* Latest News Carousel */}
        <div className="mb-8 relative group">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-primary pl-4">Berita Terbaru</h2>
            <button
              onClick={() => setPage('news')}
              className="flex items-center gap-2 text-primary hover:text-blue-700 font-semibold"
            >
              Lihat Semua <ArrowRight size={20} />
            </button>
          </div>

          <div className="overflow-hidden relative px-4 -mx-4">
            <div 
               className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * (100 / (window.innerWidth < 768 ? 1 : itemsPerPage))}%)` }}
            >
              {news.map((item) => (
                <div key={item.id} className="min-w-full md:min-w-[33.333%] px-3 flex-shrink-0">
                  <div 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group/card cursor-pointer h-full" 
                      onClick={() => setPage('news')}
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">{item.category}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover/card:text-primary transition-colors">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                      <p className="text-gray-400 text-xs">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

           {/* Carousel Controls */}
           <button 
              onClick={handlePrev} 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
            >
              <ChevronRight size={24} />
            </button>
        </div>
      </div>
    </div>
  );
};