'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Users, 
  ArrowRight, 
  Clock, 
  Trophy,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'contabilitate',
    title: 'Contabilitate',
    subtitle: 'Gestiune completă și raportare transparentă',
    icon: Calculator,
    description: 'Oferim servicii complete de evidență contabilă, adaptate specificului afacerii dumneavoastră, asigurând conformitatea cu toate reglementările în vigoare.',
    details: [
      'Înregistrarea cronologică a articolelor contabile',
      'Întocmirea balanței de verificare lunare',
      'Calculul impozitelor și întocmirea declarațiilor fiscale',
      'Efectuarea bilanțului contabil semestrial și anual',
      'Consultanță privind organizarea contabilității primare'
    ]
  },
  {
    id: 'hr',
    title: 'Salarizare & HR',
    subtitle: 'Administrare personal și calcul fără erori',
    icon: Users,
    description: 'Gestionăm întregul proces de salarizare și administrare de personal, oferindu-vă siguranța unor calcule corecte și a respectării legislației muncii.',
    details: [
      'Calculul statelor de plată și a contribuțiilor sociale',
      'Gestionarea registrului general de evidență a salariaților (REVISAL)',
      'Întocmirea și depunerea declarației 112',
      'Administrarea dosarelor de personal',
      'Consultanță privind legislația muncii și salarizare'
    ]
  },
  {
    id: 'consultanta',
    title: 'Consultanță Fiscală',
    subtitle: 'Expertiză CCF pentru optimizare sigură',
    icon: ShieldCheck,
    description: 'Specialiștii noștri autorizați CCF vă oferă soluții strategice pentru optimizarea poverii fiscale, respectând în totalitate cadrul legal.',
    details: [
      'Analiza structurii fiscale a afacerii.',
      'Optimizarea impozitelor și taxelor.',
      'Asistență în timpul controalelor fiscale.',
      'Consultanță privind TVA și accize.',
      'Planificare fiscală internațională.'
    ]
  }
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <main className="pt-2">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 min-h-[calc(100vh-100px)]">
        
        {/* Main Hero Card - 8x4 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-8 md:row-span-4 bg-linear-to-tr from-navy to-royal rounded-[2.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col justify-end group min-h-100"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-300 font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
            >
              Partenerul tău în succes financiar
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-6 uppercase"
            >
              Excelență în <br/> Consultanță <br/> <span className="text-cyan-300 italic">Fiscală CCF</span>
            </motion.h1>
            <p className="max-w-md text-base md:text-lg text-blue-100 font-light leading-relaxed mb-8">
              Expertiză contabilă de înaltă precizie pentru afaceri vizionare. Suntem autorizați CCF și dedicați succesului tău.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-full font-bold hover:bg-cyan-300 transition-all hover:scale-105 active:scale-95"
              >
                Începe Acum
                <ChevronRight size={20} />
              </Link>
              <button
                onClick={() => setSelectedService(services.find(s => s.id === 'consultanta') || null)}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Detalii CCF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Service Card 1 - Contabilitate */}
        <motion.div 
          onClick={() => setSelectedService(services[0])}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-4 md:row-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm hover:border-royal transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-royal group-hover:text-white transition-colors">
              <Calculator className="w-8 h-8 text-royal group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">01. Servicii Core</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy mb-1">{services[0].title}</h3>
            <p className="text-navy/50 text-sm italic">{services[0].subtitle}</p>
          </div>
        </motion.div>

        {/* Service Card 2 - HR */}
        <motion.div 
          onClick={() => setSelectedService(services[1])}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-4 md:row-span-2 bg-slate-100 border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm hover:border-cyan-400 transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-cyan-100 rounded-2xl group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Users className="w-8 h-8 text-cyan-600 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">02. People & HR</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy mb-1">{services[1].title}</h3>
            <p className="text-navy/50 text-sm italic">{services[1].subtitle}</p>
          </div>
        </motion.div>

        {/* Business Hours Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-4 md:row-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-center gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Program de Lucru</div>
          </div>
          <div className="space-y-3 font-medium text-sm">
            <div className="flex justify-between">
              <span className="text-navy/40">Luni - Vineri</span>
              <span className="text-navy font-bold">10:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy/40">Sâmbătă</span>
              <span className="text-navy font-bold">09:30 - 14:30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy/40">Duminică</span>
              <span className="text-red-500 font-bold uppercase text-[10px] bg-red-50 px-2 py-1 rounded">Închis</span>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="md:col-span-5 md:row-span-2 bg-navy text-white rounded-[2rem] p-8 flex items-center justify-between shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Ai o întrebare?</p>
            <h4 className="text-3xl font-black leading-none uppercase">Pregătit să <br/> colaborăm?</h4>
            <p className="text-blue-200 text-[10px] opacity-60 leading-tight">Sos. Pantelimon, Nr.285A, Bl.11a, Sc.1, Et.8, Ap.42, Sector 2</p>
          </div>
          <Link 
            href="/contact"
            className="w-16 h-16 bg-royal rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer relative z-10 border-4 border-white/10"
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </Link>
          <div className="absolute top-0 right-0 w-32 h-32 bg-royal/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Affiliation Card */}
        <motion.div 
          onClick={() => setSelectedService(services[2])}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="md:col-span-3 md:row-span-2 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white transition-all shadow-sm group"
        >
          <div className="p-3 bg-white shadow-sm rounded-xl group-hover:bg-royal group-hover:text-white transition-colors">
             <ShieldCheck size={28} className="text-navy group-hover:text-white" />
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Membru Afiliat</div>
          <div className="text-xs font-black text-navy leading-tight uppercase">
            CCF - CAMERA <br/> CONSULTANȚILOR <br/> FISCALI
          </div>
        </motion.div>

      </div>

      {/* Modal for Service Details */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-navy/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-ice rounded-full flex items-center justify-center text-navy hover:bg-royal hover:text-white transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10 md:p-14 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-royal/10 rounded-3xl flex items-center justify-center text-royal shrink-0">
                    <selectedService.icon size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tighter leading-[0.9] mb-2">{selectedService.title}</h2>
                    <p className="text-royal font-bold text-xs uppercase tracking-widest leading-normal">{selectedService.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-navy/70 text-lg leading-relaxed italic">
                    {selectedService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedService.details.map((detail, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 p-4 bg-ice rounded-2xl border border-slate-100"
                    >
                      <div className="w-2 h-2 rounded-full bg-royal mt-1.5 shrink-0" />
                      <p className="text-navy/70 text-sm font-medium">{detail}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6">
                  <Link
                    href="/contact"
                    className="w-full bg-navy text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-royal transition-all shadow-xl shadow-navy/20 active:scale-[0.98]"
                    onClick={() => setSelectedService(null)}
                  >
                    Cere Ofertă Personalizată
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Why Us / Content Section */}
      <section id="despre" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
           <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm">
                <div className="space-y-6">
                  <h4 className="text-royal font-bold tracking-[0.2em] uppercase text-xs">Viziunea Noastră</h4>
                  <h2 className="text-4xl md:text-5xl font-black text-navy leading-none uppercase">
                    Încrederea se construiește pe <span className="text-royal italic">Transparență.</span>
                  </h2>
                  <p className="text-navy/50 leading-relaxed italic max-w-xl">
                    Fiecare client beneficiază de un expert dedicat și soluții tehnologice de ultimă oră pentru a asigura o creștere sănătoasă a business-ului.
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center items-center text-center gap-4">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-royal" />
                 </div>
                 <div>
                    <p className="text-4xl font-black text-navy leading-none">15+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Ani de Excelență</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
