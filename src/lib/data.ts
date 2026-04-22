import { 
  Calculator, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  FileText, 
  Briefcase 
} from 'lucide-react';

export const services = [
  {
    id: 'contabilitate',
    title: 'Contabilitate Generală',
    description: 'Gestionare completă a documentelor financiar-contabile conform standardelor în vigoare.',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-600',
    details: [
      'Înregistrarea cronologică a articolelor contabile',
      'Întocmirea balanței de verificare lunare',
      'Calculul impozitelor și întocmirea declarațiilor fiscale',
      'Efectuarea bilanțului contabil semestrial și anual',
      'Consultanță privind organizarea contabilității primare'
    ]
  },
  {
    id: 'consultanta',
    title: 'Consultanță Fiscală CCF',
    description: 'Optimizare fiscală și reprezentare prin experți autorizați CCF.',
    icon: ShieldCheck,
    color: 'bg-indigo-500/10 text-indigo-600',
    details: [
      'Analiza structurii fiscale a afacerii',
      'Optimizarea impozitelor și taxelor',
      'Asistență în timpul controalelor fiscale',
      'Consultanță privind TVA și accize',
      'Planificare fiscală strategică'
    ]
  },
  {
    id: 'hr',
    title: 'Salarizare & HR',
    description: 'Administrare personal, calcul salarial și consultanță legislativă.',
    icon: Users,
    color: 'bg-cyan-500/10 text-cyan-600',
    details: [
      'Calculul statelor de plată și a contribuțiilor',
      'Gestionarea REVISAL',
      'Întocmirea și depunerea declarației 112',
      'Administrarea dosarelor de personal',
      'Consultanță privind legislația muncii'
    ]
  },
  {
    id: 'analiza',
    title: 'Analiză și Strategie',
    description: 'Dashboard-uri personalizate pentru monitorizarea cash-flow-ului.',
    icon: TrendingUp,
    color: 'bg-emerald-500/10 text-emerald-600',
    details: [
      'Analiza indicatorilor de performanță (KPI)',
      'Previzionarea fluxului de numerar (Cash-flow)',
      'Bugetarea veniturilor și cheltuielilor',
      'Raportări manageriale personalizate',
      'Suport în luarea deciziilor strategice'
    ]
  },
  {
    id: 'audit',
    title: 'Audit Financiar',
    description: 'Evaluare independentă și obiectivă a situațiilor financiare.',
    icon: FileText,
    color: 'bg-orange-500/10 text-orange-600',
    details: [
      'Audit statutar al situațiilor financiare',
      'Audit intern și control de gestiune',
      'Certificarea bilanțurilor contabile',
      'Evaluarea riscurilor financiare',
      'Audit pentru proiecte cu finanțare europeană'
    ]
  },
  {
    id: 'infiintari',
    title: 'Înființări Firme',
    description: 'Suport complet pentru demararea noii tale afaceri.',
    icon: Briefcase,
    color: 'bg-purple-500/10 text-purple-600',
    details: [
      'Consultanță alegere formă juridică',
      'Redactare act constitutiv și documente ONRC',
      'Înregistrare în scopuri de TVA',
      'Obținere cod EORI',
      'Modificări acte societate (cesiuni, sedii, etc.)'
    ]
  }
];
