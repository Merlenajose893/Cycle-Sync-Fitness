import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';
import '../../styles/UserPages.css';

const contacts = [
  { id: '1', name: 'Coach Sarah Miller', lastMsg: 'Great progress this week! Keep it up 💪', time: '2m ago', unread: true, gradient: 'linear-gradient(135deg, #2563eb, #06b6d4)', initials: 'SM', online: true },
  { id: '2', name: 'Dr. Emily Chen', lastMsg: 'Your cycle data looks normal. Next check-in...', time: '1h ago', unread: true, gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)', initials: 'EC', online: false },
  { id: '3', name: 'Nutritionist Alex', lastMsg: "I've updated your meal plan for the luteal phase", time: '3h ago', unread: false, gradient: 'linear-gradient(135deg, #f97316, #eab308)', initials: 'NA', online: true },
  { id: '4', name: 'Yoga Coach Priya', lastMsg: 'See you in tomorrow\'s session!', time: 'Yesterday', unread: false, gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', initials: 'YP', online: false },
];

const chatMessages = [
  { id: 1, text: 'Hi Coach! I completed my upper body workout today. Feeling stronger!', sent: true, time: '10:30 AM' },
  { id: 2, text: "That's amazing! How did the bench press feel? Were you able to increase the weight?", sent: false, time: '10:32 AM' },
  { id: 3, text: 'Yes! I went from 30kg to 35kg for 3 sets of 8. It was tough but I managed.', sent: true, time: '10:35 AM' },
  { id: 4, text: "Great progress this week! Keep it up 💪 Remember to focus on form over weight. I've adjusted tomorrow's workout to include more recovery exercises since you're in your luteal phase.", sent: false, time: '10:38 AM' },
  { id: 5, text: 'Thank you! Should I adjust my nutrition too?', sent: true, time: '10:40 AM' },
  { id: 6, text: "Good thinking! Try increasing your complex carbs by about 10-15% this week. Add foods rich in magnesium like dark chocolate, spinach, and almonds. This helps with energy and reduces cramping.", sent: false, time: '10:42 AM' },
];

const Messages: React.FC = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [newMsg, setNewMsg] = useState('');
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="up-page">
      <div className="up-messages-layout">
        <div className="up-contacts-panel">
          <div className="up-contacts-header">
            <h3>Messages</h3>
            <div className="up-search" style={{ marginBottom: 0 }}>
              <Search size={16} className="up-search-icon" />
              <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '10px 16px 10px 38px', fontSize: '0.85rem' }} />
            </div>
          </div>
          <div className="up-contacts-list">
            {filtered.map(c => (
              <div key={c.id} className={`up-contact-item ${activeContact.id === c.id ? 'active' : ''}`} onClick={() => setActiveContact(c)}>
                <div className="up-contact-avatar" style={{ background: c.gradient }}>{c.initials}</div>
                <div className="up-contact-info"><h4>{c.name}</h4><p>{c.lastMsg}</p></div>
                <div className="up-contact-meta">
                  <span>{c.time}</span>
                  {c.unread && <div className="up-unread-dot" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="up-chat-panel">
          <div className="up-chat-header">
            <div className="up-contact-avatar" style={{ background: activeContact.gradient, width: 38, height: 38, fontSize: '0.8rem' }}>{activeContact.initials}</div>
            <div style={{ flex: 1 }}><h3>{activeContact.name}</h3>{activeContact.online && <span>● Online</span>}</div>
            <button className="up-btn up-btn-sm"><Phone size={16} /></button>
            <button className="up-btn up-btn-sm"><Video size={16} /></button>
            <button className="up-btn up-btn-sm"><MoreVertical size={16} /></button>
          </div>

          <div className="up-chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`up-message ${msg.sent ? 'sent' : 'received'}`}>
                <div className="up-message-bubble">{msg.text}</div>
                <div className="up-message-time">{msg.time}</div>
              </div>
            ))}
          </div>

          <div className="up-chat-input">
            <input placeholder="Type a message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && setNewMsg('')} />
            <button onClick={() => setNewMsg('')}><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
