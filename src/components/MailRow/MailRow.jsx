import React, { useState, memo } from 'react';
import { FiTrash2, FiFlag, FiMail, FiArchive, FiPaperclip } from 'react-icons/fi';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import './MailRow.css';

const MailRow = memo(({ email, isSelected, isChecked: _isChecked, onClick, onCheck: _onCheck, onDelete, onMarkRead, onFlag, onArchive, onContextMenu }) => {
  const [isHovered, setIsHovered] = useState(false);

  const displayDate = () => {
    try {
      const date = parseISO(email.date);
      if (isToday(date)) return format(date, 'h:mm a');
      if (isYesterday(date)) return 'Yesterday';
      return format(date, 'MMM d');
    } catch {
      return '';
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onContextMenu?.(e, email);
  };

  const senderName = email.sender?.name || 'Unknown Sender';
  const senderColor = email.sender?.color || '#0078d4';

  return (
    <div
      className={`mail-row ${isSelected ? 'selected' : ''} ${!email.isRead ? 'unread' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
      role="listitem"
      tabIndex={0}
      aria-selected={isSelected}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      {/* Unread indicator */}
      <div className="mail-row-indicator">
        {!email.isRead && <div className="mail-row-unread-dot" />}
      </div>

      {/* Avatar */}
      <div
        className="mail-row-avatar"
        style={{ backgroundColor: senderColor }}
        title={senderName}
      >
        {getInitials(senderName)}
      </div>

      {/* Content */}
      <div className="mail-row-body">
        <div className="mail-row-line1">
          <span className="mail-row-sender truncate">{senderName}</span>
          <span className="mail-row-date">{displayDate()}</span>
        </div>
        <div className="mail-row-line2">
          <span className="mail-row-subject truncate">{email.subject}</span>
          <div className="mail-row-icons">
            {email.hasAttachment && <FiPaperclip size={13} className="mail-row-attach-icon" />}
            {email.importance === 'high' && <span className="mail-row-importance">!</span>}
          </div>
        </div>
        <div className="mail-row-line3">
          <span className="mail-row-preview truncate">{email.preview}</span>

          {/* Hover actions */}
          {(isHovered || email.isFlagged) && (
            <div className="mail-row-actions" onClick={(e) => e.stopPropagation()}>
              {isHovered && (
                <>
                  <button className="mail-row-action" onClick={onDelete} title="Delete" aria-label="Delete">
                    <FiTrash2 size={15} />
                  </button>
                  <button className="mail-row-action" onClick={onArchive} title="Archive" aria-label="Archive">
                    <FiArchive size={15} />
                  </button>
                  <button className="mail-row-action" onClick={onMarkRead} title={email.isRead ? 'Mark unread' : 'Mark read'} aria-label="Toggle read">
                    <FiMail size={15} />
                  </button>
                </>
              )}
              <button
                className={`mail-row-action ${email.isFlagged ? 'flagged' : ''}`}
                onClick={onFlag}
                title={email.isFlagged ? 'Unflag' : 'Flag'}
                aria-label="Toggle flag"
              >
                <FiFlag size={15} fill={email.isFlagged ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

MailRow.displayName = 'MailRow';

export default MailRow;
