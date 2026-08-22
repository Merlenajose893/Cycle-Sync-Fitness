import React, { useMemo } from 'react';
import { Calendar, Sparkles, AlertCircle } from 'lucide-react';
import './DateOfBirthPicker.css';

interface DateOfBirthPickerProps {
    value: string; // Expected format YYYY-MM-DD
    onChange: (dateStr: string) => void;
    error?: string | null;
    minAge?: number;
    label?: string;
    showLabel?: boolean;
    disabled?: boolean;
    className?: string;
}

const MONTHS = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
];

export const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({
    value,
    onChange,
    error,
    minAge = 13,
    label = 'Date of Birth',
    showLabel = true,
    disabled = false,
    className = '',
}) => {
    // Parse YYYY-MM-DD into components
    const { selectedYear, selectedMonth, selectedDay } = useMemo(() => {
        if (!value || typeof value !== 'string') {
            return { selectedYear: '', selectedMonth: '', selectedDay: '' };
        }
        const parts = value.split('-');
        if (parts.length === 3) {
            return {
                selectedYear: parts[0] || '',
                selectedMonth: parts[1] || '',
                selectedDay: parts[2] || '',
            };
        }
        return { selectedYear: '', selectedMonth: '', selectedDay: '' };
    }, [value]);

    // Compute range of valid birth years
    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear - minAge;
        const minYear = currentYear - 100;
        const years: number[] = [];
        for (let y = maxYear; y >= minYear; y--) {
            years.push(y);
        }
        return years;
    }, [minAge]);

    // Calculate maximum days in selected month & year
    const daysInMonth = useMemo(() => {
        if (!selectedMonth) return 31;
        const monthNum = parseInt(selectedMonth, 10);
        const yearNum = selectedYear ? parseInt(selectedYear, 10) : 2000; // default non-leap reference
        return new Date(yearNum, monthNum, 0).getDate();
    }, [selectedMonth, selectedYear]);

    // Day options list
    const dayOptions = useMemo(() => {
        const days: string[] = [];
        for (let d = 1; d <= daysInMonth; d++) {
            days.push(d < 10 ? `0${d}` : `${d}`);
        }
        return days;
    }, [daysInMonth]);

    // Calculate live age if full date is selected
    const calculatedAge = useMemo(() => {
        if (!selectedYear || !selectedMonth || !selectedDay) return null;
        const dob = new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`);
        if (isNaN(dob.getTime())) return null;

        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age >= 0 && age <= 120 ? age : null;
    }, [selectedYear, selectedMonth, selectedDay]);

    // Max date for native date input picker
    const maxNativeDate = useMemo(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - minAge);
        return date.toISOString().split('T')[0];
    }, [minAge]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        updateDate(selectedYear, month, selectedDay);
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const day = e.target.value;
        updateDate(selectedYear, selectedMonth, day);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        updateDate(year, selectedMonth, selectedDay);
    };

    const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val) {
            onChange(val);
        }
    };

    const updateDate = (y: string, m: string, d: string) => {
        if (!y && !m && !d) {
            onChange('');
            return;
        }
        // If day is greater than allowed in new month/year, cap it
        let validDay = d;
        if (m && d) {
            const maxD = new Date(y ? parseInt(y, 10) : 2000, parseInt(m, 10), 0).getDate();
            if (parseInt(d, 10) > maxD) {
                validDay = maxD < 10 ? `0${maxD}` : `${maxD}`;
            }
        }

        if (y && m && validDay) {
            onChange(`${y}-${m}-${validDay}`);
        } else {
            // Partial selection - keep state representation if needed by notifying YYYY-MM-DD format
            const formattedY = y || 'YYYY';
            const formattedM = m || 'MM';
            const formattedD = validDay || 'DD';
            // Only update parent if complete or reset
            if (y && m && validDay) {
                onChange(`${formattedY}-${formattedM}-${formattedD}`);
            }
        }
    };

    return (
        <div className={`dob-picker-container ${error ? 'has-error' : ''} ${className}`}>
            {showLabel && (
                <div className="dob-header-row">
                    <label className="dob-label">
                        <Calendar size={16} className="dob-icon" />
                        {label}
                    </label>
                    {calculatedAge !== null && (
                        <div className="dob-age-badge" title="Calculated Age">
                            <Sparkles size={12} />
                            <span>{calculatedAge} years old</span>
                        </div>
                    )}
                </div>
            )}

            <div className="dob-inputs-group">
                {/* Month Dropdown */}
                <div className="dob-select-wrapper month-select">
                    <select
                        className={`dob-select ${!selectedMonth ? 'placeholder' : ''}`}
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        disabled={disabled}
                    >
                        <option value="">Month</option>
                        {MONTHS.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Day Dropdown */}
                <div className="dob-select-wrapper day-select">
                    <select
                        className={`dob-select ${!selectedDay ? 'placeholder' : ''}`}
                        value={selectedDay}
                        onChange={handleDayChange}
                        disabled={disabled}
                    >
                        <option value="">Day</option>
                        {dayOptions.map((d) => (
                            <option key={d} value={d}>
                                {parseInt(d, 10)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Dropdown */}
                <div className="dob-select-wrapper year-select">
                    <select
                        className={`dob-select ${!selectedYear ? 'placeholder' : ''}`}
                        value={selectedYear}
                        onChange={handleYearChange}
                        disabled={disabled}
                    >
                        <option value="">Year</option>
                        {yearOptions.map((y) => (
                            <option key={y} value={y.toString()}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Native Calendar Picker Button Trigger */}
                <div className="dob-calendar-btn-wrapper">
                    <button
                        type="button"
                        className="dob-calendar-btn"
                        title="Open date picker calendar"
                        disabled={disabled}
                    >
                        <Calendar size={18} />
                    </button>
                    <input
                        type="date"
                        className="dob-native-date-input"
                        max={maxNativeDate}
                        value={value || ''}
                        onChange={handleNativePickerChange}
                        disabled={disabled}
                        tabIndex={-1}
                    />
                </div>
            </div>

            {error && (
                <div className="dob-error-msg">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default DateOfBirthPicker;
