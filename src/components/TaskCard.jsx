import { useRef, useState } from 'react';

const PRIORITY_COLORS = {
    high: { bg: 'bg-[rgba(239,68,68,0.12)]', text: 'text-[var(--color-danger)]' },
    medium: { bg: 'bg-[rgba(245,158,11,0.12)]', text: 'text-[var(--color-warning)]' },
    low: { bg: 'bg-[rgba(16,185,129,0.12)]', text: 'text-[var(--color-success)]' },
};

const COMPONENT_COLORS = {
    frontend: { bg: 'bg-[rgba(59,130,246,0.12)]', text: 'text-[var(--color-comp-frontend)]' },
    backend: { bg: 'bg-[rgba(139,92,246,0.12)]', text: 'text-[var(--color-comp-backend)]' },
    design: { bg: 'bg-[rgba(236,72,153,0.12)]', text: 'text-[var(--color-comp-design)]' },
    testing: { bg: 'bg-[rgba(16,185,129,0.12)]', text: 'text-[var(--color-comp-testing)]' },
    devops: { bg: 'bg-[rgba(245,158,11,0.12)]', text: 'text-[var(--color-comp-devops)]' },
};

const TYPE_COLORS = {
    story: { bg: 'bg-[rgba(59,130,246,0.12)]', text: 'text-[var(--color-info)]' },
    task: { bg: 'bg-[rgba(139,92,246,0.12)]', text: 'text-[#a78bfa]' },
};

export default function TaskCard({ item, onUpdate, onDelete, onDragStart, onDragOver, onDrop, onDragEnd }) {
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const titleRef = useRef(null);
    const descRef = useRef(null);

    const handleTitleBlur = () => {
        const newTitle = titleRef.current?.innerText?.trim();
        if (newTitle && newTitle !== item.title) {
            onUpdate(item.id, { title: newTitle });
        }
    };

    const handleDescBlur = () => {
        const newDesc = descRef.current?.innerText?.trim();
        if (newDesc !== item.description) {
            onUpdate(item.id, { description: newDesc || '' });
        }
    };

    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); titleRef.current?.blur(); }
    };

    const handlePriorityChange = (priority) => {
        onUpdate(item.id, { priority });
        setShowPriorityMenu(false);
    };

    const typeStyle = TYPE_COLORS[item.type] || TYPE_COLORS.task;
    const priorityStyle = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.medium;
    const compStyle = COMPONENT_COLORS[item.component] || COMPONENT_COLORS.frontend;

    return (
        <div
            className="task-card bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-lg p-4 mb-2
        transition-all duration-250 cursor-grab relative group
        hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-medium)] hover:shadow-sm"
            draggable
            onDragStart={(e) => onDragStart(e, item.id)}
            onDragOver={(e) => onDragOver(e, item.id)}
            onDrop={(e) => onDrop(e, item.id)}
            onDragEnd={onDragEnd}
        >
            {/* Header */}
            <div className="flex items-start gap-2 mb-1">
                {/* Drag handle */}
                <span className="text-[var(--color-text-tertiary)] cursor-grab opacity-40 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 text-sm mt-0.5 select-none">
                    ⠿
                </span>

                {/* Editable title */}
                <div
                    ref={titleRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="flex-1 text-sm font-medium text-[var(--color-text-primary)] leading-relaxed cursor-text
            px-1 py-0.5 rounded border border-transparent outline-none transition-all duration-150
            hover:bg-[var(--color-bg-glass)]
            focus:bg-[var(--color-bg-input)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_2px_rgba(99,102,241,0.15)]"
                >
                    {item.title}
                </div>

                {/* Actions */}
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                    <button
                        onClick={() => onDelete(item.id)}
                        className="bg-transparent border-none text-[var(--color-text-tertiary)] cursor-pointer p-1.5 rounded text-xs transition-all duration-150
              hover:text-[var(--color-danger)] hover:bg-[rgba(239,68,68,0.12)]"
                        title="Delete"
                    >
                        🗑
                    </button>
                </div>
            </div>

            {/* Editable description */}
            <div
                ref={descRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={handleDescBlur}
                className="text-xs text-[var(--color-text-tertiary)] mt-2 px-2 py-1.5 rounded border border-transparent
          cursor-text outline-none transition-all duration-150 leading-relaxed
          hover:bg-[var(--color-bg-glass)]
          focus:bg-[var(--color-bg-input)] focus:border-[var(--color-accent)] focus:text-[var(--color-text-secondary)]
          empty:before:content-['Click_to_add_description...'] empty:before:text-[var(--color-text-tertiary)] empty:before:opacity-50"
            >
                {item.description}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide ${typeStyle.bg} ${typeStyle.text}`}>
                    {item.type}
                </span>

                {/* Priority - clickable */}
                <div className="relative">
                    <button
                        onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide cursor-pointer border-none ${priorityStyle.bg} ${priorityStyle.text}`}
                    >
                        {item.priority}
                    </button>
                    {showPriorityMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-medium)] rounded-lg p-1 z-50 min-w-[120px] shadow-xl">
                            {['high', 'medium', 'low'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => handlePriorityChange(p)}
                                    className="flex items-center gap-2 w-full px-3 py-2 rounded text-xs font-medium text-[var(--color-text-secondary)] bg-transparent border-none cursor-pointer transition-colors duration-150
                    hover:bg-[var(--color-bg-glass-hover)] hover:text-[var(--color-text-primary)]"
                                >
                                    <span className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[p].bg.replace('bg-', 'bg-')} ${p === 'high' ? 'bg-[var(--color-danger)]' : p === 'medium' ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]'}`} />
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide ${compStyle.bg} ${compStyle.text}`}>
                    {item.component}
                </span>

                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide bg-[var(--color-bg-glass)] text-[var(--color-text-tertiary)]">
                    {item.phase}
                </span>
            </div>
        </div>
    );
}
