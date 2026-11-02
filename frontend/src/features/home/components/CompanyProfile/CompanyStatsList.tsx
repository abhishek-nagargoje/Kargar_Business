import { MapPin, Layers, ClipboardCheck, Award } from 'lucide-react';

export function CompanyStatsList() {
  // Factual descriptors from the Company Profile (p.10, p.17-18) and Brochure (p.2), not marketing counts.
  const stats = [
    { icon: MapPin, value: "Pune", label: "Head Office in Baner" },
    { icon: Layers, value: "Soft + Hard", label: "Integrated Services" },
    { icon: ClipboardCheck, value: "PURNA", label: "Operating Protocol" },
    { icon: Award, value: "2024", label: "Woman Startup Award" },
  ];

  return (
    <div className="w-full h-auto sm:h-[110px] bg-[#FFFFFF] rounded-[16px] border border-[#F3F4F6] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between px-[40px] py-[24px] sm:py-0 gap-[24px] sm:gap-0 mt-auto transition-transform hover:-translate-y-[2px]">
      
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="flex flex-row items-center gap-[16px] flex-1 justify-start sm:justify-center w-full sm:w-auto relative group">
            
            <div className="flex-shrink-0 w-[48px] h-[48px] rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#A74423] transition-transform group-hover:scale-105">
              <Icon size={24} strokeWidth={2} />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[28px] font-[800] text-[#111827] leading-none mb-[4px]">{stat.value}</span>
              <span className="text-[14px] text-[#6B7280] font-[500] leading-none">{stat.label}</span>
            </div>

            {/* Separator line for all but the last item (desktop only) */}
            {idx < stats.length - 1 && (
              <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[40px] bg-[#E5E7EB]" />
            )}
          </div>
        );
      })}

    </div>
  );
}
