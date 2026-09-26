import React, { useState, useMemo } from 'react';
import { FiFilter, FiInbox } from 'react-icons/fi';
import MailRow from '../MailRow/MailRow';
import './MailList.css';

const MailList = ({
  emails,
  selectedEmailId,
  setSelectedEmailId,
  selectedEmailIds,
  toggleEmailSelection,
  onDelete,
  onMarkRead,
  onFlag,
  onArchive,
  currentFolder: _currentFolder,
  onContextMenu,
}) => {
  const [activeTab, setActiveTab] = useState('focused');
  const [filterUnread, setFilterUnread] = useState(false);

  const filteredEmails = useMemo(() => {
    let result = emails;
    if (filterUnread) {
      result = result.filter(e => !e.isRead);
    }
    return result;
  }, [emails, filterUnread]);

  return (
    <div className="mail-list">
      {/* Tab bar */}
      <div className="mail-list-tabs">
        <div className="mail-list-tab-group">
          <button
            className={`mail-list-tab ${activeTab === 'focused' ? 'active' : ''}`}
            onClick={() => setActiveTab('focused')}
          >
            Focused
          </button>
          <button
            className={`mail-list-tab ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
          >
            Other
          </button>
        </div>
        <button
          className={`mail-list-filter ${filterUnread ? 'active' : ''}`}
          onClick={() => setFilterUnread(!filterUnread)}
          title="Filter unread"
        >
          <FiFilter size={14} />
          <span>{filterUnread ? 'Unread' : 'Filter'}</span>
        </button>
      </div>

      {/* Email list */}
      <div className="mail-list-scroll" role="list" aria-label="Message list">
        {filteredEmails.length === 0 ? (
          <div className="mail-list-empty">
            <FiInbox size={40} />
            <p className="mail-list-empty-title">
              {filterUnread ? 'No unread messages' : 'Nothing here'}
            </p>
            <p className="mail-list-empty-sub">
              {filterUnread
                ? 'All messages have been read.'
                : 'This folder is empty.'}
            </p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <MailRow
              key={email.id}
              email={email}
              isSelected={selectedEmailId === email.id}
              isChecked={selectedEmailIds?.includes(email.id)}
              onClick={() => setSelectedEmailId(email.id)}
              onCheck={() => toggleEmailSelection?.(email.id)}
              onDelete={() => onDelete(email.id)}
              onMarkRead={() => onMarkRead(email.id, !email.isRead)}
              onFlag={() => onFlag(email.id)}
              onArchive={() => onArchive?.(email.id)}
              onContextMenu={onContextMenu}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MailList;
