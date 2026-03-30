import { useState } from 'react';
import { useAstrologyStore } from '../store/useAstrologyStore';
import { Plus } from 'lucide-react';

export default function DashaTables() {
  const { dashas, doshas, addDasha, updateDoshas } = useAstrologyStore();
  const [newDasha, setNewDasha] = useState({ mahadasha: '', antardasha: '', period: '' });

  const handleAddDasha = () => {
    if (newDasha.mahadasha && newDasha.antardasha && newDasha.period) {
      addDasha(newDasha);
      setNewDasha({ mahadasha: '', antardasha: '', period: '' });
    }
  };

  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Dasha & Dosha</h2>
        <p className="text-gray-500 text-sm">Configure planetary periods and active doshas.</p>
      </div>

      <div className="bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-serif text-[#0F172A] mb-6 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-[#B8860B]"></span>
          Active Doshas
        </h3>
        <div className="flex flex-wrap gap-4 md:gap-8">
          {Object.keys(doshas).map((key) => (
            <label key={key} className="flex items-center gap-3 capitalize cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={doshas[key as keyof typeof doshas]} 
                  onChange={(e) => updateDoshas({ [key]: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 rounded border-2 border-gray-300 peer-checked:border-[#B8860B] peer-checked:bg-[#B8860B] transition-all flex items-center justify-center">
                  <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 font-medium group-hover:text-[#B8860B] transition-colors">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-serif text-[#0F172A] mb-6 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-[#B8860B]"></span>
          Dasha Periods
        </h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <input type="text" placeholder="Mahadasha" value={newDasha.mahadasha} onChange={e => setNewDasha({...newDasha, mahadasha: e.target.value})} className="flex-1 border-gray-200 bg-gray-50 p-3 rounded-lg focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-all" />
          <input type="text" placeholder="Antardasha" value={newDasha.antardasha} onChange={e => setNewDasha({...newDasha, antardasha: e.target.value})} className="flex-1 border-gray-200 bg-gray-50 p-3 rounded-lg focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-all" />
          <input type="text" placeholder="Period (e.g. 2024-2026)" value={newDasha.period} onChange={e => setNewDasha({...newDasha, period: e.target.value})} className="flex-1 border-gray-200 bg-gray-50 p-3 rounded-lg focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-all" />
          <button onClick={handleAddDasha} className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap">
            <Plus size={18} /> Add Period
          </button>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white text-sm md:text-base">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Mahadasha</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Antardasha</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashas.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-gray-800 font-medium">{d.mahadasha}</td>
                  <td className="py-4 px-6 text-gray-600">{d.antardasha}</td>
                  <td className="py-4 px-6 text-gray-600">{d.period}</td>
                </tr>
              ))}
              {dashas.length === 0 && (
                <tr><td colSpan={3} className="py-12 text-center text-gray-400 italic">No dasha periods added yet. Fill the form above to add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
