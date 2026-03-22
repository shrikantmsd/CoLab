'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ColabApp = dynamic(() => import('../components/ctd-regulatory-assistant'), {
  ssr: false,
  loading: () => <Loader text="Loading CoLAB..."/>,
});

const ProjectManager = dynamic(() => import('../components/ProjectManager'), {
  ssr: false,
  loading: () => <Loader text="Loading Project Manager..."/>,
});

function Loader({ text }) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',
      background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',flexDirection:'column',gap:'16px'}}>
      <div style={{width:'40px',height:'40px',border:'3px solid #D4D4D4',borderTop:'3px solid #2B579A',
        borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <div style={{color:'#5D5D5D',fontSize:'14px'}}>{text}</div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const PASSWORD = process.env.NEXT_PUBLIC_ACCESS_PASSWORD || 'colab2026';

export default function Home() {
  const [status, setStatus] = useState('checking');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('checklist');

  useEffect(() => {
    const ok = sessionStorage.getItem('colab_ok');
    setStatus(ok === 'true' ? 'app' : 'login');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem('colab_ok', 'true');
      setStatus('app');
    } else {
      setError('Incorrect access code. Contact info@msregroup.com to get access.');
      setInput('');
    }
  }

  if (status === 'checking') return null;

  if (status === 'app') return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden'}}>
      {/* Tab bar */}
      <div style={{background:'#1D3D6E',display:'flex',alignItems:'center',gap:'2px',padding:'0 8px',flexShrink:0}}>
        {[
          { id: 'checklist', label: '⚗️ Checklist & Review' },
          { id: 'projects',  label: '📁 Project Manager' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding:'10px 18px', border:'none', cursor:'pointer',
              background: activeTab === tab.id ? '#2B579A' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize:'12px', fontWeight: activeTab === tab.id ? 600 : 400,
              fontFamily:'Segoe UI,sans-serif',
              borderBottom: activeTab === tab.id ? '2px solid #fff' : '2px solid transparent',
              transition:'all .15s',
            }}>
            {tab.label}
          </button>
        ))}
        <button onClick={() => { sessionStorage.removeItem('colab_ok'); setStatus('login'); }}
          style={{marginLeft:'auto',background:'rgba(255,255,255,0.1)',border:'none',color:'rgba(255,255,255,0.6)',
            padding:'5px 12px',borderRadius:'4px',cursor:'pointer',fontSize:'11px',fontFamily:'Segoe UI,sans-serif'}}>
          Sign out
        </button>
      </div>

      {/* Tab content */}
      <div style={{flex:1,overflow:'hidden'}}>
        {activeTab === 'checklist' && <ColabApp />}
        {activeTab === 'projects'  && <ProjectManager userId="user_default" />}
      </div>
    </div>
  );

  // Login screen
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'360px'}}>
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'#2B579A',
            color:'#fff',padding:'8px 20px',borderRadius:'6px',marginBottom:'10px'}}>
            <span style={{fontSize:'18px',fontWeight:'700',letterSpacing:'1px'}}>CoLAB</span>
            <span style={{fontSize:'11px',opacity:.8,borderLeft:'1px solid rgba(255,255,255,0.35)',paddingLeft:'10px'}}>
              Regulatory Intelligence
            </span>
          </div>
          <div style={{fontSize:'13px',color:'#5D5D5D'}}>Enter your access code to continue</div>
        </div>
        <form onSubmit={handleSubmit} style={{background:'#fff',borderRadius:'12px',padding:'28px',
          border:'1px solid #D4D4D4',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
          <label style={{fontSize:'11px',fontWeight:'600',color:'#5D5D5D',letterSpacing:'0.05em',
            textTransform:'uppercase',display:'block',marginBottom:'8px'}}>Access Code</label>
          <input type="password" value={input} onChange={e => { setInput(e.target.value); setError(''); }}
            placeholder="Enter your access code" autoFocus
            style={{width:'100%',padding:'11px 14px',border:'1.5px solid #D4D4D4',borderRadius:'7px',
              fontSize:'14px',outline:'none',boxSizing:'border-box',marginBottom:'12px',
              fontFamily:'Segoe UI,sans-serif'}} />
          {error && <div style={{fontSize:'12px',color:'#C50F1F',background:'#FFF0F0',border:'1px solid #FFD0D0',
            borderRadius:'5px',padding:'8px 10px',marginBottom:'12px',lineHeight:'1.5'}}>{error}</div>}
          <button type="submit" style={{width:'100%',padding:'11px',background:'#2B579A',color:'#fff',
            border:'none',borderRadius:'7px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
            Enter CoLAB →
          </button>
          <div style={{textAlign:'center',marginTop:'14px',fontSize:'12px',color:'#A8A8A8'}}>
            Need access? Email <a href="mailto:info@msregroup.com" style={{color:'#2B579A'}}>info@msregroup.com</a>
          </div>
        </form>
      </div>
    </div>
  );
}
