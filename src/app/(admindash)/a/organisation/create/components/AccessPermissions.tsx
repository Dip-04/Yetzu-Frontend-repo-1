import React from 'react';
import { AlertCircle } from 'lucide-react';

type AccessPermissionsProps = {
  permissions: Record<string, boolean>;
  limits: Record<string, number | null>;
  onPermissionsChange: (permissions: Record<string, boolean>) => void;
  onLimitsChange: (limits: Record<string, number | null>) => void;
  errors?: string[];
};

const featureLabels: Record<string, string> = {
  webinars: 'Webinars',
  cohorts: 'Cohorts',
  mentorship: '1:1 Mentorship',
  certification_courses: 'Certification Courses',
  assignments: 'Assignments',
};

export default function AccessPermissions({ permissions, limits, onPermissionsChange, onLimitsChange, errors }: AccessPermissionsProps) {
  const toggle = (code: string) => {
    onPermissionsChange({ ...permissions, [code]: !permissions[code] });
  };

  const setLimit = (code: string, value: string) => {
    onLimitsChange({ ...limits, [code]: value ? Number(value) : null });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
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
          <h2 className="text-xl font-bold text-slate-900">Access & Permissions</h2>
          <p className="text-sm text-gray-500">Set default permissions for the organization's users.</p>
        </div>

        <div className="space-y-2 pt-2">
          {Object.entries(featureLabels).map(([code, label]) => (
            <div key={code} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-800">{label}</span>
                {permissions[code] && (
                  <input
                    type="number"
                    placeholder="Limit"
                    value={limits[code] ?? ''}
                    onChange={(e) => setLimit(code, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>
              <button
                onClick={() => toggle(code)}
                className={`w-[36px] h-5 rounded-full relative transition-colors ${permissions[code] ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`w-[14px] h-[14px] rounded-full bg-white absolute top-[3px] transition-all shadow-sm ${permissions[code] ? 'left-[19px]' : 'left-[3px]'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
