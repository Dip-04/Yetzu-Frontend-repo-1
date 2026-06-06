import React from 'react';
import { Plus } from 'lucide-react';

interface CouponHeaderProps {
  onNewCoupon: () => void;
}

export default function CouponHeader({ onNewCoupon }: CouponHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Coupon Management</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Boost sales by giving customers special offers and discounts.
        </p>
      </div>
      
      <button 
        onClick={onNewCoupon}
        className="flex items-center gap-2 bg-[#0F172B] hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        New Coupon
      </button>
    </div>
  );
}
