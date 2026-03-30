import { ChangeEvent } from 'react';
import { useAstrologyStore } from '../store/useAstrologyStore';
import { Upload } from 'lucide-react';

export default function ChartUploads() {
  const { charts, setChart } = useAstrologyStore();

  const handleUpload = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChart(id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Chart Uploads</h2>
        <p className="text-gray-500 text-sm">Upload the necessary astrological charts for the report.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(charts).map((key) => (
          <div key={key} className="group relative border border-gray-200 p-6 rounded-2xl bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(184,134,11,0.1)] hover:border-[#B8860B]/40 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px]">
            <h3 className="capitalize font-semibold text-[#0F172A] mb-4 text-lg">{key} Chart</h3>
            
            <div className="relative w-full flex-1 flex flex-col items-center justify-center">
              {charts[key] ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-100 shadow-inner">
                  <img src={charts[key] as string} alt={key} className="w-full h-full object-contain bg-gray-50 p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-[#B8860B]/10 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleUpload(key, e)} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                title={`Upload ${key} chart`}
              />
              {!charts[key] && <span className="text-sm text-gray-500 group-hover:text-[#B8860B] transition-colors">Click to upload</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
