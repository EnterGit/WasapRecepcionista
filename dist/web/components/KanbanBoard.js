import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const KanbanBoard = ({ quotes, onStatusChange }) => {
    const columns = [
        { id: 'GENERADA', title: '🟡 LEADS / POR REVISAR', color: '#0369a1' },
        { id: 'ENVIADA', title: '🔵 COTIZACIÓN ENVIADA', color: '#b45309' },
        { id: 'ACEPTADA', title: '🟢 VENTA ACEPTADA', color: '#047857' },
        { id: 'RECHAZADA', title: '🔴 VENTA PERDIDA', color: '#b91c1c' },
    ];
    return (_jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', minHeight: '600px' }, children: columns.map((col) => {
            const colQuotes = quotes.filter((q) => q.estado === col.id);
            const totalColMonto = colQuotes.reduce((acc, q) => acc + q.totalClp, 0);
            return (_jsxs("div", { className: "card-panel", style: { background: '#f8fafc', display: 'flex', flexDirection: 'column' }, children: [_jsxs("div", { style: { marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: `3px solid ${col.color}` }, children: [_jsx("h4", { style: { fontSize: '0.9rem', fontWeight: 800, color: col.color }, children: col.title }), _jsxs("div", { style: { fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.2rem' }, children: [colQuotes.length, " cotizaci\u00F3n(es) \u2022 $", totalColMonto.toLocaleString('es-CL'), " CLP"] })] }), _jsxs("div", { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }, children: [colQuotes.map((q) => (_jsxs("div", { style: {
                                    background: '#ffffff',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    padding: '0.85rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }, children: [_jsx("span", { style: { fontWeight: 800, color: 'var(--color-accent)', fontSize: '0.85rem' }, children: q.folio }), _jsxs("span", { style: { fontWeight: 800, fontSize: '0.9rem' }, children: ["$", q.totalClp.toLocaleString('es-CL')] })] }), _jsx("div", { style: { fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }, children: q.clienteNombre }), _jsx("div", { style: { fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }, children: q.clienteTelefono }), q.motivoRechazo && (_jsxs("div", { style: { fontSize: '0.75rem', color: '#b91c1c', background: '#fef2f2', padding: '0.3rem', borderRadius: '4px', marginBottom: '0.5rem' }, children: ["\u26A0\uFE0F ", q.motivoRechazo] })), _jsxs("div", { style: { display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }, children: [col.id !== 'ENVIADA' && (_jsx("button", { className: "btn btn-outline", style: { padding: '0.15rem 0.4rem', fontSize: '0.7rem' }, onClick: () => onStatusChange(q.folio, 'ENVIADA'), children: "\u27A1\uFE0F Enviada" })), col.id !== 'ACEPTADA' && (_jsx("button", { className: "btn btn-success", style: { padding: '0.15rem 0.4rem', fontSize: '0.7rem' }, onClick: () => onStatusChange(q.folio, 'ACEPTADA'), children: "\u2713 Aprobar" }))] })] }, q.folio))), colQuotes.length === 0 && (_jsx("div", { style: { textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '2rem 0' }, children: "Sin cotizaciones en esta etapa" }))] })] }, col.id));
        }) }));
};
