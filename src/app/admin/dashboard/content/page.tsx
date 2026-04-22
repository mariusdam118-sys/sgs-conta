'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { getSiteContent, updateSiteContent } from '@/src/lib/actions';
import { 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  LayoutDashboard, 
  Mail, 
  User, 
  FileEdit, 
  Globe, 
  LogOut,
  Plus,
  Trash
} from 'lucide-react';
import Link from 'next/link';

export default function ContentManagement() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }
      fetchContent();
    };
    checkAuth();
  }, [router]);

  const fetchContent = async () => {
    setLoading(true);
    const result = await getSiteContent();
    if (result.success) {
      setContent(result.content);
    } else {
      setMessage({ text: 'Eroare la încărcarea conținutului.', type: 'error' });
    }
    setLoading(false);
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(true);
    const result = await updateSiteContent(sectionKey, content[sectionKey]);
    if (result.success) {
      setMessage({ text: `Secțiunea ${sectionKey} a fost salvată!`, type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: result.error || 'Eroare la salvare.', type: 'error' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ice/40">
        <Loader2 className="animate-spin text-royal" size={48} />
      </div>
    );
  }

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
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all"
            >
              <User size={18} />
              Gestionare Utilizatori
            </Link>
            <Link 
              href="/admin/dashboard/content"
              className="w-full flex items-center gap-3 px-4 py-3 bg-royal/20 text-cyan-glow rounded-xl font-bold text-sm transition-all"
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
          <h1 className="text-4xl font-black text-navy tracking-tight uppercase">Editare Conținut</h1>
          <p className="text-navy/40 font-medium">Modifică textele și informațiile de pe paginile principale.</p>
        </header>

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
            message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        <div className="space-y-12">
          {/* Contact Section */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-royal/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Pagina Contact</h3>
              <button 
                onClick={() => handleSave('contact')}
                disabled={saving}
                className="bg-navy text-white px-6 py-2 rounded-xl font-bold hover:bg-royal transition-all flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Salvează
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Titlu Principal</label>
                <input 
                  type="text" 
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                  value={content?.contact?.hero_title || ''}
                  onChange={(e) => setContent({...content, contact: {...content.contact, hero_title: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Descriere</label>
                <textarea 
                  rows={2}
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none resize-none"
                  value={content?.contact?.hero_desc || ''}
                  onChange={(e) => setContent({...content, contact: {...content.contact, hero_desc: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Telefon</label>
                <input 
                  type="text" 
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                  value={content?.contact?.phone || ''}
                  onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Email</label>
                <input 
                  type="text" 
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                  value={content?.contact?.email || ''}
                  onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                />
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-royal/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Pagina Despre Noi</h3>
              <button 
                onClick={() => handleSave('about')}
                disabled={saving}
                className="bg-navy text-white px-6 py-2 rounded-xl font-bold hover:bg-royal transition-all flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Salvează
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Titlu Hero</label>
                <input 
                  type="text" 
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                  value={content?.about?.hero_title || ''}
                  onChange={(e) => setContent({...content, about: {...content.about, hero_title: e.target.value}})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-2">Descriere Misiune</label>
                <textarea 
                  rows={4}
                  className="w-full bg-ice/50 border border-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none resize-none"
                  value={content?.about?.mission_desc || ''}
                  onChange={(e) => setContent({...content, about: {...content.about, mission_desc: e.target.value}})}
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-royal/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Pagina Servicii</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    const newServices = [...(content.services || [])];
                    newServices.push({ title: 'Serviciu Nou', description: '', details: [''] });
                    setContent({...content, services: newServices});
                  }}
                  className="bg-ice text-navy px-4 py-2 rounded-xl font-bold hover:bg-royal/10 transition-all flex items-center gap-2 text-sm"
                >
                  <Plus size={16} />
                  Adaugă Serviciu
                </button>
                <button 
                  onClick={() => handleSave('services')}
                  disabled={saving}
                  className="bg-navy text-white px-6 py-2 rounded-xl font-bold hover:bg-royal transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  Salvează Tot
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {(content?.services || []).map((service: any, sIdx: number) => (
                <div key={sIdx} className="p-6 bg-ice/30 rounded-[2rem] border border-gray-50 space-y-6 relative group">
                  <button 
                    onClick={() => {
                      const newServices = content.services.filter((_: any, i: number) => i !== sIdx);
                      setContent({...content, services: newServices});
                    }}
                    className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-2">Titlu Serviciu</label>
                      <input 
                        type="text" 
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                        value={service.title || ''}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[sIdx].title = e.target.value;
                          setContent({...content, services: newServices});
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-2">Descriere Scurtă</label>
                      <input 
                        type="text" 
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal/20 outline-none"
                        value={service.description || ''}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[sIdx].description = e.target.value;
                          setContent({...content, services: newServices});
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-2">Detalii (puncte cheie)</label>
                      <button 
                        onClick={() => {
                          const newServices = [...content.services];
                          newServices[sIdx].details.push('');
                          setContent({...content, services: newServices});
                        }}
                        className="text-[10px] font-bold text-royal uppercase hover:underline"
                      >
                        + Adaugă Punct
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.details.map((detail: string, dIdx: number) => (
                        <div key={dIdx} className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-royal/20 outline-none"
                            value={detail}
                            onChange={(e) => {
                              const newServices = [...content.services];
                              newServices[sIdx].details[dIdx] = e.target.value;
                              setContent({...content, services: newServices});
                            }}
                          />
                          <button 
                            onClick={() => {
                              const newServices = [...content.services];
                              newServices[sIdx].details = newServices[sIdx].details.filter((_: any, i: number) => i !== dIdx);
                              setContent({...content, services: newServices});
                            }}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
