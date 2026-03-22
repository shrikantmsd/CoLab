'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ColabApp = dynamic(
  () => import('../components/ctd-regulatory-assistant'),
  {
    ssr: false,
    loading: () => (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',gap:'16px'}}>
        <div style={{width:'48px',height:'48px',border:'3px solid #D4D4D4',borderTop:'3px solid #2B579A',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
        <div style={{color:'#5D5D5D',fontSize:'14px'}}>Loading CoLAB...</div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    ),
  }
);

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_ACCESS_PASSWORD || 'colab2026';

const plans = [
  {
    name: 'Starter', price: '$199', cycle: '/mo',
    desc: 'Solo RA consultants & small teams',
    features: ['1 user · 5 countries','CTD/ACTD checklists','Product registration','Email support'],
    highlight: false,
  },
  {
    name: 'Professional', price: '$499', cycle: '/mo',
    desc: 'RA consultancies & generics manufacturers',
    features: ['5 users · 128+ countries','AI Document Review','ICH M4Q(R2) access','PV + eCTD modules','24h video support'],
    highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', cycle: '',
    desc: 'Innovator pharma with global needs',
    features: ['Unlimited users','White-label option','GAMP5 validation','API access + SLA'],
    highlight: false,
  },
];

export default function Home() {
  const [screen, setScreen] = useState('loading'); // loading | pricing | login | app
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Check if already authenticated this session
    const auth = sessionStorage.getItem('colab_auth');
    if (auth === 'true') {
      setScreen('app');
    } else {
      setScreen('pricing');
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('colab_auth', 'true');
      setScreen('app');
      setError('');
    } else {
      setError('Incorrect access code. Contact info@msregroup.com to purchase access.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('colab_auth');
    setScreen('pricing');
  }

  // ── LOADING ──────────────────────────────────────────────────────────────
  if (screen === 'loading') {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#F0F0F0'}}>
        <div style={{width:'36px',height:'36px',border:'3px solid #D4D4D4',borderTop:'3px solid #2B579A',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // ── THE APP ──────────────────────────────────────────────────────────────
  if (screen === 'app') {
    return (
      <div style={{position:'relative'}}>
        <button
          onClick={handleLogout}
          style={{position:'fixed',top:'8px',right:'12px',zIndex:9999,background:'rgba(43,87,154,0.9)',color:'#fff',border:'none',borderRadius:'4px',padding:'5px 12px',fontSize:'11px',cursor:'pointer',backdropFilter:'blur(4px)'}}
        >
          Sign out
        </button>
        <ColabApp />
      </div>
    );
  }

  // ── PRICING PAGE ─────────────────────────────────────────────────────────
  if (screen === 'pricing') {
    return (
      <div style={{minHeight:'100vh',background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',paddingBottom:'60px'}}>
        {/* Nav */}
        <div style={{background:'#2B579A',color:'#fff',padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{fontSize:'18px',fontWeight:'700',letterSpacing:'1px'}}>CoLAB</span>
            <span style={{fontSize:'11px',opacity:.7,borderLeft:'1px solid rgba(255,255,255,0.35)',paddingLeft:'10px'}}>Regulatory Intelligence</span>
          </div>
          <button
            onClick={() => setScreen('login')}
            style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',padding:'6px 16px',borderRadius:'4px',cursor:'pointer',fontSize:'13px',fontWeight:'500'}}
          >
            I have an access code →
          </button>
        </div>

        {/* Hero */}
        <div style={{textAlign:'center',padding:'52px 24px 36px'}}>
          <div style={{display:'inline-block',background:'#e8f0fb',color:'#2B579A',fontSize:'11px',fontWeight:'700',padding:'4px 14px',borderRadius:'100px',marginBottom:'16px',letterSpacing:'0.06em'}}>
            14-DAY FREE TRIAL · NO CREDIT CARD REQUIRED
          </div>
          <h1 style={{fontSize:'clamp(26px,5vw,46px)',fontWeight:'700',color:'#1E1E1E',margin:'0 0 10px',letterSpacing:'-0.02em'}}>
            Simple, transparent pricing.
          </h1>
          <p style={{fontSize:'15px',color:'#5D5D5D',margin:'0 0 6px'}}>
            Choose your plan · We email you an access code within 24 hours.
          </p>
        </div>

        {/* Plans */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'14px',maxWidth:'960px',margin:'0 auto',padding:'0 24px'}}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? '#2B579A' : '#fff',
              color: plan.highlight ? '#fff' : '#1E1E1E',
              borderRadius:'14px', padding:'30px 26px',
              border: plan.highlight ? '2px solid #1D3D6E' : '1px solid #D4D4D4',
              boxShadow: plan.highlight ? '0 8px 32px rgba(43,87,154,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
              position:'relative',
            }}>
              {plan.highlight && (
                <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#107C10',color:'#fff',fontSize:'10px',fontWeight:'700',padding:'3px 12px',borderRadius:'100px',whiteSpace:'nowrap',letterSpacing:'0.05em'}}>
                  MOST POPULAR
                </div>
              )}
              <div style={{fontSize:'11px',fontWeight:'700',opacity:.55,letterSpacing:'0.1em',marginBottom:'8px',textTransform:'uppercase'}}>{plan.name}</div>
              <div style={{marginBottom:'4px'}}>
                <span style={{fontSize:'44px',fontWeight:'700',letterSpacing:'-0.03em'}}>{plan.price}</span>
                <span style={{fontSize:'13px',opacity:.6}}>{plan.cycle}</span>
              </div>
              <div style={{fontSize:'13px',opacity:.65,marginBottom:'18px',lineHeight:'1.5'}}>{plan.desc}</div>
              <div style={{height:'1px',background:plan.highlight?'rgba(255,255,255,0.15)':'#EBEBEB',marginBottom:'16px'}}/>
              {plan.features.map(f => (
                <div key={f} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'13px',marginBottom:'9px',opacity:plan.highlight?.9:.7}}>
                  <span style={{width:'15px',height:'15px',borderRadius:'50%',flexShrink:0,background:plan.highlight?'rgba(255,255,255,0.2)':'#e8f0fb',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'8px',color:plan.highlight?'#fff':'#2B579A',marginTop:'1px'}}>✓</span>
                  {f}
                </div>
              ))}
              <a
                href={`mailto:info@msregroup.com?subject=CoLAB ${plan.name} Plan - Access Request`}
                style={{display:'block',marginTop:'22px',padding:'11px',borderRadius:'7px',textAlign:'center',fontWeight:'600',fontSize:'13px',textDecoration:'none',background:plan.highlight?'#fff':'#2B579A',color:plan.highlight?'#2B579A':'#fff'}}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Request Access →'}
              </a>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',marginTop:'28px',fontSize:'12px',color:'#A8A8A8'}}>
          Use code <strong style={{color:'#2B579A'}}>FOUNDER10</strong> for 10% off · All prices USD · Annual billing saves 2 months
        </div>
      </div>
    );
  }

  // ── LOGIN / ACCESS CODE ──────────────────────────────────────────────────
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',padding:'24px'}}>
      <div style={{textAlign:'center',marginBottom:'28px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'#2B579A',color:'#fff',padding:'8px 20px',borderRadius:'6px',marginBottom:'12px'}}>
          <span style={{fontSize:'18px',fontWeight:'700',letterSpacing:'1px'}}>CoLAB</span>
          <span style={{fontSize:'11px',opacity:.8,borderLeft:'1px solid rgba(255,255,255,0.35)',paddingLeft:'10px'}}>Regulatory Intelligence</span>
        </div>
        <div style={{fontSize:'14px',color:'#5D5D5D'}}>Enter your access code to continue</div>
      </div>

      <form
        onSubmit={handleLogin}
        style={{
          background:'#fff', borderRadius:'12px', padding:'32px 28px',
          border:'1px solid #D4D4D4', boxShadow:'0 4px 20px rgba(0,0,0,0.08)',
          width:'100%', maxWidth:'360px',
          animation: shake ? 'shake 0.4s ease' : 'none',
        }}
      >
        <label style={{fontSize:'12px',fontWeight:'600',color:'#5D5D5D',letterSpacing:'0.05em',textTransform:'uppercase',display:'block',marginBottom:'8px'}}>
          Access Code
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your access code"
          autoFocus
          style={{width:'100%',padding:'11px 14px',border:'1.5px solid #D4D4D4',borderRadius:'7px',fontSize:'14px',fontFamily:'Segoe UI,sans-serif',outline:'none',boxSizing:'border-box',marginBottom:'14px'}}
          onFocus={e => e.target.style.borderColor='#2B579A'}
          onBlur={e => e.target.style.borderColor='#D4D4D4'}
        />
        {error && (
          <div style={{fontSize:'12px',color:'#C50F1F',marginBottom:'12px',lineHeight:'1.5',background:'#FFF0F0',padding:'8px 10px',borderRadius:'5px',border:'1px solid #FFD0D0'}}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{width:'100%',padding:'11px',background:'#2B579A',color:'#fff',border:'none',borderRadius:'7px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
        >
          Enter CoLAB →
        </button>
        <div style={{textAlign:'center',marginTop:'16px',fontSize:'12px',color:'#A8A8A8'}}>
          Don't have a code?{' '}
          <span style={{color:'#2B579A',cursor:'pointer',fontWeight:'500'}} onClick={() => setScreen('pricing')}>
            View pricing
          </span>
        </div>
      </form>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  );
}
