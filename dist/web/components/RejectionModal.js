import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export const RejectionModal = ({ folio, isOpen, onClose, onConfirm }) => {
    const [motivo, setMotivo] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!motivo.trim())
            return;
        onConfirm(folio, motivo);
        setMotivo('');
        onClose();
    };
    return (_jsx("div", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }, children: _jsxs("div", { className: "card-panel", style: { width: '450px', background: '#fff' }, children: [_jsxs("div", { className: "card-header", children: [_jsxs("h3", { className: "card-title", children: ["\uD83D\uDD34 Rechazar Cotizaci\u00F3n ", folio] }), _jsx("button", { className: "btn btn-outline", onClick: onClose, style: { padding: '0.2rem 0.5rem' }, children: "\u2715" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: { display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }, children: "Ingrese el Motivo de Rechazo (Obligatorio):" }), _jsxs("select", { value: motivo, onChange: (e) => setMotivo(e.target.value), style: { width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d8dadd', marginBottom: '0.75rem' }, required: true, children: [_jsx("option", { value: "", children: "-- Seleccione una causal --" }), _jsx("option", { value: "Precio fuera de presupuesto", children: "Precio fuera de presupuesto" }), _jsx("option", { value: "Tiempo de entrega prolongado", children: "Tiempo de entrega prolongado" }), _jsx("option", { value: "Cliente prefiri\u00F3 otra marca/competencia", children: "Cliente prefiri\u00F3 otra marca/competencia" }), _jsx("option", { value: "Cliente desisti\u00F3 de la compra", children: "Cliente desisti\u00F3 de la compra" }), _jsx("option", { value: "Sin respuesta / Inubicable", children: "Sin respuesta / Inubicable" })] })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }, children: [_jsx("button", { type: "button", className: "btn btn-outline", onClick: onClose, children: "Cancelar" }), _jsx("button", { type: "submit", className: "btn btn-danger", children: "Confirmar Rechazo" })] })] })] }) }));
};
