import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { QuoteListTable } from './components/QuoteListTable.js';
import { PdfViewerPanel } from './components/PdfViewerPanel.js';
import { RejectionModal } from './components/RejectionModal.js';
import { CustomerChatPanel } from './components/CustomerChatPanel.js';
import { KpiBentoGrid } from './components/KpiBentoGrid.js';
import './styles/theme.css';
export const App = () => {
    const [activeTab, setActiveTab] = useState('quotes');
    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isRejectionOpen, setIsRejectionOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [kpis, setKpis] = useState(null);
    // Cargar Cotizaciones Demo / API
    useEffect(() => {
        const mockQuotes = [
            {
                folio: 'CE17384',
                clienteNombre: 'Osvaldo Varas',
                clienteTelefono: '+56912345678',
                totalClp: 370090,
                estado: 'GENERADA',
            },
            {
                folio: 'CE48827',
                clienteNombre: 'Carlos Mendoza',
                clienteTelefono: '+56987654321',
                totalClp: 505750,
                estado: 'ACEPTADA',
            },
            {
                folio: 'CE68895',
                clienteNombre: 'Empresa Test SpA',
                clienteTelefono: '+56999887766',
                totalClp: 809200,
                estado: 'RECHAZADA',
                motivoRechazo: 'Precio fuera de presupuesto',
            },
        ];
        setQuotes(mockQuotes);
        setSelectedQuote(mockQuotes[0]);
        const mockCustomers = [
            { id: 1, nombre: 'Osvaldo Varas', telefono: '+56912345678', estado: 'COTIZANDO' },
            { id: 2, nombre: 'Carlos Mendoza', telefono: '+56987654321', estado: 'CLIENTE_ACTIVO' },
            { id: 3, nombre: 'Empresa Test SpA', telefono: '+56999887766', estado: 'LEAD' },
        ];
        setCustomers(mockCustomers);
        setSelectedCustomer(mockCustomers[0]);
        // Fetch KPIs
        fetch('/api/analytics/kpis')
            .then((res) => res.json())
            .then((data) => setKpis(data.kpis))
            .catch(() => {
            setKpis({
                topProducts: [
                    { sku: 'CENT-D5-SMART', totalSolicitado: 18, nombre: 'Motor Centurion D5 Smart' },
                    { sku: 'DEMO-600SMART', totalSolicitado: 14, nombre: 'PrimaPort Roller 600HC' },
                ],
                leastRequestedProducts: [
                    { sku: 'COMU-FORT-1500', totalSolicitado: 1, nombre: 'Comunello Fort 1500' },
                ],
                bestCustomers: [
                    { clienteId: 1, nombre: 'Carlos Mendoza', telefono: '+56987654321', totalCotizacionesAceptadas: 2, montoTotalClp: 1011500 },
                ],
                conversionRate: {
                    totalCotizaciones: 25,
                    generadas: 5,
                    enviadas: 2,
                    aceptadas: 14,
                    rechazadas: 4,
                    tasaConversionPorcentaje: 56.0,
                },
                rejectionReasons: [
                    { motivo: 'Precio fuera de presupuesto', cantidad: 3 },
                    { motivo: 'Tiempo de entrega prolongado', cantidad: 1 },
                ],
            });
        });
    }, []);
    const handleApprove = (folio) => {
        setQuotes((prev) => prev.map((q) => (q.folio === folio ? { ...q, estado: 'ACEPTADA' } : q)));
        if (selectedQuote?.folio === folio) {
            setSelectedQuote((prev) => ({ ...prev, estado: 'ACEPTADA' }));
        }
    };
    const handleConfirmReject = (folio, motivo) => {
        setQuotes((prev) => prev.map((q) => (q.folio === folio ? { ...q, estado: 'RECHAZADA', motivoRechazo: motivo } : q)));
        if (selectedQuote?.folio === folio) {
            setSelectedQuote((prev) => ({ ...prev, estado: 'RECHAZADA', motivoRechazo: motivo }));
        }
    };
    return (_jsxs("div", { className: "app-container", children: [_jsx(Navbar, { activeTab: activeTab, setActiveTab: setActiveTab }), _jsxs("main", { className: "main-content", children: [activeTab === 'quotes' && (_jsxs("div", { className: "split-grid", style: { height: 'calc(100vh - 120px)' }, children: [_jsx(QuoteListTable, { quotes: quotes, selectedFolio: selectedQuote?.folio || null, onSelectQuote: (q) => setSelectedQuote(q) }), _jsx(PdfViewerPanel, { selectedQuote: selectedQuote, onApprove: handleApprove, onRejectClick: () => setIsRejectionOpen(true) })] })), activeTab === 'customers' && (_jsx(CustomerChatPanel, { customers: customers, selectedCustomer: selectedCustomer, onSelectCustomer: (c) => setSelectedCustomer(c), messages: [
                            {
                                id: 1,
                                mensajeCliente: 'Hola, quisiera cotizar un motor Centurion D5 Smart',
                                respuestaIa: 'Estimado(a), el motor Centurion D5 Smart tiene un valor de $425.000 Neto + IVA 19% ($505.750 CLP Total). He generado su cotización CE48827.',
                                timestamp: '14:20',
                            },
                        ] })), activeTab === 'kpis' && _jsx(KpiBentoGrid, { kpis: kpis })] }), _jsx(RejectionModal, { folio: selectedQuote?.folio || '', isOpen: isRejectionOpen, onClose: () => setIsRejectionOpen(false), onConfirm: handleConfirmReject })] }));
};
export default App;
