import React, { useEffect, useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import type { SlotFormValues, TrainerSlot } from '../../../types/slot.types';

interface RescheduleSessionModalProps {
  isOpen: boolean;
  slot: TrainerSlot | null;
  onClose: () => void;
  onConfirm: (values: SlotFormValues) => void;
  onCancelSession: () => void;
}

const RescheduleSessionModal: React.FC<RescheduleSessionModalProps> = ({
  isOpen,
  slot,
  onClose,
  onConfirm,
  onCancelSession,
}) => {
  const [form, setForm] = useState<SlotFormValues | null>(null);

  useEffect(() => {
    if (!isOpen || !slot) return;
    setForm({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      mode: slot.mode,
      status: 'booked',
      clientName: slot.clientName,
      notes: '',
    });
  }, [isOpen, slot]);

  if (!isOpen || !slot || !form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sm-modal-header">
          <h2>Reschedule Session</h2>
          <button type="button" className="sm-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sm-alert">
          <Clock size={16} />
          <span>
            Rescheduling will notify <strong>{slot.clientName}</strong> of the changes.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="sm-form-grid">
            <div className="sm-field full">
              <label htmlFor="reschedule-date">Date</label>
              <div className="sm-input-wrap">
                <input
                  id="reschedule-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
                <Calendar size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="reschedule-start">Start Time</label>
              <div className="sm-input-wrap">
                <input
                  id="reschedule-start"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  required
                />
                <Clock size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="reschedule-end">End Time</label>
              <div className="sm-input-wrap">
                <input
                  id="reschedule-end"
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  required
                />
                <Clock size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="reschedule-mode">Mode</label>
              <div className="sm-input-wrap">
                <select
                  id="reschedule-mode"
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value as SlotFormValues['mode'] })}
                >
                  <option value="offline">In-Person</option>
                  <option value="online">Online</option>
                </select>
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="reschedule-status">Status</label>
              <div className="sm-input-wrap">
                <select id="reschedule-status" value="booked" disabled>
                  <option value="booked">Booked</option>
                </select>
              </div>
            </div>

            <div className="sm-field full">
              <label htmlFor="reschedule-client">Client Name</label>
              <div className="sm-input-wrap">
                <input id="reschedule-client" type="text" value={form.clientName || ''} disabled />
              </div>
            </div>

            <div className="sm-field full">
              <label htmlFor="reschedule-notes">Notes for Client</label>
              <textarea
                id="reschedule-notes"
                placeholder="Explain the reason for rescheduling..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="sm-modal-footer split">
            <button type="button" className="sm-btn-text-danger" onClick={onCancelSession}>
              Cancel Session
            </button>
            <div className="sm-footer-right">
              <button type="button" className="sm-btn sm-btn-ghost" onClick={onClose}>
                Back
              </button>
              <button type="submit" className="sm-btn sm-btn-primary">
                Confirm Reschedule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleSessionModal;
