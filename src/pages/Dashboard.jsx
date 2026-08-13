// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Plus, Trash2, Edit3, LogOut, Video, Image as ImageIcon, Tag, Sparkles, CheckCircle, AlertCircle, Upload, Loader2, CheckCircle2 } from 'lucide-react';

// Helper to convert "Dam Hoi Jekra Mein Ohi Gadi Khunta" -> "dam-hoi-jekra-mein-ohi-gadi-khunta"
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove non-word characters
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

export default function Dashboard({ setSession }) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState(null);

    // State for image uploading
    const [uploadingImage, setUploadingImage] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail_url: '',
        video_url: '',
        category_id: '',
    });

    // File Upload Handler
    const handleFileUpload = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (PNG, JPG, WEBP).');
                return;
            }

            setUploadingImage(true);

            // Create a unique file path
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `public/${fileName}`;

            // Upload to Supabase Storage bucket named 'thumbnails'
            const { error: uploadError } = await supabase.storage
                .from('thumbnails')
                .upload(filePath, file, { cacheControl: '3600', upsert: false });

            if (uploadError) throw uploadError;

            // Get the Public URL of the uploaded image
            const { data: { publicUrl } } = supabase.storage
                .from('thumbnails')
                .getPublicUrl(filePath);

            // Auto-fill the thumbnail_url field in formData
            setFormData((prev) => ({ ...prev, thumbnail_url: publicUrl }));
        } catch (err) {
            console.error('Image Upload Error:', err.message);
            alert(`Failed to upload image: ${err.message}`);
        } finally {
            setUploadingImage(false);
        }
    };

    // Fetch Projects & Categories on load
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const showNotify = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [projRes, catRes] = await Promise.all([
                supabase.from('projects').select('*, categories(name, slug)').order('created_at', { ascending: false }),
                supabase.from('categories').select('*').order('name'),
            ]);

            if (projRes.error) throw projRes.error;
            if (catRes.error) throw catRes.error;

            const fetchedCats = catRes.data || [];
            // Automatically sync any legacy 'Commercial' category in Supabase to 'Film'
            const commercialCat = fetchedCats.find(c => c.name?.toUpperCase() === 'COMMERCIAL' || c.slug === 'commercial');
            if (commercialCat) {
                await supabase.from('categories').update({ name: 'Film', slug: 'film' }).eq('id', commercialCat.id);
                commercialCat.name = 'Film';
                commercialCat.slug = 'film';
            }

            setProjects(projRes.data || []);
            setCategories(fetchedCats);
            if (fetchedCats.length > 0 && !formData.category_id) {
                setFormData((prev) => ({ ...prev, category_id: fetchedCats[0].id }));
            }
        } catch (err) {
            showNotify(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        if (setSession) setSession(null);
        navigate('/login');
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (!formData.title || !formData.thumbnail_url) {
                throw new Error('Title and Thumbnail URL are required.');
            }

            // Generate slug automatically from title
            const payload = {
                ...formData,
                slug: formData.slug || slugify(formData.title),
            };

            if (editingId) {
                // Update Existing
                const { error } = await supabase.from('projects').update(payload).eq('id', editingId);
                if (error) throw error;
                showNotify('PROJECT RECORD UPDATED SUCCESSFULLY');
            } else {
                // Create New
                const { error } = await supabase.from('projects').insert([payload]);
                if (error) throw error;
                showNotify('NEW PROJECT PUBLISHED TO STREAM');
            }

            // Reset Form
            setFormData({
                title: '',
                description: '',
                thumbnail_url: '',
                video_url: '',
                category_id: categories[0]?.id || '',
            });
            setEditingId(null);
            fetchDashboardData();
        } catch (err) {
            showNotify(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleEditClick = (project) => {
        setEditingId(project.id);
        setFormData({
            title: project.title || '',
            description: project.description || '',
            thumbnail_url: project.thumbnail_url || '',
            video_url: project.video_url || '',
            category_id: project.category_id || categories[0]?.id || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project archive record?')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            showNotify('RECORD PURGED FROM ARCHIVE');
            fetchDashboardData();
        } catch (err) {
            showNotify(err.message, 'error');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-mono selection:bg-white selection:text-black">

            {/* Top Admin Navigation Header */}
            <header className="border-b border-white/10 bg-black/60 sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h1 className="text-sm font-black uppercase tracking-widest text-white">
                        CHARVI FILMS // PORTAL TERMINAL
                    </h1>
                </div>

                <div className="flex items-center gap-4 text-xs">
                    <button
                        onClick={() => navigate('/')}
                        className="text-zinc-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full"
                    >
                        LIVE SITE ↗
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-full transition-colors bg-red-950/20"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>EXIT SESSION</span>
                    </button>
                </div>
            </header>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border bg-black/90 backdrop-blur-md text-xs shadow-2xl animate-bounce">
                    {notification.type === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                    <span className={notification.type === 'error' ? 'text-red-300' : 'text-emerald-300'}>
                        {notification.msg}
                    </span>
                </div>
            )}

            <main className="max-w-7xl mx-auto p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Add / Edit Form */}
                <div className="lg:col-span-1 bg-zinc-900/60 border border-white/10 p-6 rounded-2xl h-fit sticky top-24">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                        <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {editingId ? '[EDIT REEL RECORD]' : '[NEW ARCHIVE RECORD]'}
                        </h2>
                        {editingId && (
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ title: '', description: '', thumbnail_url: '', video_url: '', category_id: categories[0]?.id || '' });
                                }}
                                className="text-[10px] text-zinc-500 hover:text-white underline"
                            >
                                CANCEL EDIT
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSaveProject} className="space-y-5 text-xs">
                        {/* Title */}
                        <div>
                            <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">
                                PROJECT TITLE *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. NEON NIGHTS"
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="flex items-center gap-1 text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">
                                <Tag className="w-3 h-3" /> CATEGORY
                            </label>
                            <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 uppercase"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name?.toUpperCase() === 'COMMERCIAL' ? 'FILM' : cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* THUMBNAIL IMAGE UPLOADER & URL INPUT */}
                        <div className="space-y-2 font-mono">
                          <label className="text-[10px] text-zinc-400 uppercase tracking-wider flex justify-between items-center">
                            <span>THUMBNAIL IMAGE *</span>
                            {formData.thumbnail_url && (
                              <span className="text-emerald-400 flex items-center gap-1 text-[9px]">
                                <CheckCircle2 className="w-3 h-3" /> IMAGE READY
                              </span>
                            )}
                          </label>

                          <div className="space-y-3">
                            {/* Browse File Dropzone Button */}
                            <div className="relative group">
                              <input
                                type="file"
                                id="thumbnail-file-input"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploadingImage}
                                className="hidden"
                              />
                              
                              <label
                                htmlFor="thumbnail-file-input"
                                className={`w-full py-3.5 px-4 bg-black/60 border border-dashed rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all ${
                                  uploadingImage
                                    ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-300'
                                    : 'border-white/20 hover:border-indigo-500/80 hover:bg-zinc-900 text-zinc-300'
                                }`}
                              >
                                {uploadingImage ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                                    <span className="text-xs uppercase tracking-wider">UPLOADING TO STORAGE...</span>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                      BROWSE DEVICE FOR IMAGE 📁
                                    </span>
                                  </>
                                )}
                              </label>
                            </div>

                            {/* Live Thumbnail Preview Box */}
                            {formData.thumbnail_url && (
                              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/80 border border-white/10 group">
                                <img
                                  src={formData.thumbnail_url}
                                  alt="Thumbnail Preview"
                                  className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-[8px] text-zinc-400 uppercase tracking-widest">
                                  PREVIEW
                                </div>
                              </div>
                            )}

                            {/* Manual URL Input Fallback */}
                            <div className="relative">
                              <input
                                type="text"
                                value={formData.thumbnail_url || ''}
                                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                                placeholder="Or paste external image URL (https://...)"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Video Stream URL */}
                        <div>
                            <label className="flex items-center gap-1 text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">
                                <Video className="w-3 h-3" /> VIDEO REEL URL (YOUTUBE / VIMEO / DIRECT)
                            </label>
                            <input
                                type="url"
                                value={formData.video_url}
                                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                placeholder="https://vimeo.com/..."
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 text-[11px]"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">
                                PRODUCTION OVERVIEW
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief technical or narrative statement..."
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 text-[11px]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-3.5 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <span>COMMITTING TO DATABASE...</span>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>{editingId ? 'SAVE CHANGES' : 'COMMIT PROJECT'}</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Right 2 Columns: Managed Records Stream */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border-b border-white/10 pb-4 flex justify-between items-baseline">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                            [DEPLOYED ARCHIVE INDEX // {projects.length} RECORDS]
                        </h2>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center text-zinc-600 uppercase tracking-widest text-xs animate-pulse">
                            Querying Supabase Cluster...
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl text-zinc-600 uppercase tracking-widest text-xs">
                            No project records found in repository.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((proj) => (
                                <div
                                    key={proj.id}
                                    className="p-4 bg-zinc-900/40 border border-white/10 hover:border-white/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={proj.thumbnail_url}
                                            alt={proj.title}
                                            className="w-20 h-12 object-cover rounded-md bg-black border border-white/10 shrink-0"
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200"; }}
                                        />
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase">{proj.title}</h3>
                                            <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-1">
                                                <span className="text-indigo-400 uppercase">/{proj.categories?.slug || 'general'}</span>
                                                <span>•</span>
                                                <span>{proj.created_at ? new Date(proj.created_at).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <button
                                            onClick={() => handleEditClick(proj)}
                                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-lg transition-colors"
                                            title="Edit Record"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(proj.id)}
                                            className="p-2 bg-red-950/30 hover:bg-red-950/60 border border-red-500/20 text-red-400 rounded-lg transition-colors"
                                            title="Delete Record"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}