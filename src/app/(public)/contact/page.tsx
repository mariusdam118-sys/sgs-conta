'use client';

import ContactForm from '@/src/components/ContactForm';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getSiteContent } from '@/src/lib/actions';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(res => {
      if (res.success) setContent(res.content.contact);
    });
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 bg-ice/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-royal font-bold tracking-[0.2em] uppercase text-sm"
            >
              Contact
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-navy leading-none tracking-tighter"
            >
              {content?.hero_title || 'Să discutăm despre'} <br /> <span className="text-royal">{content?.hero_title ? '' : 'viitorul tău.'}</span>
            </motion.h1>
            <p className="text-navy/60 text-lg max-w-md">
              {content?.hero_desc || 'Indiferent de mărimea afacerii tale, suntem aici să îți oferim suportul contabil și fiscal de care ai nevoie.'}
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-navy font-bold uppercase text-xs tracking-wider">
              <MapPin className="w-5 h-5 text-royal" />
              Adresă
            </div>
            <p className="text-navy/60 text-xs italic">Sos. Pantelimon, Nr.285A, Bl.11a, Sc.1, Et.8, Ap.42, Sector 2</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-navy font-bold uppercase text-xs tracking-wider">
              <Phone className="w-5 h-5 text-royal" />
              Telefon
            </div>
            <a href={`tel:${(content?.phone || '0722 80 21 21').replace(/\s/g, '')}`} className="text-navy/60 text-sm italic hover:text-royal transition-colors">
              {content?.phone || '0722 80 21 21'}
            </a>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-navy font-bold uppercase text-xs tracking-wider">
              <MapPin className="w-5 h-5 text-royal invisible" />
              <Mail className="w-5 h-5 text-royal absolute" />
              Email
            </div>
            <a href={`mailto:${content?.email || 'sgsconta@gmail.com'}`} className="text-navy/60 text-sm italic hover:text-royal transition-colors">
              {content?.email || 'sgsconta@gmail.com'}
            </a>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-navy font-bold uppercase text-xs tracking-wider">
              <Clock className="w-5 h-5 text-royal" />
              Program
            </div>
            <div className="text-navy/60 text-sm italic">
              L-V: 10:00 - 18:00 <br />
              S: 09:30 - 14:30
            </div>
          </div>
        </div>

        {/* Map Embed Placeholder */}
        <div className="w-full aspect-video bg-navy/5 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-inner relative">
            <div className="absolute inset-0 flex items-center justify-center text-navy/20 font-bold uppercase tracking-widest text-sm">
              Google Maps Embed Here
            </div>
            <iframe
              title="Locație sgsconta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8105574034!2d26.1030372!3d44.4371199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff394da688a7%3A0xe543598d68965646!2sPia%C8%9Ba%20Universit%C4%83%C8%9Bii!5e0!3m2!1sro!2sro!4v1713732069248!5m2!1sro!2sro"
              className="w-full h-full border-0 brightness-100 grayscale-[0.5]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="relative">
          <ContactForm />
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-royal/10 blur-[100px] rounded-full hidden lg:block" />
        </div>
      </div>
    </main>
  );
}
