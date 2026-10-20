import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export const validateCalendarDate = (dStr, mStr, yStr) => {
  if (!dStr || !mStr || !yStr) {
    return { valid: false, message: 'Please enter your complete Date of Birth (DD/MM/YYYY).' };
  }

  if (dStr.length < 1 || mStr.length < 1 || yStr.length !== 4) {
    return { valid: false, message: 'Please enter a valid 4-digit year.' };
  }

  const d = parseInt(dStr, 10);
  const m = parseInt(mStr, 10);
  const y = parseInt(yStr, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y)) {
    return { valid: false, message: 'Please enter a valid Date of Birth.' };
  }

  const currentYear = new Date().getFullYear();
  if (y < 1900 || y > currentYear) {
    return { valid: false, message: `Birth year must be between 1900 and ${currentYear}.` };
  }

  if (m < 1 || m > 12) {
    return { valid: false, message: 'Month must be between 01 and 12.' };
  }

  // Leap year check: divisible by 4 and (not divisible by 100 or divisible by 400)
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  const daysInMonth = [0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d < 1 || d > daysInMonth[m]) {
    if (m === 2 && d === 29 && !isLeap) {
      return { valid: false, message: `${y} is not a leap year. February has only 28 days.` };
    }
    return {
      valid: false,
      message: `Invalid date: ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y} is not a real calendar date.`
    };
  }

  const inputDate = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (inputDate > today) {
    return { valid: false, message: 'Date of Birth cannot be in the future.' };
  }

  const formatted = `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return { valid: true, formatted };
};

const DateOfBirthInput = ({
  value = '',
  onChange,
  hasError = false,
  label = 'Date of Birth',
  required = true,
}) => {
  const parseDob = (val) => {
    if (!val || typeof val !== 'string') return { d: '', m: '', y: '' };
    const parts = val.split('-');
    if (parts.length === 3) {
      return {
        y: parts[0] || '',
        m: parts[1] ? String(parseInt(parts[1], 10)).padStart(2, '0') : '',
        d: parts[2] ? String(parseInt(parts[2], 10)).padStart(2, '0') : '',
      };
    }
    return { d: '', m: '', y: '' };
  };

  const initial = parseDob(value);
  const [day, setDay] = useState(initial.d);
  const [month, setMonth] = useState(initial.m);
  const [year, setYear] = useState(initial.y);
  const [isFocused, setIsFocused] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const pickerRef = useRef(null);

  // Sync state if external value changes (e.g. from parent/reset)
  useEffect(() => {
    const parsed = parseDob(value);
    setDay(parsed.d);
    setMonth(parsed.m);
    setYear(parsed.y);
  }, [value]);

  const commitDate = (newD, newM, newY) => {
    if (!newD && !newM && !newY) {
      if (onChange) onChange('');
      return;
    }
    if (newD && newM && newY && newY.length === 4) {
      const validation = validateCalendarDate(newD, newM, newY);
      if (validation.valid) {
        if (onChange) onChange(validation.formatted);
      } else {
        // Still keep raw format if not completely valid yet
        if (onChange) onChange(`${newY}-${newM.padStart(2, '0')}-${newD.padStart(2, '0')}`);
      }
    } else {
      if (onChange) onChange('');
    }
  };

  // Day handlers
  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    commitDate(val, month, year);

    // Auto-advance to month if 2 digits entered or single digit > 3 (e.g. 4-9 cannot start a 2-digit day)
    if (val.length === 2 || (val.length === 1 && parseInt(val, 10) > 3)) {
      monthRef.current?.focus();
      monthRef.current?.select();
    }
  };

  const handleDayKeyDown = (e) => {
    if (e.key === 'ArrowRight' && e.target.selectionStart === day.length) {
      monthRef.current?.focus();
    }
  };

  // Month handlers
  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    commitDate(day, val, year);

    // Auto-advance to year if 2 digits entered or single digit > 1 (e.g. 2-9 cannot start a 2-digit month)
    if (val.length === 2 || (val.length === 1 && parseInt(val, 10) > 1)) {
      yearRef.current?.focus();
      yearRef.current?.select();
    }
  };

  const handleMonthKeyDown = (e) => {
    if (e.key === 'Backspace' && !month) {
      dayRef.current?.focus();
    } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
      dayRef.current?.focus();
    } else if (e.key === 'ArrowRight' && e.target.selectionStart === month.length) {
      yearRef.current?.focus();
    }
  };

  // Year handlers
  const handleYearChange = (e) => {
    // Strictly max 4 digits - prevents entering 5th digit
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
    commitDate(day, month, val);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === 'Backspace' && !year) {
      monthRef.current?.focus();
    } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
      monthRef.current?.focus();
    } else if (
      /^\d$/.test(e.key) &&
      year.length >= 4 &&
      e.target.selectionStart === e.target.selectionEnd &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      // Prevent 5th digit keypress
      e.preventDefault();
    }
  };

  // Paste handler for all date formats (DD/MM/YYYY, YYYY-MM-DD, etc.)
  const handlePaste = (e, field) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (!pasted) return;

    // Full date paste detection
    const match = pasted.match(/^(\d{1,4})[./-](\d{1,2})[./-](\d{1,4})$/);
    if (match) {
      let p1 = match[1];
      let p2 = match[2];
      let p3 = match[3];
      let newD = '', newM = '', newY = '';

      if (p1.length === 4) {
        // YYYY-MM-DD
        newY = p1.slice(0, 4);
        newM = p2.padStart(2, '0').slice(0, 2);
        newD = p3.padStart(2, '0').slice(0, 2);
      } else {
        // DD-MM-YYYY
        newD = p1.padStart(2, '0').slice(0, 2);
        newM = p2.padStart(2, '0').slice(0, 2);
        newY = p3.slice(0, 4);
      }

      setDay(newD);
      setMonth(newM);
      setYear(newY);
      commitDate(newD, newM, newY);
      yearRef.current?.focus();
      return;
    }

    // Single field paste
    const digits = pasted.replace(/\D/g, '');
    if (field === 'day') {
      const d = digits.slice(0, 2);
      setDay(d);
      commitDate(d, month, year);
      if (d.length === 2) monthRef.current?.focus();
    } else if (field === 'month') {
      const m = digits.slice(0, 2);
      setMonth(m);
      commitDate(day, m, year);
      if (m.length === 2) yearRef.current?.focus();
    } else if (field === 'year') {
      const y = digits.slice(0, 4);
      setYear(y);
      commitDate(day, month, y);
    }
  };

  // Native picker selection
  const handleNativePickerChange = (e) => {
    const val = e.target.value;
    if (!val) return;
    const parts = val.split('-');
    if (parts.length === 3) {
      const y = parts[0].slice(0, 4);
      const m = parts[1].padStart(2, '0');
      const d = parts[2].padStart(2, '0');
      setYear(y);
      setMonth(m);
      setDay(d);
      commitDate(d, m, y);
    }
  };

  const handleCalendarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (pickerRef.current) {
      if (typeof pickerRef.current.showPicker === 'function') {
        pickerRef.current.showPicker();
      } else {
        pickerRef.current.focus();
        pickerRef.current.click();
      }
    }
  };

  const hasValue = Boolean(day || month || year || value);

  return (
    <div className="dob-input-group">
      <div
        className={`dob-control-wrapper ${isFocused ? 'is-focused' : ''} ${hasValue ? 'has-value' : ''} ${hasError ? 'has-error' : ''}`}
        onClick={() => {
          if (!day) dayRef.current?.focus();
          else if (!month) monthRef.current?.focus();
          else yearRef.current?.focus();
        }}
      >
        <div className="dob-segments-row">
          <input
            ref={dayRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={day}
            onChange={handleDayChange}
            onKeyDown={handleDayKeyDown}
            onPaste={(e) => handlePaste(e, 'day')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused || hasValue ? 'DD' : ''}
            className="dob-segment dob-day"
            aria-label="Day of birth (2 digits)"
            autoComplete="bday-day"
            required={required}
          />

          <span className="dob-divider">/</span>

          <input
            ref={monthRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={month}
            onChange={handleMonthChange}
            onKeyDown={handleMonthKeyDown}
            onPaste={(e) => handlePaste(e, 'month')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused || hasValue ? 'MM' : ''}
            className="dob-segment dob-month"
            aria-label="Month of birth (2 digits)"
            autoComplete="bday-month"
            required={required}
          />

          <span className="dob-divider">/</span>

          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={year}
            onChange={handleYearChange}
            onKeyDown={handleYearKeyDown}
            onPaste={(e) => handlePaste(e, 'year')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused || hasValue ? 'YYYY' : ''}
            className="dob-segment dob-year"
            aria-label="Year of birth (4 digits)"
            autoComplete="bday-year"
            required={required}
          />
        </div>

        {/* Calendar Picker Trigger */}
        <button
          type="button"
          className="dob-calendar-icon-btn"
          onClick={handleCalendarClick}
          aria-label="Open calendar"
          title="Open calendar"
          tabIndex={-1}
        >
          <Calendar size={18} />
        </button>

        {/* Hidden native input for native picker */}
        <input
          ref={pickerRef}
          type="date"
          className="dob-hidden-native-picker"
          tabIndex={-1}
          aria-hidden="true"
          max={`${new Date().getFullYear()}-12-31`}
          min="1900-01-01"
          value={value && value.length === 10 ? value : ''}
          onChange={handleNativePickerChange}
        />
      </div>

      <label className="dob-floating-label">{label}</label>
    </div>
  );
};

export default DateOfBirthInput;
