import React from 'react';
import { Download, Plus } from 'lucide-react';

const SummaryCard = ({ value, label, valueColor }: { value: string, label: string, valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
    <div className="text-xs text-gray-500 font-medium">{label}</div>
  </div>
);

const formatCurrency = (amount: number) => `$${(amount || 0).toLocaleString()}`;

export default function BillingTab({ billingCycle, revenue, invoices: propInvoices, payments }: { billingCycle?: string; revenue?: number; invoices?: any[]; payments?: any[] }) {
  const invoices = (propInvoices && propInvoices.length > 0) ? propInvoices : [];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard value={formatCurrency(revenue || 0)} label="Total Revenue" valueColor="text-green-500" />
        <SummaryCard value="$0" label="Pending Payment" valueColor="text-orange-500" />
        <SummaryCard value="N/A" label="Last Payment" valueColor="text-blue-500" />
        <SummaryCard value={(billingCycle || 'N/A').charAt(0).toUpperCase() + (billingCycle || '').slice(1)} label="Billing Cycle" valueColor="text-purple-500" />
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Invoices</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              Download Invoices
            </button>
            <button className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              Record Payment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[15%]">Invoice ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Amount</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[15%]">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Issue Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Due Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[10%] text-center">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv: any, idx: number) => {
                const id = inv.invoiceId || inv.id || inv.Id || inv.invoice_id || `INV-${idx}`;
                const amount = inv.amount || inv.Amount || 0;
                const currency = inv.currency || inv.Currency || '$';
                const displayAmount = typeof amount === 'number' ? `${currency}${amount.toLocaleString()}` : amount;
                const status = inv.paymentStatus || inv.status || inv.Status || 'Pending';
                const issueDate = inv.invoiceDate || inv.issueDate || inv.IssueDate || inv.createdAt || '';
                const dueDate = inv.dueDate || inv.DueDate || inv.paymentDate || '';
                const displayIssue = issueDate ? new Date(issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
                const displayDue = dueDate ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';

                return (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    {id}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">
                    {displayAmount}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-semibold ${
                      String(status).toLowerCase() === 'paid' ? 'text-green-500 bg-green-50' : 'text-orange-500 bg-orange-50'
                    } px-2 py-1 rounded inline-flex`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {displayIssue}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {displayDue}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors inline-block">
                      <Download className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
