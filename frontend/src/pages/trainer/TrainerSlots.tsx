import React, { useMemo, useState } from 'react';
import {
  Ban,
  Calendar,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Pencil,
  Plus,
} from 'lucide-react';
import AddSlotModal from '../../components/trainer/slots/AddSlotModal';
import RescheduleSessionModal from '../../components/trainer/slots/RescheduleSessionModal';
import { showToast } from '../../components/common/Toast/Toast';
import type { SlotFormValues, SlotStatus, TrainerSlot } from '../../types/slot.types';
import '../../styles/SlotManagement.css';

const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const INITIAL_SLOTS: TrainerSlot[] = [
  { id: 's1', date: '2026-03-24', startTime: '09:00', endTime: '10:00', status: 'booked', mode: 'offline', clientName: 'Sarah J.' },
  { id: 's2', date: '2026-03-24', startTime: '10:30', endTime: '11:30', status: 'available', mode: 'online' },
  { id: 's3', date: '2026-03-25', startTime: '08:00', endTime: '09:00', status: 'available', mode: 'online' },
  { id: 's4', date: '2026-03-25', startTime: '14:00', endTime: '15:00', status: 'booked', mode: 'online', clientName: 'Michael C.' },
  { id: 's5', date: '2026-03-26', startTime: '09:00', endTime: '10:00', status: 'blocked', mode: 'offline' },
  { id: 's6', date: '2026-03-27', startTime: '11:00', endTime: '12:00', status: 'booked', mode: 'offline', clientName: 'Emily S.' },
  { id: 's7', date: '2026-03-27', startTime: '16:00', endTime: '17:00', status: 'available', mode: 'online' },
  { id: 's8', date: '2026-03-28', startTime: '08:00', endTime: '09:00', status: 'booked', mode: 'offline', clientName: 'Lisa A.' },
  { id: 's9', date: '2026-03-29', startTime: '10:00', endTime: '11:00', status: 'booked', mode: 'online', clientName: 'James W.' },
  { id: 's10', date: '2026-03-30', startTime: '09:00', endTime: '10:00', status: 'available', mode: 'online' },
];

const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseDateKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const formatWeekRange = (start: Date) => {
  const end = addDays(start, 6);
  const startLabel = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const endLabel = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return `${startLabel} - ${endLabel}`;
};

