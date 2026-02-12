export default function Sidebar({ specs, activeSpecId, onSelectSpec, onDeleteSpec, onNewSpec, mobileOpen, onCloseMobile }) {
    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onCloseMobile}
                />
            )}

            <aside className={`
        border-r border-[var(--color-border-subtle)] bg-[rgba(10,14,26,0.5)] overflow-y-auto p-6
        h-[calc(100vh-73px)] sticky top-[73px]
        max-lg:fixed max-lg:top-[73px] max-lg:left-0 max-lg:w-[300px] max-lg:z-50 max-lg:bg-[var(--color-bg-secondary)] max-lg:border-r max-lg:border-[var(--color-border-medium)] max-lg:shadow-xl
        ${mobileOpen ? 'max-lg:block max-lg:animate-[slideInLeft_0.3s_ease]' : 'max-lg:hidden'}
        lg:block
      `}>
                {/* New Spec Button */}
                <button
                    onClick={onNewSpec}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 mb-5 rounded-lg font-semibold text-sm
            bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] text-white
            shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]
            hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer"
                >
                    ✨ New Spec
                </button>

                <h3 className="text-[0.7rem] uppercase tracking-widest text-[var(--color-text-tertiary)] mb-4 font-semibold">
                    Recent Specs
                </h3>

                {specs.length === 0 ? (
                    <div className="text-center py-10 px-4 text-[var(--color-text-tertiary)] text-sm">
                        <div className="text-3xl mb-4 opacity-40">📋</div>
                        <p>No specs yet.</p>
                        <p className="text-xs mt-1">Create your first feature specification!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {specs.map(spec => (
                            <div
                                key={spec.id}
                                onClick={() => onSelectSpec(spec.id)}
                                className={`relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all duration-250 group
                  border
                  ${activeSpecId === spec.id
                                        ? 'bg-[var(--color-bg-glass-hover)] border-[var(--color-border-accent)] shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                        : 'bg-[var(--color-bg-glass)] border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-glass-hover)] hover:border-[var(--color-border-medium)] hover:-translate-y-px hover:shadow-md'
                                    }`}
                            >
                                {/* Left accent bar */}
                                <div className={`absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#6366f1] to-[#a78bfa] transition-opacity duration-250
                  ${activeSpecId === spec.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                />

                                {/* Delete button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteSpec(spec.id); }}
                                    className="absolute top-2 right-2 bg-transparent border-none text-[var(--color-text-tertiary)] cursor-pointer
                    opacity-0 group-hover:opacity-100 transition-all duration-150 p-1 rounded text-xs
                    hover:text-[var(--color-danger)] hover:bg-[rgba(239,68,68,0.12)]"
                                    title="Delete spec"
                                >
                                    ✕
                                </button>

                                <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 truncate pr-6">
                                    {spec.featureName}
                                </div>
                                <div className="flex items-center gap-2 text-[0.7rem] text-[var(--color-text-tertiary)]">
                                    <span>{new Date(spec.createdAt).toLocaleDateString()}</span>
                                    <span className="bg-[rgba(99,102,241,0.15)] text-[var(--color-accent-hover)] px-2 py-0.5 rounded-full text-[0.65rem] font-medium uppercase tracking-wide">
                                        {spec.template || 'custom'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </aside>
        </>
    );
}
