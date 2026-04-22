'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { 
  listUsers, 
  inviteUser, 
  deleteUser, 
  changeUserPassword 
} from '@/src/lib/actions';
import { 
  UserPlus, 
  Trash2, 
  Key, 
  Mail, 
  User, 
  LayoutDashboard, 
  LogOut, 
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileEdit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }
      fetchUsers();
    };
    checkAuth();
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await listUsers();
    if (result.success) {
      setUsers(result.users || []);
    } else {
      setMessage({ text: 'Eroare la încărcarea utilizatorilor.', type: 'error' });
    }
    setLoading(false);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const result = await inviteUser(inviteEmail);
    if (result.success) {
      setMessage({ text: 'Invitație trimisă cu succes!', type: 'success' });
      setInviteEmail('');
      fetchUsers();
    } else {
      setMessage({ text: result.error || 'Eroare la trimiterea invitației.', type: 'error' });
    }
    setActionLoading(false);
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest utilizator?')) return;
    setActionLoading(true);
    const result = await deleteUser(userId);
    if (result.success) {
      setMessage({ text: 'Utilizator șters.', type: 'success' });
      fetchUsers();
    } else {
      setMessage({ text: result.error || 'Eroare la ștergere.', type: 'error' });
    }
    setActionLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setActionLoading(true);
    const result = await changeUserPassword(selectedUser.id, newPassword);
    if (result.success) {
      setMessage({ text: 'Parolă schimbată cu succes.', type: 'success' });
      setSelectedUser(null);
      setNewPassword('');
    } else {
      setMessage({ text: result.error || 'Eroare la schimbarea parolei.', type: 'error' });
    }
    setActionLoading(false);
  };

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
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all"
            >
              <Mail size={18} />
              Lead-uri Contact
            </Link>
            <Link 
              href="/admin/dashboard/users"
              className="w-full flex items-center gap-3 px-4 py-3 bg-royal/20 text-cyan-glow rounded-xl font-bold text-sm transition-all"
            >
              <User size={18} />
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
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/admin');
          }}
          className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white transition-colors text-sm font-bold mt-auto"
        >
          <LogOut size={18} />
          Deconectare
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-navy tracking-tight uppercase">Gestionare Utilizatori</h1>
          <p className="text-navy/40 font-medium">Invită colegi noi și gestionează accesul la panoul de control.</p>
        </header>

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
            message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invite Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-royal/5 space-y-6">
              <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Invită Utilizator</h3>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Email Angajat</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-ice/50 border border-gray-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all text-sm"
                    placeholder="nume@sgs-conta.ro"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <button
                  disabled={actionLoading}
                  type="submit"
                  className="w-full bg-navy text-white px-6 py-4 rounded-2xl font-bold hover:bg-royal transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                  Trimite Invitație
                </button>
              </form>
            </div>
          </div>

          {/* User List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-royal/5 overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Utilizatori Activi</h3>
              </div>
              
              <div className="divide-y divide-gray-50">
                {loading ? (
                  <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-royal" size={32} /></div>
                ) : users.map((u) => (
                  <div key={u.id} className="p-6 flex items-center justify-between hover:bg-ice/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-ice rounded-full flex items-center justify-center text-royal">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{u.email}</p>
                        <p className="text-[10px] text-navy/40 font-bold uppercase tracking-widest">
                          Ultima autentificare: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('ro-RO') : 'Niciodată'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedUser(u)}
                        className="p-2 text-navy/40 hover:text-royal hover:bg-royal/10 rounded-lg transition-all"
                        title="Schimbă Parola"
                      >
                        <Key size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="p-2 text-navy/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Șterge Utilizator"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Password Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative"
            >
              <h3 className="text-2xl font-bold text-navy mb-2 uppercase tracking-tight">Schimbă Parola</h3>
              <p className="text-navy/40 text-sm mb-6">Utilizator: <span className="text-navy font-bold">{selectedUser.email}</span></p>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Noua Parolă</label>
                  <input
                    required
                    type="password"
                    minLength={6}
                    className="w-full bg-ice/50 border border-gray-50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all text-sm"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setNewPassword('');
                    }}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-navy/60 hover:bg-ice transition-all"
                  >
                    Anulează
                  </button>
                  <button
                    disabled={actionLoading}
                    type="submit"
                    className="flex-2 bg-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-royal transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={18} /> : 'Salvează'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
