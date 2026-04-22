import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-ice to-transparent opacity-50" />
      <div className="absolute top-1/2 -left-20 -z-10 w-96 h-96 bg-royal/10 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-royal/5 border border-royal/10 text-royal px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-royal"></span>
            </span>
            Autorizați CCF - Camera Consultanților Fiscali
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-navy leading-[1.05] tracking-tighter"
          >
            Excelență în <br />
            <span className="text-royal">Cifre.</span> <br />
            Viziune în <span className="text-cyan-glow">Afaceri.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-navy/70 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Oferim servicii premium de contabilitate, consultanță fiscală și management de personal, adaptate nevoilor dinamice ale afacerii dumneavoastră.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              href="/contact"
              className="bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-royal transition-all group shadow-xl shadow-navy/20"
            >
              Contactează-ne
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#servicii"
              className="px-8 py-4 rounded-full font-bold text-navy hover:bg-navy/5 transition-colors border border-navy/10"
            >
              Vezi Servicii
            </Link>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 aspect-square rounded-[40px] overflow-hidden shadow-2xl shadow-royal/30"
          >
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1920"
              alt="Professional Accounting"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-navy/10 mix-blend-multiply" />
          </motion.div>
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-glow/20 blur-3xl rounded-full" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-royal/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
