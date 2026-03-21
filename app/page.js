'use client';

import dynamic from 'next/dynamic';

// Load the CoLAB app client-side only (it uses browser APIs)
const ColabApp = dynamic(
  () => import('../components/ctd-regulatory-assistant'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#F0F0F0',
        fontFamily: 'Segoe UI, sans-serif',
        gap: '16px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #D4D4D4',
          borderTop: '3px solid #2B579A',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <div style={{ color: '#5D5D5D', fontSize: '14px' }}>
          Loading CoLAB Regulatory Intelligence...
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    ),
  }
);

export default function Home() {
  return <ColabApp />;
}
