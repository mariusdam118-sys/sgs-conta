'use client';

import { motion } from 'framer-motion';
import { Calculator, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const services = [
  {
    title: 'Contabilitate Generală',
    description: 'Gestionare completă a documentelor financiar-contabile, raportări periodice și bilanțuri anuale conforme cu standardele în vigoare.',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Consultanță Fiscală CCF',
    description: 'Optimizare fiscală și reprezentare în fața autorităților prin experți autorizați CCF - Camera Consultanților Fiscali.',
    icon: ShieldCheck,
    color: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    title: 'Salarizare & HR',
    description: 'Administrare personal, calcul salarial (REVISAL), contracte de muncă și consultanță legislativă în domeniul resurselor umane.',
    icon: Users,
    color: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    title: 'Analiză și Strategie',
    description: 'Dashboard-uri personalizate pentru monitorizarea cash-flow-ului și previzionarea direcțiilor de dezvoltare ale business-ului.',
    icon: TrendingUp,
    color: 'bg-emerald-500/10 text-emerald-600',
  },
];

export default function Services() {
  return (
    <section id="servicii" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl space-y-4">
            <h4 className="text-royal font-bold tracking-[0.2em] uppercase text-sm">Expertiză</h4>
            <h2 className="text-4xl md:text-5xl font-black text-navy leading-tight">
              Soluții Contabile <br /> Construite pentru <span className="text-royal">Performanță.</span>
            </h2>
          </div>
          <p className="text-navy/60 max-w-sm md:text-right">
            Acoperim tot spectrul financiar pentru a vă permite să vă concentrați exclusiv pe creșterea afacerii.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[32px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-royal/10 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
