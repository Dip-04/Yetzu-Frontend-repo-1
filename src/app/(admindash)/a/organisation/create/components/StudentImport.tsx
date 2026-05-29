import React, { useRef } from 'react';
import { UploadCloud, X, Eye, AlertCircle } from 'lucide-react';

type Student = { name: string; email: string; password: string; mobileNo: string };

type StudentImportProps = {
  method: 'manual' | 'csv';
  onMethodChange: (method: 'manual' | 'csv') => void;
  students: Student[];
  onStudentsChange: (students: Student[]) => void;
  errors?: string[];
};

export default function StudentImport({ method, onMethodChange, students, onStudentsChange, errors }: StudentImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split('\n').filter(Boolean);
      const parsed = lines.slice(1).map(line => {
        const [name, email, password, mobileNo] = line.split(',').map(s => s.trim());
        return { name: name || '', email: email || '', password: password || '', mobileNo: mobileNo || '' };
      }).filter(s => s.name || s.email);
      onStudentsChange(parsed);
    };
    reader.readAsText(file);
  };

  const addStudent = () => {
    onStudentsChange([...students, { name: '', email: '', password: '', mobileNo: '' }]);
  };

  const removeStudent = (index: number) => {
    onStudentsChange(students.filter((_, i) => i !== index));
  };

  const updateStudent = (index: number, field: string, value: string) => {
    const updated = students.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    onStudentsChange(updated);
  };

  const missingRequired = (s: Student) => !s.name.trim() || !s.email.trim() || !s.password.trim();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>
        )}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Student Import</h2>
          <p className="text-sm text-gray-500">Choose how to import students. You can also skip this step.</p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Option 1: Manual */}
          <div
            onClick={() => onMethodChange('manual')}
            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              method === 'manual'
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center ${
                method === 'manual' ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {method === 'manual' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
              <div className="flex flex-col w-full">
                <span className={`text-sm font-bold ${method === 'manual' ? 'text-blue-700' : 'text-slate-700'}`}>
                  Add students manually
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Enter student details one by one
                </span>

                {method === 'manual' && (
                  <div className="mt-4 space-y-3">
                    {/* Table header */}
                    {students.length > 0 && (
                      <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">Name <span className="text-red-400">*</span></div>
                        <div className="col-span-3">Email <span className="text-red-400">*</span></div>
                        <div className="col-span-2">Password <span className="text-red-400">*</span></div>
                        <div className="col-span-2">Mobile No</div>
                        <div className="col-span-1" />
                      </div>
                    )}
                    {students.map((student, idx) => (
                      <div key={idx} className="md:grid md:grid-cols-12 md:gap-2 p-3 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2 md:space-y-0 md:items-center">
                        <div className="hidden md:flex col-span-1 text-xs font-semibold text-gray-400">
                          {idx + 1}
                        </div>
                        <div className="flex md:hidden justify-between items-center">
                          <span className="text-xs font-semibold text-gray-500">Student {idx + 1}</span>
                          <button onClick={() => removeStudent(idx)} className="text-gray-400 hover:text-red-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="col-span-3">
                          <input
                            placeholder="Name *"
                            value={student.name}
                            onChange={(e) => updateStudent(idx, 'name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              !student.name.trim() ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            placeholder="Email *"
                            type="email"
                            value={student.email}
                            onChange={(e) => updateStudent(idx, 'email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              !student.email.trim() ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            placeholder="Password *"
                            type="password"
                            value={student.password}
                            onChange={(e) => updateStudent(idx, 'password', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              !student.password.trim() ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            placeholder="Mobile No (optional)"
                            value={student.mobileNo}
                            onChange={(e) => updateStudent(idx, 'mobileNo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="hidden md:flex col-span-1 justify-center">
                          <button onClick={() => removeStudent(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={addStudent} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      + Add another student
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Option 2: CSV */}
          <div
            onClick={() => onMethodChange('csv')}
            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              method === 'csv'
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center ${
                method === 'csv' ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {method === 'csv' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
              <div className="flex flex-col w-full">
                <span className={`text-sm font-bold ${method === 'csv' ? 'text-blue-700' : 'text-slate-700'}`}>
                  Import via CSV
                </span>
                <span className="text-sm text-gray-500 mt-1 mb-4">
                  Bulk upload using a CSV file
                </span>

                {method === 'csv' && (
                  <>
                    <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileSelect} />

                    {students.length === 0 ? (
                      <div
                        className="w-full border border-dashed border-blue-200 bg-white rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-800 font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline mt-1">Select file</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Expected columns: <code className="bg-gray-50 px-1 rounded">Name, Email, Password, Mobile No</code>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Preview header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{students.length} student{students.length > 1 ? 's' : ''} parsed</span>
                          </div>
                          <button
                            onClick={() => { onStudentsChange([]); }}
                            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                          >
                            Clear & re-upload
                          </button>
                        </div>

                        {/* Preview table */}
                        <div className="overflow-x-auto border border-gray-100 rounded-xl">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Name <span className="text-red-400">*</span></th>
                                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Email <span className="text-red-400">*</span></th>
                                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Password <span className="text-red-400">*</span></th>
                                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Mobile No</th>
                                <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                              {students.map((s, idx) => (
                                <tr key={idx} className={`hover:bg-gray-50/50 ${missingRequired(s) ? 'bg-red-50/30' : ''}`}>
                                  <td className="px-3 py-2.5 text-xs text-gray-400 font-medium">{idx + 1}</td>
                                  <td className="px-3 py-2.5">
                                    <input
                                      value={s.name}
                                      onChange={(e) => updateStudent(idx, 'name', e.target.value)}
                                      className={`w-full px-2 py-1 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                        !s.name.trim() ? 'border-red-300' : 'border-gray-200'
                                      }`}
                                    />
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <input
                                      value={s.email}
                                      onChange={(e) => updateStudent(idx, 'email', e.target.value)}
                                      className={`w-full px-2 py-1 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                        !s.email.trim() ? 'border-red-300' : 'border-gray-200'
                                      }`}
                                    />
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <input
                                      value={s.password}
                                      onChange={(e) => updateStudent(idx, 'password', e.target.value)}
                                      className={`w-full px-2 py-1 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                        !s.password.trim() ? 'border-red-300' : 'border-gray-200'
                                      }`}
                                    />
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <input
                                      value={s.mobileNo}
                                      onChange={(e) => updateStudent(idx, 'mobileNo', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </td>
                                  <td className="px-3 py-2.5 text-right">
                                    <button onClick={() => removeStudent(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <p className="text-xs text-gray-400">
                          <span className="text-red-400">*</span> Required fields. You can edit cells inline.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
