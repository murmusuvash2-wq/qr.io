// src/layouts/AppShell.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout';
import { Footer } from '../design-system';
import { ToastContainer, SkipLink } from '../components/ui';
import { LayoutDashboard, Sparkles, Layers } from 'lucide-react';
import SaaSPaymentModal from '../components/SaaSPaymentModal';
import { useAppContext } from '../contexts/AppContext';

export default function AppShell() {
  const navigate = useNavigate();
  const { user, isPayModalOpen, setPayModalOpen, onPaymentSuccess } = useAppContext();
  
  return (
    <div className="min-h-screen bg-[#040408] text-[#F2F2FF] font-sans">
      <SkipLink />
      <ToastContainer />
      <Header 
        brandName="EzQR"
        links={[
          { label: "Dashboard", onClick: () => navigate('/dashboard'), icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
          { label: "Design Packs", onClick: () => navigate('/design-packs'), icon: <Sparkles className="w-3.5 h-3.5" /> },
          { label: "Assets", onClick: () => navigate('/assets'), icon: <Layers className="w-3.5 h-3.5" /> }
        ]}
        onSearch={(q) => navigate(`/tool/${q}`)}
        onGetStarted={() => setPayModalOpen(true)}
      />
      <main id="main-content">
        <Outlet context={{ user, onOpenPayModal: () => setPayModalOpen(true) }} />
      </main>
      <Footer />
      {isPayModalOpen && <SaaSPaymentModal isOpen={isPayModalOpen} onClose={() => setPayModalOpen(false)} initialUser={user} onPaymentSuccess={onPaymentSuccess} />}
    </div>
  );
}