const formatSessionDate = (key: string) =>
  parseDateKey(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const TrainerSlots: React.FC = () => {
  const [weekStart, setWeekStart] = useState(() => parseDateKey('2026-03-24'));
  const [slots, setSlots] = useState<TrainerSlot[]>(INITIAL_SLOTS);
  const [addOpen, setAddOpen] = useState(false);
  const [addStatus, setAddStatus] = useState<SlotStatus>('available');
  const [editingSlot, setEditingSlot] = useState<TrainerSlot | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<TrainerSlot | null>(null);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const slotsByDate = useMemo(() => {
    const map: Record<string, TrainerSlot[]> = {};
    for (const slot of slots) {
      if (!map[slot.date]) map[slot.date] = [];
      map[slot.date].push(slot);
    }
    Object.values(map).forEach((list) =>
      list.sort((a, b) => a.startTime.localeCompare(b.startTime))
    );
    return map;
  }, [slots]);

  const upcomingBooked = useMemo(
    () =>
      [...slots]
        .filter((slot) => slot.status === 'booked')
        .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)),
    [slots]
  );

  const handleSaveSlot = (values: SlotFormValues) => {
    if (editingSlot) {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === editingSlot.id
            ? { ...slot, ...values, clientName: slot.clientName }
            : slot
        )
      );
      showToast.success('Slot updated');
    } else {
      const newSlot: TrainerSlot = {
        id: `slot-${Date.now()}`,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        mode: values.mode,
        status: values.status,
        notes: values.notes,
      };
      setSlots((prev) => [...prev, newSlot]);
      showToast.success(values.status === 'blocked' ? 'Time blocked' : 'Slot added');
    }
    setAddOpen(false);
    setEditingSlot(null);
  };

  const handleReschedule = (values: SlotFormValues) => {
    if (!rescheduleSlot) return;
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === rescheduleSlot.id
          ? {
              ...slot,
              date: values.date,
              startTime: values.startTime,
              endTime: values.endTime,
              mode: values.mode,
              notes: values.notes,
            }
          : slot
      )
    );
    showToast.success(`Session with ${rescheduleSlot.clientName} rescheduled`);
    setRescheduleSlot(null);
  };

  const handleCancelSession = () => {
    if (!rescheduleSlot) return;
    setSlots((prev) => prev.filter((slot) => slot.id !== rescheduleSlot.id));
    showToast.success('Session cancelled');
    setRescheduleSlot(null);
  };

  const openAdd = (status: SlotStatus = 'available') => {
    setEditingSlot(null);
    setAddStatus(status);
    setAddOpen(true);
  };

  const openEdit = (slot: TrainerSlot) => {
    if (slot.status === 'booked') {
      setRescheduleSlot(slot);
      return;
    }
    setEditingSlot(slot);
    setAddOpen(true);
  };

  return (
    <div className="sm-page">
      <div className="sm-page-header">
        <div>
          <h1>Slot Management</h1>
          <p>Welcome back, Coach!</p>
        </div>
      </div>

      <section className="sm-calendar-card">
        <div className="sm-calendar-toolbar">
          <div className="sm-week-nav">
            <button
              type="button"
              className="sm-week-nav-btn"
              onClick={() => setWeekStart((prev) => addDays(prev, -7))}
              aria-label="Previous week"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="sm-week-label">{formatWeekRange(weekStart)}</div>
            <button
              type="button"
              className="sm-week-nav-btn"
              onClick={() => setWeekStart((prev) => addDays(prev, 7))}
              aria-label="Next week"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="sm-toolbar-right">
            <div className="sm-legend">
              <span className="sm-legend-item">
                <span className="sm-legend-dot available" /> Available
              </span>
              <span className="sm-legend-item">
                <span className="sm-legend-dot booked" /> Booked
              </span>
              <span className="sm-legend-item">
                <span className="sm-legend-dot blocked" /> Blocked
              </span>
            </div>
            <div className="sm-toolbar-actions">
              <button type="button" className="sm-btn sm-btn-ghost" onClick={() => openAdd('blocked')}>
                <Ban size={16} />
                Block Time
              </button>
              <button type="button" className="sm-btn sm-btn-primary" onClick={() => openAdd('available')}>
                <Plus size={16} />
                Add Slot
              </button>
            </div>
          </div>
        </div>

        <div className="sm-week-grid">
          {weekDays.map((day, index) => {
            const key = toDateKey(day);
            const daySlots = slotsByDate[key] || [];
            return (
              <div key={key} className="sm-day-col">
                <div className="sm-day-head">
                  <span className="sm-day-name">{DAY_LABELS[index]}</span>
                  <span className="sm-day-num">{day.getDate()}</span>
                </div>
                <div className="sm-day-slots">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      className={`sm-slot-pill ${slot.status}`}
                      onClick={() => openEdit(slot)}
                    >
                      {slot.startTime}
                      {slot.status === 'booked' && slot.clientName && (
                        <span className="sm-slot-pill-client"> {slot.clientName}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="sm-sessions-card">
        <div className="sm-sessions-header">
          <h2>Upcoming Booked Sessions</h2>
          <span className="sm-count-badge">
            {upcomingBooked.length} session{upcomingBooked.length === 1 ? '' : 's'}
          </span>
        </div>

        {upcomingBooked.length === 0 ? (
          <div className="sm-empty">No booked sessions this period.</div>
        ) : (
          <div className="sm-session-list">
            {upcomingBooked.map((slot) => (
              <div key={slot.id} className="sm-session-row">
                <div className="sm-session-icon">
                  <Calendar size={18} />
                </div>
                <div className="sm-session-body">
                  <h3>{slot.clientName}</h3>
                  <div className="sm-session-meta">
                    <span>
                      {formatSessionDate(slot.date)} • {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="sm-session-meta-item">
                      {slot.mode === 'offline' ? <MapPin size={13} /> : <MessageCircle size={13} />}
                      {slot.mode === 'offline' ? 'In-Person' : 'Online'}
                    </span>
                  </div>
                </div>
                <div className="sm-session-actions">
                  <span className={`sm-mode-chip ${slot.mode}`}>
                    {slot.mode === 'offline' ? 'offline' : 'online'}
                  </span>
                  <button
                    type="button"
                    className="sm-btn-reschedule"
                    onClick={() => setRescheduleSlot(slot)}
                  >
                    <CalendarPlus size={14} />
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="sm-btn-edit"
                    onClick={() => setRescheduleSlot(slot)}
                    aria-label="Edit session"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <AddSlotModal
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setEditingSlot(null);
        }}
        onSave={handleSaveSlot}
        initialSlot={editingSlot}
        defaultStatus={addStatus}
      />

      <RescheduleSessionModal
        isOpen={Boolean(rescheduleSlot)}
        slot={rescheduleSlot}
        onClose={() => setRescheduleSlot(null)}
        onConfirm={handleReschedule}
        onCancelSession={handleCancelSession}
      />
    </div>
  );
};

export default TrainerSlots;
