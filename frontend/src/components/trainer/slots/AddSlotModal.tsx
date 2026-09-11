import React, { useEffect, useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import type { SlotFormValues, SlotStatus, TrainerSlot } from '../../../types/slot.types';

interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: SlotFormValues) => void;
  initialSlot?: TrainerSlot | null;
  defaultStatus?: SlotStatus;
}

const emptyForm = (status: SlotStatus = 'available'): SlotFormValues => ({
  date: '2026-03-24',
  startTime: '09:00',
  endTime: '10:00',
  mode: 'online',
  status,
  notes: '',
});

const AddSlotModal: React.FC<AddSlotModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSlot,
  defaultStatus = 'available',
}) => {
  const [form, setForm] = useState<SlotFormValues>(emptyForm(defaultStatus));
  const isEdit = Boolean(initialSlot);

  useEffect(() => {
    if (!isOpen) return;
    if (initialSlot) {
      setForm({
        date: initialSlot.date,
        startTime: initialSlot.startTime,
        endTime: initialSlot.endTime,
        mode: initialSlot.mode,
        status: initialSlot.status,
        notes: initialSlot.notes || '',
      });
    } else {
      setForm(emptyForm(defaultStatus));
    }
  }, [isOpen, initialSlot, defaultStatus]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sm-modal-header">
          <h2>{isEdit ? 'Edit Slot' : defaultStatus === 'blocked' ? 'Block Time' : 'Add New Slot'}</h2>
          <button type="button" className="sm-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="sm-form-grid">
            <div className="sm-field full">
              <label htmlFor="slot-date">Date</label>
              <div className="sm-input-wrap">
                <input
                  id="slot-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
                <Calendar size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="slot-start">Start Time</label>
              <div className="sm-input-wrap">
                <input
                  id="slot-start"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  required
                />
                <Clock size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="slot-end">End Time</label>
              <div className="sm-input-wrap">
                <input
                  id="slot-end"
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  required
                />
                <Clock size={16} className="sm-input-icon" />
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="slot-mode">Mode</label>
              <div className="sm-input-wrap">
                <select
                  id="slot-mode"
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value as SlotFormValues['mode'] })}
                >
                  <option value="online">Online</option>
                  <option value="offline">In-Person</option>
                </select>
              </div>
            </div>

            <div className="sm-field">
              <label htmlFor="slot-status">Status</label>
              <div className="sm-input-wrap">
                <select
                  id="slot-status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as SlotStatus })}
                  disabled={initialSlot?.status === 'booked'}
                >
                  <option value="available">Available</option>
                  <option value="blocked">Blocked</option>
                  {initialSlot?.status === 'booked' && <option value="booked">Booked</option>}
                </select>
              </div>
            </div>

            <div className="sm-field full">
              <label htmlFor="slot-notes">Notes for Client</label>
              <textarea
                id="slot-notes"
                placeholder="Add a note for this slot..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="sm-modal-footer">
            <button type="button" className="sm-btn sm-btn-ghost" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="sm-btn sm-btn-primary">
              {isEdit ? 'Save Changes' : defaultStatus === 'blocked' ? 'Block Time' : 'Add Slot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlotModal;
