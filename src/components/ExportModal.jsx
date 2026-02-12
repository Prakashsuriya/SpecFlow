import { useState } from 'react';
import { createPortal } from 'react-dom';
import { exportAsText, exportAsMarkdown, downloadFile } from '../utils/export.js';

export default function ExportModal({ spec, groupBy, onClose }) {
    const [format, setFormat] = useState('markdown');

    const content = format === 'markdown'
        ? exportAsMarkdown(spec, groupBy)
        : exportAsText(spec, groupBy);

    const handleDownload = () => {
        const ext = format === 'markdown' ? 'md' : 'txt';
        const filename = `${spec.featureName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_spec.${ext}`;
        downloadFile(content, filename);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center animate-[fadeIn_0.2s_ease]"
            onClick={onClose}
        >
            <div
                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-medium)] rounded-2xl p-8 max-w-[600px] w-[90%] max-h-[80vh] overflow-y-auto shadow-xl animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Export Specification</h3>
                    <button
                        onClick={onClose}
                        className="bg-transparent border-none text-[var(--color-text-tertiary)] cursor-pointer text-xl p-2 rounded transition-all duration-150
              hover:bg-[var(--color-bg-glass)] hover:text-[var(--color-text-primary)]"
                    >
                        ✕
                    </button>
                </div>

                {/* Format toggle */}
                <div className="flex gap-2 mb-4">
                    {['markdown', 'text'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFormat(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer
                ${format === f
                                    ? 'bg-[rgba(99,102,241,0.15)] border-[var(--color-accent)] text-[var(--color-accent-hover)]'
                                    : 'bg-transparent border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-glass-hover)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Preview */}
                <pre className="bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg p-4 font-mono text-xs text-[var(--color-text-secondary)] leading-7 max-h-[400px] overflow-y-auto whitespace-pre-wrap break-words">
                    {content}
                </pre>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold
              bg-[var(--color-bg-glass)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]
              hover:bg-[var(--color-bg-glass-hover)] hover:border-[var(--color-border-medium)] transition-all duration-250 cursor-pointer"
                    >
                        📋 Copy to Clipboard
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold
              bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] text-white
              shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]
              hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer"
                    >
                        ⬇ Download .{format === 'markdown' ? 'md' : 'txt'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
