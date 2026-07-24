import React from 'react';

interface NavbarProps {
  activeTab: 'quotes' | 'customers' | 'kpis';
  setActiveTab: (tab: 'quotes' | 'customers' | 'kpis') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-title">ALL SOLUTIONS SpA</div>
        <span className="navbar-badge">RUT: 77.654.321-K</span>
        <span className="navbar-badge" style={{ background: '#10B981' }}>v2.0 Fase 2</span>
      </div>

      <nav className="navbar-tabs">
        <button
          className={`nav-tab ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          📄 Cotizaciones & PDF
        </button>
        <button
          className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          👤 Clientes & WhatsApp
        </button>
        <button
          className={`nav-tab ${activeTab === 'kpis' ? 'active' : ''}`}
          onClick={() => setActiveTab('kpis')}
        >
          📊 Dashboard KPIs
        </button>
      </nav>
    </header>
  );
};
