import React from 'react';
import { Link } from 'react-router-dom';
import { Mail ,ShieldCheck} from 'lucide-react';
// import { Instagram, Twitter, Youtube, Facebook, Mail, Shield, ShieldCheck } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer 
      style={{
        background: 'var(--bg-dark, #0F172A)',
        color: '#94A3B8',
        padding: '80px 24px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '60px',
        }}
      >
        {/* Branding Column */}
        <div style={{ gridColumn: 'span 2', minWidth: '250px' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              textDecoration: 'none',
              marginBottom: '20px'
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.25rem',
              }}
            >
              C
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
              CycleSync <span style={{ color: '#8B5CF6' }}>AI</span>
            </span>
          </Link>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px', color: '#94A3B8' }}>
            The gold standard of cycle-synced fitness and health optimization. Tailored workouts, nutrition, and metabolic mapping engineered around your biology.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" aria-label="Instagram" style={socialLinkStyle}><FaInstagram size={18} /></a>
            <a href="#" aria-label="Twitter" style={socialLinkStyle}><FaTwitter size={18} /></a>
            <a href="#" aria-label="LinkedIn" style={socialLinkStyle}><FaLinkedin size={18} /></a>
            <a href="#" aria-label="Facebook" style={socialLinkStyle}><FaFacebook size={18} /></a>
          </div>
        </div>

        {/* Column 2 - Product */}
        <div>
          <h4 style={headingStyle}>Product</h4>
          <ul style={listStyle}>
            <li><Link to="/register" style={linkStyle}>AI Workout Plans</Link></li>
            <li><Link to="/register" style={linkStyle}>Nutrition Sync</Link></li>
            <li><Link to="/testimonials" style={linkStyle}>Success Stories</Link></li>
            <li><Link to="/premium" style={linkStyle}>Pricing Tiers</Link></li>
          </ul>
        </div>

        {/* Column 3 - Company */}
        <div>
          <h4 style={headingStyle}>Company</h4>
          <ul style={listStyle}>
            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li><Link to="/about" style={linkStyle}>Science & Methods</Link></li>
            <li><Link to="/contact" style={linkStyle}>Careers</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div style={{ minWidth: '220px' }}>
          <h4 style={headingStyle}>Stay Synced</h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
            Subscribe to receive phase-specific tips and product updates.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="Your email" 
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button 
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#2563EB',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '0.85rem',
        }}
      >
        <p>&copy; {new Date().getFullYear()} CycleSync AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/privacy" style={bottomLinkStyle}>Privacy Policy</Link>
          <Link to="/terms" style={bottomLinkStyle}>Terms of Service</Link>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
            <ShieldCheck size={14} /> HIPAA Compliant Data
          </span>
        </div>
      </div>
    </footer>
  );
};

const headingStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 700,
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '20px',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const linkStyle: React.CSSProperties = {
  color: '#94A3B8',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color 0.2s',
};

const bottomLinkStyle: React.CSSProperties = {
  color: '#94A3B8',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

const socialLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.03)',
  color: '#94A3B8',
  textDecoration: 'none',
  transition: 'all 0.2s',
};

export default Footer;
