import { useState, useCallback, useRef } from 'react';
import TaskCard from './TaskCard.jsx';
import ExportModal from './ExportModal.jsx';

const GROUP_OPTIONS = [
    { key: 'type', label: 'Type' },
    { key: 'priority', label: 'Priority' },
    { key: 'component', label: 'Component' },
    { key: 'phase', label: 'Phase' },
];

const GROUP_DOT_COLORS = {
    // Type
    story: 'bg-[var(--color-info)]',
    task: 'bg-[#a78bfa]',
    // Priority
    high: 'bg-[var(--color-danger)]',
    medium: 'bg-[var(--color-warning)]',
    low: 'bg-[var(--color-success)]',
    // Component
    frontend: 'bg-[var(--color-comp-frontend)]',
    backend: 'bg-[var(--color-comp-backend)]',
    design: 'bg-[var(--color-comp-design)]',
    testing: 'bg-[var(--color-comp-testing)]',
    devops: 'bg-[var(--color-comp-devops)]',
    // Phase
    planning: 'bg-[#818cf8]',
    development: 'bg-[var(--color-info)]',
    deployment: 'bg-[var(--color-warning)]',
};

function groupItems(items, groupBy) {
    const groups = {};
    items.forEach(item => {
        const key = item[groupBy] || 'other';
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });
    return groups;
}

export default function ResultsPanel({ spec, onUpdateSpec, onBackToForm }) {
    const [groupBy, setGroupBy] = useState('type');
    const [showExport, setShowExport] = useState(false);
    const dragItemId = useRef(null);

    const allItems = [...(spec.stories || []), ...(spec.tasks || [])];

    const handleUpdateItem = useCallback((itemId, updates) => {
        const newStories = spec.stories.map(s => s.id === itemId ? { ...s, ...updates } : s);
        const newTasks = spec.tasks.map(t => t.id === itemId ? { ...t, ...updates } : t);
        onUpdateSpec({ ...spec, stories: newStories, tasks: newTasks });
    }, [spec, onUpdateSpec]);

    const handleDeleteItem = useCallback((itemId) => {
        const newStories = spec.stories.filter(s => s.id !== itemId);
        const newTasks = spec.tasks.filter(t => t.id !== itemId);
        onUpdateSpec({ ...spec, stories: newStories, tasks: newTasks });
    }, [spec, onUpdateSpec]);

    const handleUpdateRisk = useCallback((riskId, newText) => {
        const newRisks = spec.risks.map(r => r.id === riskId ? { ...r, text: newText } : r);
        onUpdateSpec({ ...spec, risks: newRisks });
    }, [spec, onUpdateSpec]);

    // Drag and Drop
    const handleDragStart = useCallback((e, itemId) => {
        dragItemId.current = itemId;
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleDragOver = useCallback((e, targetId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('drag-over');
    }, []);

    const handleDragEnd = useCallback((e) => {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    }, []);

    const handleDrop = useCallback((e, targetId) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const sourceId = dragItemId.current;
        if (!sourceId || sourceId === targetId) return;

        // Reorder in the combined array, then split back
        const combined = [...spec.stories, ...spec.tasks];
        const sourceIdx = combined.findIndex(i => i.id === sourceId);
        const targetIdx = combined.findIndex(i => i.id === targetId);
        if (sourceIdx === -1 || targetIdx === -1) return;

        const [moved] = combined.splice(sourceIdx, 1);
        combined.splice(targetIdx, 0, moved);

        const newStories = combined.filter(i => i.type === 'story');
        const newTasks = combined.filter(i => i.type === 'task');
        onUpdateSpec({ ...spec, stories: newStories, tasks: newTasks });
        dragItemId.current = null;
    }, [spec, onUpdateSpec]);

    const groups = groupItems(allItems, groupBy);

    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBackToForm}
                        className="bg-transparent border-none text-[var(--color-text-secondary)] cursor-pointer p-2 rounded-lg transition-all duration-150
              hover:bg-[var(--color-bg-glass)] hover:text-[var(--color-text-primary)] text-lg"
                        title="Back to form"
                    >
                        ←
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{spec.featureName}</h2>
                        <div className="flex gap-3 mt-1">
                            <span className="inline-flex items-center gap-1 bg-[var(--color-bg-glass)] px-3 py-0.5 rounded-full text-xs text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
                                📖 <strong className="text-[var(--color-text-primary)]">{spec.stories?.length || 0}</strong> stories
                            </span>
                            <span className="inline-flex items-center gap-1 bg-[var(--color-bg-glass)] px-3 py-0.5 rounded-full text-xs text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
                                🔧 <strong className="text-[var(--color-text-primary)]">{spec.tasks?.length || 0}</strong> tasks
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setShowExport(true)}
                        className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold
              bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] text-white
              shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]
              hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer"
                    >
                        ⬇ Export
                    </button>
                </div>
            </div>

            {/* Toolbar - Grouping */}
            <div className="flex items-center justify-between gap-4 p-4 bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-xl mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="text-[0.7rem] uppercase tracking-widest text-[var(--color-text-tertiary)] font-semibold mr-1">
                        Group by
                    </span>
                    {GROUP_OPTIONS.map(opt => (
                        <button
                            key={opt.key}
                            onClick={() => setGroupBy(opt.key)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer
                ${groupBy === opt.key
                                    ? 'bg-[rgba(99,102,241,0.15)] border-[var(--color-accent)] text-[var(--color-accent-hover)]'
                                    : 'bg-transparent border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-glass-hover)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)]">
                    Drag to reorder • Click to edit
                </span>
            </div>

            {/* Task Groups */}
            {Object.entries(groups).map(([key, items]) => (
                <div key={key} className="mb-8">
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[var(--color-border-subtle)]">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${GROUP_DOT_COLORS[key] || 'bg-[var(--color-text-tertiary)]'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span className="bg-[var(--color-bg-glass)] px-2.5 py-0.5 rounded-full text-[0.688rem] text-[var(--color-text-tertiary)] font-semibold">
                            {items.length}
                        </span>
                    </div>

                    {items.map(item => (
                        <TaskCard
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdateItem}
                            onDelete={handleDeleteItem}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            ))}

            {/* Risks & Unknowns */}
            {spec.risks && spec.risks.length > 0 && (
                <div className="bg-[var(--color-bg-card)] border border-[rgba(245,158,11,0.2)] rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">⚠️</span>
                        <h3 className="text-base font-bold text-[var(--color-warning)]">Risks & Unknowns</h3>
                    </div>
                    {spec.risks.map(risk => (
                        <div
                            key={risk.id}
                            className="flex gap-4 p-4 bg-[rgba(245,158,11,0.12)] rounded-lg mb-2 last:mb-0 border border-[rgba(245,158,11,0.1)]"
                        >
                            <span className="text-[0.688rem] font-bold uppercase tracking-wider text-[var(--color-warning)] flex-shrink-0 min-w-[90px] pt-0.5">
                                {risk.type}
                            </span>
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newText = e.currentTarget.innerText.trim();
                                    if (newText && newText !== risk.text) handleUpdateRisk(risk.id, newText);
                                }}
                                className="text-sm text-[var(--color-text-secondary)] flex-1 cursor-text px-1 py-0.5 rounded
                  border border-transparent outline-none transition-all duration-150 leading-relaxed
                  hover:bg-[rgba(255,255,255,0.04)]
                  focus:bg-[var(--color-bg-input)] focus:border-[var(--color-accent)]"
                            >
                                {risk.text}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Export Modal */}
            {showExport && (
                <ExportModal
                    spec={spec}
                    groupBy={groupBy}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div>
    );
}
