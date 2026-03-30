import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ProfileForm from './ProfileForm';
import ChartUploads from './ChartUploads';
import DashaTables from './DashaTables';
import Predictions from './Predictions';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Consultant Profile' },
    { id: 'charts', label: 'Chart Uploads' },
    { id: 'dasha', label: 'Dasha/Dosha' },
    { id: 'pdf', label: 'Finalize PDF' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#0F172A] text-white p-4 shadow-md z-20 relative">
        <div className="text-2xl font-serif text-[#B8860B]">Vedic Pro</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#B8860B]">
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-10 w-64 bg-[#0F172A] text-white p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0 mt-[68px] md:mt-0' : '-translate-x-full md:translate-x-0'}
        md:w-72 lg:w-80 border-r border-[#B8860B]/20 shadow-[4px_0_24px_rgba(0,0,0,0.1)]
      `}>
        <div className="hidden md:block text-3xl font-serif text-[#B8860B] mb-10 tracking-wide">Vedic Pro</div>
        <nav className="flex flex-col gap-3">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`text-left px-5 py-3 rounded-lg transition-all duration-200 border border-transparent ${activeTab === tab.id ? 'bg-[#1E293B] text-[#B8860B] border-[#B8860B]/30 shadow-[0_0_15px_rgba(184,134,11,0.1)]' : 'hover:bg-[#1E293B] hover:text-white text-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 text-[#B8860B] tracking-tight">Digital Stationery</h1>
          
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#B8860B]/20 p-6 md:p-8 lg:p-10 min-h-[600px] relative overflow-hidden">
            {/* Subtle gold accent line at the top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-50"></div>
            
            {activeTab === 'profile' && <ProfileForm />}
            {activeTab === 'charts' && <ChartUploads />}
            {activeTab === 'dasha' && <DashaTables />}
            {activeTab === 'pdf' && <Predictions />}
          </div>
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
