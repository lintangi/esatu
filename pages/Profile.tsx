import React, { useState, useEffect } from 'react';
import { Teacher, Facility, SchoolConfig } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileProps {
  teachers: Teacher[];
  facilities: Facility[];
  config: SchoolConfig;
}

export const Profile: React.FC<ProfileProps> = ({ teachers, facilities, config }) => {
  const [teacherSlide, setTeacherSlide] = useState(0);
  const [facilitySlide, setFacilitySlide] = useState(0);

  const teacherItemsPerPage = 4;
  const facilityItemsPerPage = 3; 

  // Auto-slide for Teachers
  useEffect(() => {
    const timer = setInterval(() => {
      setTeacherSlide((prev) => (prev + 1) % teachers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [teachers.length]);

  // Auto-slide for Facilities
  useEffect(() => {
      const timer = setInterval(() => {
          setFacilitySlide((prev) => (prev + 1) % facilities.length);
      }, 6000); // Slightly different timing
      return () => clearInterval(timer);
  }, [facilities.length]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-500">
      
      {/* Banner Image */}
      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-8 relative">
        <img 
            src={config.profileBanner || "https://picsum.photos/1920/600?random=profile"} 
            alt="School Profile Banner" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide shadow-text">Profil Sekolah</h1>
        </div>
      </div>

      {/* Halo Text (Greeting) */}
      <div className="text-center max-w-4xl mx-auto mb-4">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
             <p className="text-gray-700 text-xl font-medium leading-relaxed italic">
            "{config.profileGreeting}"
            </p>
        </div>
      </div>

      {/* Visi Misi */}
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="text-4xl text-blue-200 absolute opacity-20 -ml-4">Target</span>
              Visi
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              "{config.vision}"
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Misi</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {config.mission.split('\n').map((line, index) => (
                  line.trim() && <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Teachers Directory - Carousel */}
      <div className="relative group">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tenaga Pendidik & Kependidikan</h2>
        
        <div className="overflow-hidden relative px-4 -mx-4">
           {/* Inner Track */}
           <div 
             className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${teacherSlide * (100 / (window.innerWidth < 768 ? 1 : teacherItemsPerPage))}%)` }}
           >
             {teachers.map((teacher) => (
               <div 
                 key={teacher.id} 
                 className="min-w-full md:min-w-[25%] px-3 flex-shrink-0"
               >
                 <div className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:-translate-y-1 transition-transform duration-300 h-full">
                    <div className="h-64 overflow-hidden bg-gray-100">
                       <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800">{teacher.name}</h3>
                      <p className="text-primary font-medium">{teacher.subject}</p>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={() => setTeacherSlide((prev) => (prev - 1 + teachers.length) % teachers.length)} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setTeacherSlide((prev) => (prev + 1) % teachers.length)} 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Fasilitas - Carousel */}
      <div className="relative group">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Fasilitas & Media Sekolah</h2>
        
        {facilities.length > 0 ? (
          <>
            <div className="overflow-hidden relative px-4 -mx-4">
               {/* Inner Track */}
               <div 
                 className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${facilitySlide * (100 / (window.innerWidth < 768 ? 1 : facilityItemsPerPage))}%)` }}
               >
                 {facilities.map((item) => (
                   <div 
                     key={item.id} 
                     className="min-w-full md:min-w-[33.333%] px-3 flex-shrink-0"
                   >
                     <div className="relative group/card overflow-hidden rounded-xl h-64 shadow-md">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-lg">{item.title}</span>
                        </div>
                    </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Carousel Controls */}
            <button 
              onClick={() => setFacilitySlide((prev) => (prev - 1 + facilities.length) % facilities.length)} 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setFacilitySlide((prev) => (prev + 1) % facilities.length)} 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg z-10 hidden group-hover:block transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </>
        ) : (
            <p className="text-center text-gray-500 w-full col-span-3">Belum ada data fasilitas.</p>
        )}
      </div>
    </div>
  );
};