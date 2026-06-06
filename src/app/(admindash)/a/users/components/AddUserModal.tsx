import React, { useState } from "react";
import { X, Check, Info, Mail, KeyRound } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (user: {
    name: string;
    email: string;
    password?: string;
    mobileno?: string;
    role: string;
    status: string;
    permissions: Record<string, boolean>;
    inviteMethod: "email_invite" | "temp_password";
    organizationId?: string;
    sendCredentialsEmail?: boolean;
    sendInviteEmail?: boolean;
    metadata?: Record<string, any>;
  }) => Promise<void> | void;
}

export function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
  const [addUserStep, setAddUserStep] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
    role: "Student",
    status: "active",
    inviteMethod: "email_invite" as "email_invite" | "temp_password",
    permissions: {
      viewSessions: false,
      submitAssignments: false,
      manageSessions: false,
      manageAssignments: false,
      viewAnalytics: false,
      manageUsers: false,
      manageBilling: false,
      manageSettings: false,
    },
  });

  const addUserSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Access Control" },
    { num: 3, label: "Permissions" },
    { num: 4, label: "Review" },
  ];

  const isStudent = newUser.role === "Student";

  const resetForm = () => {
    setAddUserStep(1);
    setNewUser({
      name: "",
      email: "",
      password: "",
      mobileno: "",
      role: "Student",
      status: "active",
      inviteMethod: "email_invite",
      permissions: {
        viewSessions: false,
        submitAssignments: false,
        manageSessions: false,
        manageAssignments: false,
        viewAnalytics: false,
        manageUsers: false,
        manageBilling: false,
        manageSettings: false,
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between relative">
          <div className="absolute left-12 right-12 top-1/2 h-0.5 -mt-[1px] bg-slate-100 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${((addUserStep - 1) / 3) * 100}%` }}
            />
          </div>
          {addUserSteps.map((step) => (
            <div key={step.num} className="flex items-center relative z-10 bg-white px-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 transition-colors ${
                  addUserStep > step.num
                    ? "bg-emerald-100 text-emerald-600"
                    : addUserStep === step.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {addUserStep > step.num ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
              </div>
              <span className={`text-sm font-medium ${addUserStep >= step.num ? "text-slate-900" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="p-8 h-[380px] overflow-y-auto">
          {addUserStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Yashwanth Kancharla"
                  value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="yashwanth@example.com"
                  value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile No.</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="+919876543210"
                  value={newUser.mobileno} onChange={(e) => setNewUser({ ...newUser, mobileno: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setNewUser({ ...newUser, role: "Student" })}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${newUser.role === "Student" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                    Student
                  </button>
                  <button onClick={() => setNewUser({ ...newUser, role: "Educator" })}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${newUser.role === "Educator" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                    Educator
                  </button>
                </div>
              </div>
            </div>
          )}

          {addUserStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Account Status</h3>
                <div className="flex gap-4">
                  {["Active", "Suspended"].map((s) => {
                    const val = s.toLowerCase();
                    return (
                      <button key={s} onClick={() => setNewUser({ ...newUser, status: val })}
                        className={`px-6 py-3 rounded-lg border text-sm font-medium transition-colors flex-1 ${newUser.status === val ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Invite Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "email_invite" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "email_invite"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Mail className={`w-5 h-5 ${newUser.inviteMethod === "email_invite" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Email Invite</span>
                  </button>
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "temp_password" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "temp_password"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <KeyRound className={`w-5 h-5 ${newUser.inviteMethod === "temp_password" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Temp Password</span>
                  </button>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-700">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    {newUser.inviteMethod === "email_invite"
                      ? "An invitation link will be sent to the user's email address. They will be prompted to create a password."
                      : "A temporary password will be generated and displayed in the review step. You can share it with the user securely."}
                  </p>
                </div>
              </div>

              {newUser.inviteMethod === "temp_password" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custom Password (optional)</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Leave blank to auto-generate"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {addUserStep === 3 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">
                Permissions for {newUser.role}
              </h3>
              <div className="space-y-1 border border-slate-200 rounded-lg p-2 bg-slate-50">
                {(isStudent
                  ? [
                      { key: "viewSessions", label: "View Sessions" },
                      { key: "submitAssignments", label: "Submit Assignments" },
                    ]
                  : [
                      { key: "manageSessions", label: "Manage Sessions" },
                      { key: "manageAssignments", label: "Manage Assignments" },
                      { key: "viewAnalytics", label: "View Analytics" },
                      { key: "manageUsers", label: "Manage Users" },
                      { key: "manageBilling", label: "Manage Billing" },
                      { key: "manageSettings", label: "Manage Settings" },
                    ]
                ).map((perm) => (
                  <div key={perm.key} className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-md shadow-sm">
                    <span className="text-sm font-medium text-slate-700">{perm.label}</span>
                    <button
                      onClick={() =>
                        setNewUser({
                          ...newUser,
                          permissions: {
                            ...newUser.permissions,
                            [perm.key]: !newUser.permissions[perm.key as keyof typeof newUser.permissions],
                          },
                        })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        newUser.permissions[perm.key as keyof typeof newUser.permissions] ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        newUser.permissions[perm.key as keyof typeof newUser.permissions] ? "left-6" : "left-1"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {addUserStep === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{newUser.email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Mobile</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.mobileno || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.role}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Invite Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "email_invite" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "email_invite"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Mail className={`w-5 h-5 ${newUser.inviteMethod === "email_invite" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Email Invite</span>
                  </button>
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "temp_password" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "temp_password"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <KeyRound className={`w-5 h-5 ${newUser.inviteMethod === "temp_password" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Temp Password</span>
                  </button>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-700">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    {newUser.inviteMethod === "email_invite"
                      ? "An invitation link will be sent to the user's email address. They will be prompted to create a password."
                      : "A temporary password will be generated and displayed in the review step. You can share it with the user securely."}
                  </p>
                </div>
              </div>

              {newUser.inviteMethod === "temp_password" && (
                <div className="bg-emerald-50 p-4 rounded-lg flex items-center gap-3 text-emerald-700">
                  <KeyRound className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-sm">
                    {newUser.password
                      ? `Custom password: ${newUser.password}`
                      : "A random password will be auto-generated."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
          <div>
            {addUserStep === 1 ? (
              <button onClick={() => { resetForm(); onClose(); }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                Cancel
              </button>
            ) : (
              <button onClick={() => setAddUserStep((p) => Math.max(1, p - 1))}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                &lt; Back
              </button>
            )}
          </div>
          <div>
            {addUserStep < 4 ? (
              <button onClick={() => setAddUserStep((p) => Math.min(4, p + 1))}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm">
                Continue
              </button>
            ) : (
              <button
                onClick={async () => {
                  const payload = {
                    name: newUser.name,
                    email: newUser.email,
                    mobileno: newUser.mobileno || undefined,
                    role: newUser.role.toLowerCase(),
                    status: newUser.status,
                    permissions: newUser.permissions,
                    inviteMethod: newUser.inviteMethod,
                    sendCredentialsEmail: newUser.inviteMethod === "temp_password" ? true : undefined,
                    sendInviteEmail: newUser.inviteMethod === "email_invite" ? true : undefined,
                    metadata: { source: "admin_panel" },
                  };

                  if (newUser.inviteMethod === "temp_password" && newUser.password) {
                    (payload as any).password = newUser.password;
                  }

                  await onSubmit?.(payload);
                  resetForm();
                  onClose();
                }}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm"
              >
                Add User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
