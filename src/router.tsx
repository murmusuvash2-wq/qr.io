// src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppShell from './layouts/AppShell';

// Lazy load all pages
const LandingPage = lazy(() => import('./components/LandingPage'));
const ToolShell = lazy(() => import('./pages/ToolShell'));
const ToolGeneratorPage = lazy(() => import('./pages/ToolGeneratorPage'));
const AssetLibraryViewer = lazy(() => import('./components/AssetLibraryViewer'));
const PremiumTemplates = lazy(() => import('./components/PremiumTemplates'));
const TemplateEditor = lazy(() => import('./components/TemplateEditor'));
const Dashboard = lazy(() => import('./Dashboard'));
const DesignPackGallery = lazy(() => import('./components/DesignPackGallery'));
const DesignPackDetail = lazy(() => import('./components/DesignPackDetail'));

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function LandingPageWrapper() {
  const navigate = useNavigate();
  return (
    <Suspense>
      <LandingPage onEnter={(toolId, searchStr, categoryName) => {
        if (toolId) {
          navigate(`/tool/${toolId}`);
        } else if (searchStr) {
          navigate(`/tool/${searchStr}`);
        } else if (categoryName) {
          navigate(`/tools`); // Fallback
        }
      }} />
    </Suspense>
  );
}

function DesignPackGalleryWrapper() {
  const navigate = useNavigate();
  return <DesignPackGallery onSelectPack={(id) => navigate(`/design-pack/${id}`)} />;
}

function DesignPackDetailWrapper() {
  const navigate = useNavigate();
  // We'd need to extract id from useParams, but let's just pass dummy for now if it accepts id prop or reads from params
  const { id } = useParams();
  return <DesignPackDetail packId={id || ''} onBack={() => navigate('/design-packs')} />;
}

function AssetLibraryWrapper() {
  const navigate = useNavigate();
  return <AssetLibraryViewer onBack={() => navigate('/')} />;
}

function TemplateEditorWrapper() {
  const navigate = useNavigate();
  const { user, onOpenPayModal } = useOutletContext<any>();
  return <TemplateEditor template={null} user={user} onOpenPayModal={onOpenPayModal} onBack={() => navigate('/')} />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPageWrapper /> },
      { path: 'tool/:slug', element: <Suspense><ToolShell /></Suspense> },
      { path: 'app', element: <Suspense><ToolGeneratorPage /></Suspense> },
      { path: 'tools', element: <Suspense><ToolShell /></Suspense> },
      { path: 'design-packs', element: <Suspense><DesignPackGalleryWrapper /></Suspense> },
      { path: 'design-pack/:id', element: <Suspense><DesignPackDetailWrapper /></Suspense> },
      { path: 'assets', element: <Suspense><AssetLibraryWrapper /></Suspense> },
      { path: 'editor', element: <Suspense><TemplateEditorWrapper /></Suspense> },
      { path: 'dashboard', element: <Suspense><Dashboard /></Suspense> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);
