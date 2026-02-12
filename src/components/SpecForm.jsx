import { useState } from 'react';

const TEMPLATES = [
    { id: 'web', name: 'Web App', icon: '🌐', desc: 'Browser compat, SEO, CDN' },
    { id: 'mobile', name: 'Mobile', icon: '📱', desc: 'iOS/Android, App Store' },
    { id: 'internal', name: 'Internal Tool', icon: '🏢', desc: 'Permissions, Audit, Admin' },
    { id: 'custom', name: 'Custom', icon: '✨', desc: 'No template extras' },
];

export default function SpecForm({ onGenerate }) {
    const [form, setForm] = useState({
        goal: '',
        targetUsers: '',
        constraints: '',
        template: 'web',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.goal.trim() || !form.targetUsers.trim()) return;
        setLoading(true);
        // Simulate a brief generation delay for UX
        await new Promise(r => setTimeout(r, 800));
        onGenerate(form);
        setLoading(false);
    };

    const isValid = form.goal.trim() && form.targetUsers.trim();

    return (
        <div className="max-w-[720px] mx-auto animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)] bg-clip-text text-transparent tracking-tight">
                    Create Feature Spec
                </h2>
                <p className="text-[var(--color-text-secondary)] text-[0.95rem]">
                    Describe your feature and we'll generate actionable user stories and engineering tasks
                </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-2xl p-8 backdrop-blur-xl">
                {/* Feature Goal */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                        Feature Goal <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <textarea
                        id="feature-goal"
                        value={form.goal}
                        onChange={handleChange('goal')}
                        placeholder="e.g., Build a real-time collaborative dashboard for teams to track project progress..."
                        className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-subtle)] rounded-lg p-4 text-[var(--color-text-primary)] font-sans text-[0.94rem] transition-all duration-250 outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[var(--color-text-tertiary)] resize-vertical min-h-[100px]"
                        rows={3}
                    />
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        Describe what you want to build and why it matters
                    </p>
                </div>

                {/* Target Users */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                        Target Users <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <input
                        id="target-users"
                        type="text"
                        value={form.targetUsers}
                        onChange={handleChange('targetUsers')}
                        placeholder="e.g., Product managers, engineering teams, project leads"
                        className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-subtle)] rounded-lg p-4 text-[var(--color-text-primary)] font-sans text-[0.94rem] transition-all duration-250 outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[var(--color-text-tertiary)]"
                    />
                </div>

                {/* Constraints */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                        Constraints & Requirements
                    </label>
                    <textarea
                        id="constraints"
                        value={form.constraints}
                        onChange={handleChange('constraints')}
                        placeholder="e.g., Must support 10k concurrent users, GDPR compliant, accessible (WCAG 2.1)..."
                        className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-subtle)] rounded-lg p-4 text-[var(--color-text-primary)] font-sans text-[0.94rem] transition-all duration-250 outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[var(--color-text-tertiary)] resize-vertical min-h-[80px]"
                        rows={2}
                    />
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        Optional — performance, security, compliance, or technical constraints
                    </p>
                </div>

                {/* Template Selector */}
                <div className="mb-8">
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
                        Project Template
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {TEMPLATES.map(t => (
                            <label
                                key={t.id}
                                className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all duration-250 text-center
                  ${form.template === t.id
                                        ? 'bg-[rgba(99,102,241,0.1)] border-[var(--color-accent)] shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                        : 'bg-[var(--color-bg-glass)] border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-glass-hover)] hover:border-[var(--color-border-medium)]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="template"
                                    value={t.id}
                                    checked={form.template === t.id}
                                    onChange={handleChange('template')}
                                    className="sr-only"
                                />
                                <span className={`text-2xl w-11 h-11 flex items-center justify-center rounded-lg transition-all
                  ${form.template === t.id ? 'bg-[rgba(99,102,241,0.2)]' : 'bg-[var(--color-bg-glass)]'}`}>
                                    {t.icon}
                                </span>
                                <span className="text-xs font-semibold text-[var(--color-text-primary)]">{t.name}</span>
                                <span className="text-[0.65rem] text-[var(--color-text-tertiary)] leading-snug">{t.desc}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    id="generate-btn"
                    type="submit"
                    disabled={!isValid || loading}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold text-base transition-all duration-250 cursor-pointer
            ${isValid && !loading
                            ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] text-white shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 active:translate-y-0'
                            : 'bg-[var(--color-bg-glass)] text-[var(--color-text-tertiary)] cursor-not-allowed border border-[var(--color-border-subtle)]'
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>⚡ Generate Spec</>
                    )}
                </button>
            </form>
        </div>
    );
}
