'use client';
import { useRouter } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';

const plans = [
  {
    name: 'Starter', price: '$199', cycle: '/month',
    desc: 'For solo RA consultants and small teams.',
    features: ['1 user · 5 countries','CTD/ACTD checklists','Product registration module','Quarterly content updates','Email support (48h)'],
    cta: 'Start Free Trial', highlight: false,
    mailto: 'mailto:info@msregroup.com?subject=CoLAB Starter Plan',
  },
  {
    name: 'Professional', price: '$499', cycle: '/month',
    desc: 'For RA consultancies and generics manufacturers.',
    features: ['5 users · All 128+ countries','All modules: PV, Site Reg, eCTD','AI Document Review (40+ types)','ICH M4Q(R2) preview access','Monthly updates + change alerts','Video call support (24h)'],
    cta: 'Start Free Trial →', highlight: true,
    mailto: 'mailto:info@msregroup.com?subject=CoLAB Professional Plan',
  },
  {
    name: 'Enterprise', price: 'Custom', cycle: '',
    desc: 'For mid-size innovator pharma with global needs.',
    features: ['Unlimited users · White-label','GAMP5 validation pack','SOC 2 documentation','Veeva / SharePoint integration','REST API access','Dedicated support + SLA'],
    cta: 'Contact Sales', highlight: false,
    mailto: 'mailto:info@msregroup.com?subject=CoLAB Enterprise Plan',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user } = useUser();
  return (
    <div style={{minHeight:'100vh',background:'#F0F0F0',fontFamily:'Segoe UI,sans-serif',paddingBottom:'60px'}}>
      <div style={{background:'#2B579A',color:'#fff',padding:'12px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontSize:'18px',fontWeight:'700',letterSpacing:'1px'}}>CoLAB</span>
          <span style={{fontSize:'11px',opacity:.7,borderLeft:'1px solid rgba(255,255,255,0.4)',paddingLeft:'10px'}}>Regulatory Intelligence</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'16px',fontSize:'13px'}}>
          {user && <span style={{opacity:.8}}>{user.emailAddresses[0]?.emailAddress}</span>}
          <SignOutButton>
            <button style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',padding:'5px 14px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>Sign out</button>
          </SignOutButton>
        </div>
      </div>
      <div style={{textAlign:'center',padding:'52px 24px 40px'}}>
        <div style={{display:'inline-block',background:'#e8f0fb',color:'#2B579A',fontSize:'12px',fontWeight:'600',padding:'4px 14px',borderRadius:'100px',marginBottom:'16px',letterSpacing:'0.04em'}}>14-DAY FREE TRIAL · NO CREDIT CARD REQUIRED</div>
        <h1 style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:'700',color:'#1E1E1E',margin:'0 0 12px',letterSpacing:'-0.02em'}}>Simple, transparent pricing.</h1>
        <p style={{fontSize:'16px',color:'#5D5D5D',margin:0}}>Choose your plan · Start building better submissions today.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px',maxWidth:'1000px',margin:'0 auto',padding:'0 24px'}}>
        {plans.map(plan => (
          <div key={plan.name} style={{background:plan.highlight?'#2B579A':'#fff',color:plan.highlight?'#fff':'#1E1E1E',borderRadius:'14px',padding:'32px 28px',border:plan.highlight?'2px solid #2B579A':'1px solid #D4D4D4',boxShadow:plan.highlight?'0 8px 32px rgba(43,87,154,0.25)':'0 2px 12px rgba(0,0,0,0.06)',position:'relative'}}>
            {plan.highlight && <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#107C10',color:'#fff',fontSize:'10px',fontWeight:'700',padding:'3px 14px',borderRadius:'100px',letterSpacing:'0.06em',whiteSpace:'nowrap'}}>MOST POPULAR</div>}
            <div style={{fontSize:'12px',fontWeight:'600',opacity:.6,letterSpacing:'0.08em',marginBottom:'8px',textTransform:'uppercase'}}>{plan.name}</div>
            <div style={{marginBottom:'4px'}}><span style={{fontSize:'48px',fontWeight:'700',letterSpacing:'-0.03em'}}>{plan.price}</span><span style={{fontSize:'14px',opacity:.6}}>{plan.cycle}</span></div>
            <div style={{fontSize:'13px',opacity:.7,marginBottom:'20px',lineHeight:'1.5'}}>{plan.desc}</div>
            <div style={{height:'1px',background:plan.highlight?'rgba(255,255,255,0.15)':'#E8E8E8',marginBottom:'20px'}}/>
            {plan.features.map(f => (
              <div key={f} style={{display:'flex',alignItems:'flex-start',gap:'9px',fontSize:'13px',marginBottom:'10px',opacity:plan.highlight?.9:.75}}>
                <span style={{width:'16px',height:'16px',borderRadius:'50%',flexShrink:0,background:plan.highlight?'rgba(255,255,255,0.2)':'#e8f0fb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',color:plan.highlight?'#fff':'#2B579A',marginTop:'1px'}}>✓</span>{f}
              </div>
            ))}
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'24px'}}>
              <button onClick={()=>router.push('/')} style={{width:'100%',padding:'11px',borderRadius:'7px',cursor:'pointer',fontSize:'14px',fontWeight:'600',background:plan.highlight?'#fff':'#2B579A',color:plan.highlight?'#2B579A':'#fff',border:'none'}}>
                {plan.cta}
              </button>
              <a href={plan.mailto} style={{display:'block',width:'100%',padding:'9px',borderRadius:'7px',fontSize:'12px',fontWeight:'500',textAlign:'center',background:'transparent',color:plan.highlight?'rgba(255,255,255,0.7)':'#5D5D5D',border:plan.highlight?'1px solid rgba(255,255,255,0.25)':'1px solid #D4D4D4',textDecoration:'none'}}>Contact us to purchase</a>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:'32px',fontSize:'12px',color:'#A8A8A8'}}>
        Use code <strong style={{color:'#2B579A'}}>FOUNDER10</strong> for 10% lifetime discount · Annual billing saves 2 months · All prices USD
      </div>
    </div>
  );
}
