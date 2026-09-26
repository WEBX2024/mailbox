import React, { useEffect } from 'react';
import { FiCornerUpLeft, FiCornerUpRight, FiMoreHorizontal, FiPaperclip, FiDownload, FiMail, FiTrash2, FiFlag, FiPrinter } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import './ReadingPane.css';

const ReadingPane = ({ email, onDelete, onMarkRead, onClose: _onClose, onReply, onForward }) => {
  useEffect(() => {
    if (email && !email.isRead) {
      const timer = setTimeout(() => onMarkRead?.(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [email, onMarkRead]);

  if (!email) {
    return (
      <div className="reading-pane reading-pane-empty">
        <div className="reading-pane-placeholder">
          <FiMail size={56} />
          <h3>Select an email to read</h3>
          <p>Choose an item from the message list to read it here.</p>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  let dateStr = '';
  try {
    dateStr = format(parseISO(email.date), 'EEEE, MMMM d, yyyy \'at\' h:mm a');
  } catch { /* ignore */ }

  return (
    <div className="reading-pane">
      {/* Header actions */}
      <div className="reading-pane-header">
        <div className="reading-pane-header-actions">
          <button className="rp-action-btn" onClick={() => onReply?.(email)} title="Reply">
            <FiCornerUpLeft size={16} />
          </button>
          <button className="rp-action-btn" title="Reply all">
            <FiCornerUpLeft size={16} />
            <FiCornerUpLeft size={12} style={{ marginLeft: -8 }} />
          </button>
          <button className="rp-action-btn" onClick={() => onForward?.(email)} title="Forward">
            <FiCornerUpRight size={16} />
          </button>
          <div className="rp-divider" />
          <button className="rp-action-btn" onClick={onDelete} title="Delete">
            <FiTrash2 size={16} />
          </button>
          <button className="rp-action-btn" title="Flag">
            <FiFlag size={16} />
          </button>
          <button className="rp-action-btn" title="Print">
            <FiPrinter size={16} />
          </button>
          <button className="rp-action-btn" title="More actions">
            <FiMoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="reading-pane-scroll">
        {/* Subject */}
        <h2 className="rp-subject">{email.subject}</h2>

        {/* Sender info */}
        <div className="rp-sender-row">
          <div
            className="rp-sender-avatar"
            style={{ backgroundColor: email.sender?.color || '#0078d4' }}
          >
            {getInitials(email.sender?.name)}
          </div>
          <div className="rp-sender-info">
            <div className="rp-sender-line1">
              <span className="rp-sender-name">{email.sender?.name || 'Unknown Sender'}</span>
              <span className="rp-date">{dateStr}</span>
            </div>
            <div className="rp-sender-email">
              &lt;{email.sender?.email || 'unknown@example.com'}&gt;
            </div>
            <div className="rp-recipients">
              To: {email.recipients?.map(r => r.name).join(', ')}
              {email.cc?.length > 0 && (
                <span className="rp-cc"> | Cc: {email.cc.map(r => r.name).join(', ')}</span>
              )}
            </div>
          </div>
        </div>

        {/* Attachments */}
        {email.attachments?.length > 0 && (
          <div className="rp-attachments">
            {email.attachments.map((att, i) => (
              <div key={i} className="rp-attachment-chip">
                <FiPaperclip size={14} />
                <span className="rp-attachment-name">{att.name}</span>
                <span className="rp-attachment-size">{att.size}</span>
                <button className="rp-attachment-download" title="Download">
                  <FiDownload size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="rp-body" dangerouslySetInnerHTML={{ __html: email.body }} />

        {/* Reply box */}
        <div className="rp-reply-strip">
          <button className="rp-reply-btn" onClick={() => onReply?.(email)}>
            <FiCornerUpLeft size={14} />
            <span>Reply</span>
          </button>
          <button className="rp-reply-btn" onClick={() => onForward?.(email)}>
            <FiCornerUpRight size={14} />
            <span>Forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingPane;
