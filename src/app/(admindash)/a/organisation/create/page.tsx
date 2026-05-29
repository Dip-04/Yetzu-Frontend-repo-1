"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';

import ProgressBar from './components/ProgressBar';
import BasicInfo from './components/BasicInfo';
import AdminDetails from './components/AdminDetails';
import StudentImport from './components/StudentImport';
import AccessPermissions from './components/AccessPermissions';
import BillingDetails from './components/BillingDetails';
import ReviewCreate from './components/ReviewCreate';

const defaultPermissions = [
  { code: "webinars", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "cohorts", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "mentorship", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "certification_courses", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "assignments", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
];

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^.{2,}$/;

  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push('Organization name is required');
        else if (!NAME_REGEX.test(formData.name.trim())) errors.push('Organization name must be at least 2 characters');
        if (!formData.type) errors.push('Organization type is required');
        if (!formData.email.trim()) errors.push('Email address is required');
        else if (!EMAIL_REGEX.test(formData.email.trim())) errors.push('Enter a valid email address (e.g. name@domain.com)');
        break;
      case 2:
        if (!adminData.name.trim()) errors.push('Primary admin name is required');
        else if (!NAME_REGEX.test(adminData.name.trim())) errors.push('Admin name must be at least 2 characters');
        if (!adminData.email.trim()) errors.push('Admin email is required');
        else if (!EMAIL_REGEX.test(adminData.email.trim())) errors.push('Enter a valid admin email address');
        break;
      case 3:
        if (students.length > 0) {
          students.forEach((s, i) => {
            if (!s.name.trim()) errors.push(`Student ${i + 1}: Name is required`);
            if (!s.email.trim()) errors.push(`Student ${i + 1}: Email is required`);
            else if (!EMAIL_REGEX.test(s.email.trim())) errors.push(`Student ${i + 1}: Enter a valid email address`);
          });
        }
        break;
      case 5:
        if (!billingData.basePrice || billingData.basePrice <= 0) errors.push('Base price must be greater than 0');
        break;
    }
    return errors;
  };

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    emailDomain: '',
    location: '',
    description: '',
  });

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    roleTitle: '',
    phoneCode: '+1',
  });

  const [students, setStudents] = useState<Array<{ name: string; email: string; password: string; mobileNo: string }>>([]);
  const [importMethod, setImportMethod] = useState<'manual' | 'csv'>('manual');

  const [permissions, setPermissions] = useState(defaultPermissions);
  const [permissionToggles, setPermissionToggles] = useState({
    webinars: false,
    cohorts: false,
    mentorship: false,
    certification_courses: false,
    assignments: false,
  });
  const [permissionLimits, setPermissionLimits] = useState<Record<string, number | null>>({
    webinars: null,
    cohorts: null,
    mentorship: null,
    certification_courses: null,
    assignments: null,
  });

  const [billingData, setBillingData] = useState({
    model: 'flat',
    pricingType: 'fixed',
    basePrice: 50000,
    currency: 'USD',
    billingCycle: 'monthly',
    paymentMethod: 'credit',
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceId: '',
    amount: 0,
    currency: 'USD',
    invoiceDate: '',
    paymentDate: '',
    paymentMethod: '',
    billingCycle: 'monthly',
    planType: '',
    paymentStatus: 'pending',
    nextBillingDate: '',
  });

  const totalSteps = 6;

  const updateFormData = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    if (currentStep < totalSteps) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    setStepErrors([]);
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfo formData={formData} onChange={updateFormData} errors={stepErrors} />;
      case 2: return <AdminDetails data={adminData} onChange={setAdminData} errors={stepErrors} />;
      case 3: return <StudentImport method={importMethod} onMethodChange={setImportMethod} students={students} onStudentsChange={setStudents} errors={stepErrors} />;
      case 4: return <AccessPermissions permissions={permissionToggles} limits={permissionLimits} onPermissionsChange={(p) => setPermissionToggles(p as any)} onLimitsChange={(l) => setPermissionLimits(l as any)} errors={stepErrors} />;
      case 5: return <BillingDetails data={billingData} onChange={setBillingData} errors={stepErrors} />;
      case 6: return <ReviewCreate
        formData={formData}
        adminData={adminData}
        students={students}
        importMethod={importMethod}
        permissions={permissionToggles}
        billingData={billingData}
        errors={stepErrors}
      />;
      default: return <BasicInfo formData={formData} onChange={updateFormData} />;
    }
  };

  const buildPermissionsPayload = () => {
    return defaultPermissions.map((p) => ({
      ...p,
      enabled: permissionToggles[p.code as keyof typeof permissionToggles] || false,
      limit: permissionLimits[p.code as keyof typeof permissionLimits] || null,
    }));
  };

  const handleCreateOrganization = async () => {
    try {
      setIsSubmitting(true);

      const accessPermissions = buildPermissionsPayload();
      const studentList = students.length > 0
        ? students.map(s => ({
            name: s.name.trim(),
            email: s.email.trim(),
            password: s.password || 'Pass123!',
            ...(s.mobileNo.trim() ? { mobileNo: s.mobileNo.trim() } : {}),
          }))
        : [{ name: 'Demo Student', email: 'demo@org.local', password: 'Pass123!' }];

      await AdminAPI.createOrganization({
        name: formData.name.trim(),
        organizationName: formData.name.trim(),
        type: formData.type,
        email: formData.email.trim(),
        status: 'active',
        billingCycle: billingData.billingCycle,
        primaryContactName: adminData.name.trim() || formData.name.trim(),
        adminEmail: adminData.email.trim() || formData.email.trim(),
        phoneCode: adminData.phoneCode || '+1',
        mobileNo: adminData.mobileNo || '',
        roleTitle: adminData.roleTitle || 'owner',
        accessPlan: 'basic',
        location: formData.location || '',
        description: formData.description || '',
        students: studentList,
        accessPermissions,
        invoice: {
          amount: billingData.basePrice || 0,
          currency: billingData.currency || 'INR',
          billingCycle: billingData.billingCycle,
          paymentStatus: 'pending',
        },
        payment: {
          amount: billingData.basePrice || 0,
          currency: billingData.currency || 'INR',
          paymentMethod: billingData.paymentMethod || 'credit',
          paymentStatus: 'pending',
        },
      });
      router.push('/a/organisation/all');
    } catch (error: any) {
      console.error('Failed to create organization:', error);
      alert(error?.message || 'Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col relative pb-24">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link href="/a/organisation" className="flex items-center gap-2 text-slate-800 font-bold hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-lg">Create Organisation</span>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white border-b border-gray-100">
        <ProgressBar currentStep={currentStep} />
      </div>

      {/* Form Content Wrapper */}
      <div className="flex-1 w-full bg-[#fcfcfc] py-8 px-4">
        {renderStep()}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 right-0 md:left-[260px] left-0 bg-white border-t border-gray-100 p-4 md:px-8 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <div>
            {currentStep > 1 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
            
            {currentStep === totalSteps ? (
              <button onClick={handleCreateOrganization} disabled={isSubmitting} className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60">
                {isSubmitting ? 'Creating...' : 'Create Organization'}
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="px-8 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
