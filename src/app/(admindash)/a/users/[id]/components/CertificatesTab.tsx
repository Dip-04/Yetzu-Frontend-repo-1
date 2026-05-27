import React, { useEffect, useState } from "react";
import { 
  Award, 
  Download, 
  ExternalLink, 
  Search,
  Calendar
} from "lucide-react";
import { CertificateAPI, asArray } from "@/lib/api";

interface CertificatesTabProps {
  user: any;
}

export default function CertificatesTab({ user }: CertificatesTabProps) {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        // Since we are admin, we might need an admin version of this, 
        // but let's try the student one or simulate if it fails.
        const response = await CertificateAPI.admin.getCertificates({ page: 1, limit: 100 });
        const allCertificates = asArray(response?.data?.list || response?.data || response);
        
        // Filter for this student
        const studentCerts = allCertificates.filter((cert: any) => 
          cert.studentId === user.id || cert.userId === user.id
        );
        
        setCertificates(studentCerts);
      } catch (error) {
        console.error("Failed to fetch certificates for student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#021165] tracking-tight">Certificates</h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Earned: {certificates.length}
        </span>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
                  <Award className="w-7 h-7" />
                </div>
                
                <h4 className="text-sm font-black text-[#021165] mb-1 line-clamp-1">{cert.title || cert.courseName || 'Course Certificate'}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Issued on {new Date(cert.issuedDate || cert.createdAt).toLocaleDateString()}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <button className="flex-1 py-2 bg-[#F0F4FF] hover:bg-[#E0E7FF] text-[#021165] text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" /> Download
                  </button>
                  <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
            <Award className="w-8 h-8 text-slate-300" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">No certificates yet</h4>
          <p className="text-xs text-slate-500 font-medium">This student hasn't completed any certified courses yet.</p>
        </div>
      )}
    </div>
  );
}
