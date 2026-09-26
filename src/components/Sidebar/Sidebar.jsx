import React, { useState, useCallback } from 'react';
import { FiChevronDown, FiChevronRight, FiInbox, FiSend, FiFile, FiTrash2, FiArchive, FiClock, FiAlertOctagon, FiEdit3, FiPlus, FiFolder } from 'react-icons/fi';
import { folderDetails, folderGroups } from '../../data/mockFolders';
import ContextMenu from '../ContextMenu/ContextMenu';
import './Sidebar.css';

const Sidebar = ({ currentFolder, setCurrentFolder, emails, onCompose }) => {
  const [expandedGroups, setExpandedGroups] = useState({ favorites: true, folders: true });
  const [contextMenu, setContextMenu] = useState(null);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const getUnreadCount = useCallback((folderId) => {
    return emails.filter(e => e.folderId === folderId && !e.isRead).length;
  }, [emails]);

  const iconMap = {
    inbox: FiInbox,
    drafts: FiFile,
    sent: FiSend,
    deleted: FiTrash2,
    archive: FiArchive,
    scheduled: FiClock,
    junk: FiAlertOctagon,
    outbox: FiSend,
    notes: FiEdit3,
  };

  const handleFolderContextMenu = (e, folderId) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Open in new window', onClick: () => setContextMenu(null) },
        { type: 'divider' },
        { label: 'Mark all as read', onClick: () => setContextMenu(null) },
        { label: 'Empty folder', onClick: () => setContextMenu(null), disabled: folderId !== 'deleted' && folderId !== 'junk' },
        { type: 'divider' },
        { label: 'Rename folder', onClick: () => setContextMenu(null), disabled: ['inbox', 'sent', 'drafts', 'deleted', 'junk'].includes(folderId) },
        { label: 'Delete folder', onClick: () => setContextMenu(null), disabled: true },
        { label: 'New subfolder', onClick: () => setContextMenu(null) },
      ]
    });
  };

  const renderFolder = (folderId) => {
    const folder = folderDetails[folderId];
    if (!folder) return null;
    const IconComponent = iconMap[folder.icon] || FiFolder;
    const unread = getUnreadCount(folderId);
    const isActive = currentFolder === folderId;

    return (
      <button
        key={folderId}
        className={`sidebar-folder-item ${isActive ? 'active' : ''}`}
        onClick={() => setCurrentFolder(folderId)}
        onContextMenu={(e) => handleFolderContextMenu(e, folderId)}
        aria-current={isActive ? 'true' : undefined}
      >
        <IconComponent size={16} className="sidebar-folder-icon" />
        <span className="sidebar-folder-name truncate">{folder.name}</span>
        {unread > 0 && <span className="sidebar-folder-badge">{unread}</span>}
      </button>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-compose">
        <button className="sidebar-compose-btn" onClick={onCompose}>
          <FiEdit3 size={16} />
          <span>New mail</span>
        </button>
      </div>

      <div className="sidebar-scroll">
        {folderGroups.map((group) => (
          <div key={group.id} className="sidebar-group">
            <button
              className="sidebar-group-header"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={expandedGroups[group.id]}
            >
              {expandedGroups[group.id] ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
              <span className="sidebar-group-name">{group.name}</span>
            </button>
            {expandedGroups[group.id] && (
              <div className="sidebar-group-children">
                {group.children.map(renderFolder)}
              </div>
            )}
          </div>
        ))}

        <div className="sidebar-add-folder">
          <button className="sidebar-add-btn">
            <FiPlus size={14} />
            <span>New folder</span>
          </button>
        </div>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}
    </aside>
  );
};

export default Sidebar;
