"use client";

import React, { useState } from 'react';
import ContactHeader from './components/ContactHeader';
import ContactTable from './components/ContactTable';
import ContactDetailsModal from './components/ContactDetailsModal';

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  return (
    <div className="w-full relative">
      <ContactHeader />
      <ContactTable onViewClick={(contact) => setSelectedContact(contact)} />

      <ContactDetailsModal 
        isOpen={selectedContact !== null}
        contactData={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
