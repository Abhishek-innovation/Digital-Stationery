import { useAstrologyStore } from '../store/useAstrologyStore';
import { KundliPDF } from './PdfGenerator';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Predictions() {
  const data = useAstrologyStore();
  const chartsCount = Object.values(data.charts).filter(Boolean).length;
  const activeDoshas = Object.entries(data.doshas).filter(([_, v]) => v).map(([k]) => k);

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Finalize Report</h2>
        <p className="text-gray-500 text-sm">Review your data and generate the final Kundli PDF.</p>
      </div>
      
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border border-[#B8860B]/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-10 -top-10 text-[#B8860B]/5">
          <FileText size={200} />
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-serif text-[#0F172A] mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#B8860B]"></span>
            Report Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className={`p-2 rounded-full ${data.profile.name ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                {data.profile.name ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Consultant</p>
                <p className="text-[#0F172A] font-medium">{data.profile.name || 'Not set'}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className={`p-2 rounded-full ${chartsCount > 0 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                {chartsCount > 0 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Charts Uploaded</p>
                <p className="text-[#0F172A] font-medium">{chartsCount} / 6</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Dasha Periods</p>
                <p className="text-[#0F172A] font-medium">{data.dashas.length} entries</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Active Doshas</p>
                <p className="text-[#0F172A] font-medium capitalize">{activeDoshas.join(', ') || 'None'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <PDFDownloadLink 
              document={<KundliPDF data={data} />} 
              fileName="kundli_report.pdf"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white px-8 py-4 rounded-xl font-medium shadow-[0_4px_20px_rgba(184,134,11,0.3)] hover:shadow-[0_6px_25px_rgba(184,134,11,0.4)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {({ loading }) => (
                <>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <FileText size={20} className="relative z-10" />
                  <span className="relative z-10">{loading ? 'Generating PDF...' : 'Download Premium Report'}</span>
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
}
