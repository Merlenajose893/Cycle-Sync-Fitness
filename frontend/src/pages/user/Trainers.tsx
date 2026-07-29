import React, { useState } from 'react';
import { Search, Star, MapPin, Award, Users, MessageCircle } from 'lucide-react';
import '../../styles/UserPages.css';

const trainers = [
  { id: '1', name: 'Sarah Miller', specialty: 'Strength & Conditioning', rating: 4.9, clients: 24, experience: '8 years', location: 'New York, NY', initials: 'SM', bio: 'Certified strength coach specializing in women\'s fitness and hormonal health optimization.' },
  { id: '2', name: 'Dr. Emily Chen', specialty: 'Sports Nutrition', rating: 4.8, clients: 18, experience: '12 years', location: 'Los Angeles, CA', initials: 'EC', bio: 'PhD in Sports Science with focus on cycle-synced nutrition and performance.' },
  { id: '3', name: 'Alex Rodriguez', specialty: 'HIIT & Cardio', rating: 4.7, clients: 32, experience: '6 years', location: 'Miami, FL', initials: 'AR', bio: 'High-intensity training expert helping women achieve peak cardiovascular fitness.' },
  { id: '4', name: 'Priya Sharma', specialty: 'Yoga & Mobility', rating: 5.0, clients: 15, experience: '10 years', location: 'Austin, TX', initials: 'PS', bio: 'Yoga therapist integrating cycle awareness with traditional practices.' },
  { id: '5', name: 'Jordan Williams', specialty: 'Weight Management', rating: 4.6, clients: 28, experience: '7 years', location: 'Chicago, IL', initials: 'JW', bio: 'Holistic approach to sustainable weight management and body composition.' },
  { id: '6', name: 'Lisa Park', specialty: 'Pre/Postnatal Fitness', rating: 4.9, clients: 20, experience: '9 years', location: 'Seattle, WA', initials: 'LP', bio: 'Specialized in safe fitness programs for pregnancy and postpartum recovery.' },
];

const gradients = [
  'linear-gradient(135deg, #2563eb, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'linear-gradient(135deg, #f97316, #eab308)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #22c55e, #14b8a6)',
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
];

const Trainers: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = trainers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.specialty.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="up-page">
      <div className="up-page-header">
        <div><h1>Find a Trainer</h1><p>Connect with certified fitness professionals</p></div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div className="up-search" style={{ flex: 1, marginBottom: 0 }}>
          <Search size={18} className="up-search-icon" />
          <input placeholder="Search by name or specialty..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="up-trainer-grid">
        {filtered.map((t, i) => (
          <div key={t.id} className="up-card up-trainer-card">
            <div className="up-trainer-cover" style={{ background: gradients[i % gradients.length] }} />
            <div className="up-trainer-avatar-lg" style={{ background: gradients[i % gradients.length] }}>{t.initials}</div>
            <h3>{t.name}</h3>
            <div className="specialty">{t.specialty}</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '8px 20px 0', lineHeight: 1.5 }}>{t.bio}</p>

            <div className="up-trainer-stats">
              <div className="up-trainer-stat"><span className="val" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={14} style={{ color: '#f59e0b' }} />{t.rating}</span><span className="lbl">Rating</span></div>
              <div className="up-trainer-stat"><span className="val">{t.clients}</span><span className="lbl">Clients</span></div>
              <div className="up-trainer-stat"><span className="val">{t.experience}</span><span className="lbl">Experience</span></div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, margin: '0 0 4px' }}><MapPin size={13} />{t.location}</p>

            <div className="up-trainer-card-footer">
              <button className="up-btn up-btn-sm"><MessageCircle size={14} /> Message</button>
              <button className="up-btn up-btn-sm up-btn-primary"><Users size={14} /> Book Session</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
