import { ChangeEvent } from 'react';
import { useAstrologyStore } from '../store/useAstrologyStore';

export default function ProfileForm() {
  const { profile, updateProfile } = useAstrologyStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  const inputClass = "mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#B8860B] focus:ring-[#B8860B] sm:text-sm p-3 border bg-gray-50/50 transition-all duration-200 hover:bg-white outline-none";

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Consultant Profile</h2>
        <p className="text-gray-500 text-sm">Update your public details for the generated reports.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-[#0F172A] uppercase tracking-wider">Full Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className={inputClass} placeholder="e.g. Pt. Sharma" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-[#0F172A] uppercase tracking-wider">Logo URL</label>
          <input type="text" name="logo" value={profile.logo} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] uppercase tracking-wider">WhatsApp Number</label>
          <input type="text" name="whatsapp" value={profile.whatsapp} onChange={handleChange} className={inputClass} placeholder="+91..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] uppercase tracking-wider">Instagram URL</label>
          <input type="text" name="instagram" value={profile.instagram} onChange={handleChange} className={inputClass} placeholder="https://instagram.com/..." />
        </div>
      </div>
    </div>
  );
}
