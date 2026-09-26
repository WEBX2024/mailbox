import React from 'react';
import { FiTrash2, FiArchive, FiAlertOctagon, FiFolder, FiTag, FiMoreHorizontal, FiEye, FiFlag, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './MailToolbar.css';

const MailToolbar = ({ selectedEmails, onDelete, onArchive, onMarkRead, onFlag, currentFolder: _currentFolder }) => {
  const hasSelection = selectedEmails && selectedEmails.length > 0;
  const count = selectedEmails?.length || 0;

  return (
    <div className="mail-toolbar" role="toolbar" aria-label="Mail actions">
      <div className="toolbar-group">
        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={onDelete}
          title="Delete (Del)"
        >
          <FiTrash2 size={16} />
          <span className="toolbar-btn-label">Delete</span>
        </button>

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={() => { onArchive?.(); toast('Archived', { icon: '📦' }); }}
          title="Archive"
        >
          <FiArchive size={16} />
          <span className="toolbar-btn-label">Archive</span>
        </button>

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={() => toast('Reported as junk', { icon: '⚠️' })}
          title="Report junk"
        >
          <FiAlertOctagon size={16} />
          <span className="toolbar-btn-label">Junk</span>
        </button>

        <div className="toolbar-divider" />

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={onMarkRead}
          title="Mark as read/unread"
        >
          <FiEye size={16} />
          <span className="toolbar-btn-label">Read</span>
        </button>

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={onFlag}
          title="Flag"
        >
          <FiFlag size={16} />
          <span className="toolbar-btn-label">Flag</span>
        </button>

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          onClick={() => toast('Snoozed', { icon: '⏰' })}
          title="Snooze"
        >
          <FiClock size={16} />
          <span className="toolbar-btn-label">Snooze</span>
        </button>

        <div className="toolbar-divider" />

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          title="Move to folder"
        >
          <FiFolder size={16} />
          <span className="toolbar-btn-label">Move</span>
        </button>

        <button
          className="toolbar-action-btn"
          disabled={!hasSelection}
          title="Categorize"
        >
          <FiTag size={16} />
          <span className="toolbar-btn-label">Categorize</span>
        </button>

        <button className="toolbar-action-btn" title="More actions">
          <FiMoreHorizontal size={16} />
        </button>
      </div>

      {hasSelection && count > 1 && (
        <div className="toolbar-selection-info">
          {count} selected
        </div>
      )}
    </div>
  );
};

export default MailToolbar;
