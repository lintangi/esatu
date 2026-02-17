
export type Page = 'home' | 'profile' | 'academic' | 'admissions' | 'contact' | 'news' | 'admin';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
}

export interface Event {
  id: number;
  date: string;
  title: string;
  type: 'academic' | 'holiday' | 'activity';
}

export interface Facility {
  id: number;
  title: string;
  image: string;
}

export interface DownloadItem {
  id: number;
  title: string;
  category: string; // e.g., 'Akademik', 'Tata Tertib'
  url: string;
}

export interface QuickLink {
  id: number;
  title: string; // e.g., 'Cek Kelulusan'
  url: string;
}

export interface SchoolConfig {
  name: string;
  address: string;
  phone: string;
  email: string;
  headmasterName: string;
  headmasterImage: string;
  welcomeMessage: string;
  heroImage: string;
  vision: string;
  mission: string;
  mapsLink: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  elearningLink: string;
  ppdbLink: string;
  openingHours: string;
  footerText: string;
  runningText: string;
  profileGreeting: string;
  logo: string;
  profileBanner: string;
  hoursMondayThursday: string;
  hoursFriday: string;
  hoursSaturday: string;
  // SPMB Specific Config
  spmbDescription: string;
  spmbRequirements: string;
  spmbGoogleFormUrl: string;
  // News Config
  flipbookUrl?: string;
}

export interface AppData {
  schoolConfig: SchoolConfig;
  news: NewsItem[];
  teachers: Teacher[];
  events: Event[];
  facilities: Facility[];
  downloads: DownloadItem[];
  quickLinks: QuickLink[];
}

export interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}