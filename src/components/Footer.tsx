import { Landmark, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Landmark className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white uppercase">
              sgs<span className="text-cyan-glow">conta</span>
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Partenerul dumneavoastră de încredere în succesul financiar. Oferim soluții complete de contabilitate și consultanță fiscală autorizată CCF.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-6">Servicii</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link href="/#servicii" className="hover:text-cyan-glow transition-colors">Contabilitate Generală</Link></li>
            <li><Link href="/#servicii" className="hover:text-cyan-glow transition-colors">Consultanță Fiscală CCF</Link></li>
            <li><Link href="/#servicii" className="hover:text-cyan-glow transition-colors">Salarizare & HR</Link></li>
            <li><Link href="/#servicii" className="hover:text-cyan-glow transition-colors">Audit Financiar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-6">Program de Lucru</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-glow" />
              <span>Luni - Vineri: 10:00 - 18:00</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-glow" />
              <span>Sâmbătă: 09:30 - 14:30</span>
            </li>
            <li className="flex items-center gap-3 italic">
              <Clock className="w-4 h-4 text-red-400" />
              <span>Duminică: Închis</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-6">Contact</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-cyan-glow" />
              <span>Sos. Pantelimon, Nr.285A, Bl.11a, Sc.1, Et.8, Ap.42, Sector 2, <br />București, România</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-glow" />
              <span>0722 80 21 21</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-glow" />
              <span>sgsconta@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center mt-10 text-white/40 text-xs gap-4">
        <p>© {currentYear} sgsconta. Toate drepturile rezervate.</p>
        <div className="flex gap-6">
          <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          <Link href="/politica-confidentialitate" className="hover:text-white transition-colors">Politică de Confidențialitate</Link>
          <Link href="/admin" className="hover:text-white transition-colors">Portal Admin</Link>
        </div>
      </div>
    </footer>
  );
}
