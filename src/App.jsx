import { useState, useCallback, useEffect } from 'react';
import SpecForm from './components/SpecForm.jsx';
import Sidebar from './components/Sidebar.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { generateSpec } from './utils/generator.js';
import { getRecentSpecs, saveSpec, deleteSpec, updateSpec } from './utils/storage.js';

export default function App() {
    const [specs, setSpecs] = useState(() => getRecentSpecs());
    const [activeSpecId, setActiveSpecId] = useState(null);
    const [view, setView] = useState('form'); // 'form' | 'results'
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const activeSpec = specs.find(s => s.id === activeSpecId) || null;

    // Toast helper
    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Generate new spec
    const handleGenerate = useCallback((formData) => {
        const spec = generateSpec(formData);
        const updatedSpecs = saveSpec(spec);
        setSpecs(updatedSpecs);
        setActiveSpecId(spec.id);
        setView('results');
        showToast(`Generated ${spec.stories.length} stories and ${spec.tasks.length} tasks`);
    }, [showToast]);

    // Select spec from sidebar
    const handleSelectSpec = useCallback((id) => {
        setActiveSpecId(id);
        setView('results');
        setMobileMenuOpen(false);
    }, []);

    // Delete spec
    const handleDeleteSpec = useCallback((id) => {
        const updatedSpecs = deleteSpec(id);
        setSpecs(updatedSpecs);
        if (activeSpecId === id) {
            setActiveSpecId(null);
            setView('form');
        }
        showToast('Spec deleted', 'info');
    }, [activeSpecId, showToast]);

    // Update spec (from inline editing, reordering, etc.)
    const handleUpdateSpec = useCallback((updatedSpec) => {
        const updatedSpecs = updateSpec(updatedSpec.id, updatedSpec);
        setSpecs(updatedSpecs);
    }, []);

    // New spec
    const handleNewSpec = useCallback(() => {
        setActiveSpecId(null);
        setView('form');
        setMobileMenuOpen(false);
    }, []);

    // Back to form
    const handleBackToForm = useCallback(() => {
        setView('form');
        setActiveSpecId(null);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] grid-rows-[auto_1fr] min-h-screen max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="col-span-full flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[var(--color-border-subtle)] backdrop-blur-xl bg-[rgba(10,14,26,0.8)] sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden bg-transparent border-none text-[var(--color-text-secondary)] cursor-pointer p-2 rounded-lg
              hover:bg-[var(--color-bg-glass)] hover:text-[var(--color-text-primary)] transition-all duration-150 text-lg"
                    >
                        ☰
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] rounded-xl flex items-center justify-center text-xl shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                            ⚡
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                                SpecFlow
                            </h1>
                            <span className="text-[0.65rem] text-[var(--color-text-tertiary)] font-normal tracking-widest uppercase">
                                Feature Planning Tool
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--color-text-tertiary)] hidden sm:inline">
                        {specs.length}/5 specs saved
                    </span>
                </div>
            </header>

            {/* Sidebar */}
            <Sidebar
                specs={specs}
                activeSpecId={activeSpecId}
                onSelectSpec={handleSelectSpec}
                onDeleteSpec={handleDeleteSpec}
                onNewSpec={handleNewSpec}
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
            />

            {/* Main Content */}
            <main className="p-6 lg:p-8 overflow-y-auto h-[calc(100vh-73px)]">
                {view === 'form' && (
                    <SpecForm onGenerate={handleGenerate} />
                )}
                {view === 'results' && activeSpec && (
                    <ResultsPanel
                        spec={activeSpec}
                        onUpdateSpec={handleUpdateSpec}
                        onBackToForm={handleBackToForm}
                    />
                )}
            </main>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
                    <div className={`animate-slide-in-right bg-[var(--color-bg-secondary)] border border-[var(--color-border-medium)] rounded-lg px-6 py-4 text-sm shadow-xl flex items-center gap-2
            ${toast.type === 'success' ? 'border-l-[3px] border-l-[var(--color-success)]' : ''}
            ${toast.type === 'error' ? 'border-l-[3px] border-l-[var(--color-danger)]' : ''}
            ${toast.type === 'info' ? 'border-l-[3px] border-l-[var(--color-info)]' : ''}
          `}>
                        <span>
                            {toast.type === 'success' && '✅'}
                            {toast.type === 'error' && '❌'}
                            {toast.type === 'info' && 'ℹ️'}
                        </span>
                        {toast.message}
                    </div>
                </div>
            )}
        </div>
    );
}
