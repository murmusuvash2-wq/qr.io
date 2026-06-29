// src/pages/ToolShell.tsx
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { QR_TOOLS } from '../data/tools-database';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { useEffect } from 'react';

export default function ToolShell() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, onOpenPayModal } = useOutletContext<{ user: any, onOpenPayModal: () => void }>();
  
  // Find tool by slug
  const tool = QR_TOOLS.find((t: any) => t.slug === slug || t.id === slug);
  
  // Redirect to first tool if slug invalid
  useEffect(() => {
    if (!tool) navigate('/', { replace: true });
  }, [slug, tool, navigate]);
  
  // Update document title for SEO
  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} | Free QR Code Generator | EzQR.io`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', tool.description);
    }
  }, [tool]);
  
  if (!tool) return null;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": tool.name,
          "description": tool.description,
          "operatingSystem": "Web",
          "browserRequirements": "Requires JavaScript"
        })}
      </script>
      
      {/* Reuse existing QRCodeGenerator */}
      <QRCodeGenerator 
        tool={tool}
        user={user}
        onOpenPayModal={onOpenPayModal}
      />
    </div>
  );
}
