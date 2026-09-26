import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { mockCalendarEvents } from '../../data/mockOther';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7am to 6pm

  const navigateWeek = (dir) => {
    setCurrentDate(prev => addDays(prev, dir * 7));
  };

  const getEventsForDay = (day) => {
    return mockCalendarEvents.filter(ev => {
      try {
        return isSameDay(parseISO(ev.start), day);
      } catch { /* ignore */ return false; }
    });
  };

  return (
    <div className="calendar-page">
      {/* Calendar header */}
      <div className="cal-header">
        <div className="cal-header-left">
          <button className="cal-new-event-btn">
            <FiPlus size={16} />
            <span>New event</span>
          </button>
          <div className="cal-nav-group">
            <button className="cal-nav-btn" onClick={() => navigateWeek(-1)}><FiChevronLeft size={18} /></button>
            <button className="cal-today-btn" onClick={() => setCurrentDate(new Date())}>Today</button>
            <button className="cal-nav-btn" onClick={() => navigateWeek(1)}><FiChevronRight size={18} /></button>
          </div>
          <span className="cal-date-label">
            {format(weekStart, 'MMM d')} – {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="cal-header-right">
          <div className="cal-view-toggle">
            {['day', 'week', 'month'].map(v => (
              <button
                key={v}
                className={`cal-view-btn ${view === v ? 'active' : ''}`}
                onClick={() => setView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week view grid */}
      <div className="cal-grid">
        {/* Time gutter */}
        <div className="cal-time-gutter">
          <div className="cal-gutter-header" />
          {hours.map(h => (
            <div key={h} className="cal-gutter-cell">
              {format(new Date(2000, 0, 1, h), 'h a')}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, di) => {
          const isToday = isSameDay(day, new Date());
          const dayEvents = getEventsForDay(day);

          return (
            <div key={di} className={`cal-day-col ${isToday ? 'today' : ''}`}>
              <div className={`cal-day-header ${isToday ? 'today' : ''}`}>
                <span className="cal-day-name">{format(day, 'EEE')}</span>
                <span className={`cal-day-number ${isToday ? 'today' : ''}`}>
                  {format(day, 'd')}
                </span>
              </div>
              <div className="cal-day-body">
                {hours.map(h => (
                  <div key={h} className="cal-hour-cell" />
                ))}
                {/* Render events */}
                {dayEvents.map(ev => {
                  let startHour = 9;
                  try { startHour = parseISO(ev.start).getHours(); } catch { /* ignore */ }
                  const topOffset = (startHour - 7) * 60;
                  let duration = 60;
                  try {
                    duration = (parseISO(ev.end) - parseISO(ev.start)) / (1000 * 60);
                  } catch { /* ignore */ }

                  return (
                    <div
                      key={ev.id}
                      className="cal-event"
                      style={{
                        top: topOffset,
                        height: Math.max(duration, 30),
                        backgroundColor: ev.color + '22',
                        borderLeft: `3px solid ${ev.color}`,
                      }}
                      onClick={() => setSelectedEvent(ev)}
                    >
                      <span className="cal-event-title">{ev.title}</span>
                      <span className="cal-event-time">
                        {format(parseISO(ev.start), 'h:mm a')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event detail sidebar */}
      {selectedEvent && (
        <div className="cal-event-detail">
          <div className="cal-event-detail-header">
            <h3>{selectedEvent.title}</h3>
            <button onClick={() => setSelectedEvent(null)}>×</button>
          </div>
          <div className="cal-event-detail-body">
            <div className="cal-detail-row">
              <FiClock size={14} />
              <span>{format(parseISO(selectedEvent.start), 'EEE, MMM d · h:mm a')} – {format(parseISO(selectedEvent.end), 'h:mm a')}</span>
            </div>
            {selectedEvent.location && (
              <div className="cal-detail-row">
                <FiMapPin size={14} />
                <span>{selectedEvent.location}</span>
              </div>
            )}
            {selectedEvent.attendees?.length > 0 && (
              <div className="cal-detail-row">
                <FiUsers size={14} />
                <span>{selectedEvent.attendees.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
