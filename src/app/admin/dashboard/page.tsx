'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/src/lib/supabase';
import { 
  getContactMessages, 
  markMessageAsRead as markAsReadAction, 
  deleteMessage as deleteMessageAction 
} from '@/src/lib/actions';
import { 
  LogOut, 
  Mail, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  LayoutDashboard,
  Search,
  Users as UsersIcon,
  Globe,
  FileEdit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }
      fetchMessages();
    };

    checkAuth();
  }, [router]);

  const fetchMessages = async () => {
    setLoading(true);
    const result = await getContactMessages();

    if (!result.success) {
      console.error('Error fetching messages:', result.error);
    } else {
      setMessages(result.data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const markAsRead = async (id: string) => {
    const result = await markAsReadAction(id);

    if (result.success) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest mesaj?')) return;

    const result = await deleteMessageAction(id);

    if (result.success) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(filter.toLowerCase()) || 
    m.email.toLowerCase().includes(filter.toLowerCase()) ||
    m.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ice/40 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-navy text-white p-8 hidden md:flex flex-col fixed h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-royal rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4">Meniu</p>
            <Link 
              href="/admin/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 bg-royal/20 text-cyan-glow rounded-xl font-bold text-sm transition-all"
            >
              <Mail size={18} />
              Lead-uri Contact
            </Link>
            <Link 
              href="/admin/dashboard/users"
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all"
            >
              <UsersIcon size={18} />
              Gestionare Utilizatori
            </Link>
            <Link 
              href="/admin/dashboard/content"
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all"
            >
              <FileEdit size={18} />
              Editare Conținut
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-2">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4">Sistem</p>
            <Link 
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all"
            >
              <Globe size={18} />
              Înapoi la Site
            </Link>
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white transition-colors text-sm font-bold mt-auto"
        >
          <LogOut size={18} />
          Deconectare
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">Lead-uri Primite</h1>
            <p className="text-navy/40 font-medium">Gestionează mesajele primite prin formularul de contact.</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20" size={18} />
            <input 
              type="text"
              placeholder="Caută în mesaje..."
              className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-3 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] text-center space-y-4 border border-gray-100 italic">
            <Mail className="mx-auto text-navy/10" size={64} />
            <p className="text-navy/40">Nu a fost găsit niciun mesaj.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white p-8 rounded-[32px] border ${msg.is_read ? 'border-gray-100 opacity-80' : 'border-royal/20 shadow-xl shadow-royal/5'} transition-all`}
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-ice px-3 py-1 rounded-full text-xs font-bold text-navy">
                          <User size={14} className="text-royal" />
                          {msg.name}
                        </div>
                        <div className="flex items-center gap-2 bg-ice px-3 py-1 rounded-full text-xs font-bold text-navy">
                          <Mail size={14} className="text-royal" />
                          {msg.email}
                        </div>
                        <div className="flex items-center gap-2 bg-ice px-3 py-1 rounded-full text-xs font-bold text-navy">
                          <Phone size={14} className="text-royal" />
                          {msg.phone}
                        </div>
                        <div suppressHydrationWarning className="flex items-center gap-2 bg-ice px-3 py-1 rounded-full text-xs font-bold text-navy">
                          <Clock size={14} className="text-royal" />
                          {new Date(msg.created_at).toLocaleString('ro-RO')}
                        </div>
                      </div>

                      <div className="bg-ice/50 p-6 rounded-2xl border border-gray-50 flex gap-4">
                        <MessageSquare className="text-navy/20 shrink-0" size={20} />
                        <p className="text-navy/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-3 justify-end">
                      {!msg.is_read && (
                        <button 
                          onClick={() => markAsRead(msg.id)}
                          className="flex items-center gap-2 bg-royal/10 text-royal px-4 py-2 rounded-xl text-xs font-bold hover:bg-royal hover:text-white transition-all"
                        >
                          <CheckCircle size={14} />
                          Marchează Citit
                        </button>
                      )}
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                        Șterge
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
