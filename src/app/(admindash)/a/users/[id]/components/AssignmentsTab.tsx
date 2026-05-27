import React, { useEffect, useState } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  MoreVertical,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { AdminAPI, asArray } from "@/lib/api";

interface AssignmentsTabProps {
  user: any;
}

export default function AssignmentsTab({ user }: AssignmentsTabProps) {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const response = await AdminAPI.getSessions({ page: 1, limit: 100 });
        const allSessions = asArray(response?.data?.list || response?.data || response);
        
        // Filter sessions where student is enrolled
        const studentSessions = allSessions.filter((session: any) => 
          asArray(session.students).includes(user.id)
        );
        
        // Extract assignments from those sessions
        const allAssignments = studentSessions.flatMap(session => 
          asArray(session.assignments).map(asm => ({
            ...asm,
            sessionTitle: session.title,
            sessionCode: session.sessionCode
          }))
        );
        
        setAssignments(allAssignments);
      } catch (error) {
        console.error("Failed to fetch assignments for student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
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
        <h3 className="text-xl font-bold text-[#021165] tracking-tight">Assignments</h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Total: {assignments.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assignment</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {assignments.length > 0 ? (
              assignments.map((asm) => (
                <tr key={asm.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#021165]">{asm.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {asm.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-600">{asm.sessionTitle}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{asm.sessionCode}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">
                        {asm.dueDate ? new Date(asm.dueDate).toLocaleDateString() : 'No deadline'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      asm.status === 'submitted' || asm.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {asm.status === 'submitted' || asm.status === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {asm.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600" title="View Submission">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600" title="Add Comment">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-100">
                    <FileText className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">No assignments found</p>
                  <p className="text-xs text-slate-500 font-medium">This student hasn't been assigned any tasks yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
