import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MailList from '../../components/MailList/MailList';
import ReadingPane from '../../components/ReadingPane/ReadingPane';
import MailToolbar from '../../components/MailToolbar/MailToolbar';
import Compose from '../../components/Compose/Compose';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import { mockEmails } from '../../data/mockEmails';
import toast from 'react-hot-toast';
import './Mail.css';

const Mail = ({ searchQuery }) => {
  const [emails, setEmails] = useState(mockEmails);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState([]);
  const [composeState, setComposeState] = useState({ open: false, replyTo: null, forward: null });
  const [contextMenu, setContextMenu] = useState(null);

  // Filter emails for current folder + search
  const folderEmails = useMemo(() => {
    let result = emails.filter(e => e.folderId === currentFolder);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.subject.toLowerCase().includes(q) ||
        e.sender.name.toLowerCase().includes(q) ||
        e.sender.email.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      );
    }
    return result;
  }, [emails, currentFolder, searchQuery]);

  const selectedEmail = useMemo(() =>
    emails.find(e => e.id === selectedEmailId),
    [emails, selectedEmailId]
  );

  const updateEmails = useCallback((ids, updates) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    setEmails(prev => prev.map(e => idArray.includes(e.id) ? { ...e, ...updates } : e));
  }, []);

  // ─── Actions ─────────────────────────────────────────
  const handleDelete = useCallback((id) => {
    const targetId = id || selectedEmailId;
    if (!targetId) return;
    updateEmails([targetId], { folderId: 'deleted' });
    if (selectedEmailId === targetId) setSelectedEmailId(null);
    toast('Moved to Deleted Items', { icon: '🗑️' });
  }, [selectedEmailId, updateEmails]);

  const handleArchive = useCallback((id) => {
    const targetId = id || selectedEmailId;
    if (!targetId) return;
    updateEmails([targetId], { folderId: 'archive' });
    if (selectedEmailId === targetId) setSelectedEmailId(null);
    toast('Archived', { icon: '📦' });
  }, [selectedEmailId, updateEmails]);

  const handleMarkRead = useCallback((id, isRead) => {
    updateEmails([id], { isRead });
  }, [updateEmails]);

  const handleFlag = useCallback((id) => {
    const targetId = id || selectedEmailId;
    if (!targetId) return;
    setEmails(prev => prev.map(e => e.id === targetId ? { ...e, isFlagged: !e.isFlagged } : e));
  }, [selectedEmailId]);

  const toggleEmailSelection = useCallback((id) => {
    setSelectedEmailIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  // Compose handlers
  const handleCompose = () => setComposeState({ open: true, replyTo: null, forward: null });
  const handleReply = (email) => setComposeState({ open: true, replyTo: email, forward: null });
  const handleForward = (email) => setComposeState({ open: true, replyTo: null, forward: email });
  const closeCompose = () => setComposeState({ open: false, replyTo: null, forward: null });

  // Context menu for emails
  const handleEmailContextMenu = useCallback((e, email) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Open', onClick: () => { setSelectedEmailId(email.id); setContextMenu(null); } },
        { type: 'divider' },
        { label: 'Reply', onClick: () => { handleReply(email); setContextMenu(null); } },
        { label: 'Forward', onClick: () => { handleForward(email); setContextMenu(null); } },
        { type: 'divider' },
        { label: email.isRead ? 'Mark as unread' : 'Mark as read', onClick: () => { handleMarkRead(email.id, !email.isRead); setContextMenu(null); } },
        { label: email.isFlagged ? 'Unflag' : 'Flag', onClick: () => { handleFlag(email.id); setContextMenu(null); } },
        { type: 'divider' },
        { label: 'Archive', onClick: () => { handleArchive(email.id); setContextMenu(null); } },
        { label: 'Delete', onClick: () => { handleDelete(email.id); setContextMenu(null); }, danger: true },
      ]
    });
  }, [handleMarkRead, handleFlag, handleArchive, handleDelete]);

  // Toolbar actions operate on selected email or multi-selected emails
  const toolbarSelectedEmails = selectedEmailIds.length > 0
    ? emails.filter(e => selectedEmailIds.includes(e.id))
    : selectedEmail ? [selectedEmail] : [];

  const getIdsToUpdate = () => toolbarSelectedEmails.map(e => e.id);

  const handleToolbarDelete = () => {
    const ids = getIdsToUpdate();
    if (!ids.length) return;
    updateEmails(ids, { folderId: 'deleted' });
    setSelectedEmailIds([]);
    if (ids.includes(selectedEmailId)) setSelectedEmailId(null);
    toast(ids.length > 1 ? `${ids.length} conversations deleted` : 'Moved to Deleted Items', { icon: '🗑️' });
  };

  const handleToolbarMarkRead = () => {
    const ids = getIdsToUpdate();
    if (!ids.length) return;
    updateEmails(ids, { isRead: true });
  };

  const handleToolbarFlag = () => {
    // Flag toggles, so bulk flag might be tricky if we use updateEmails.
    // For toolbar, typically it sets to true if any are false, else false.
    // I'll keep the loop for flag since it toggles each individually or we can just map.
    const ids = getIdsToUpdate();
    setEmails(prev => prev.map(e => ids.includes(e.id) ? { ...e, isFlagged: !e.isFlagged } : e));
  };

  const handleToolbarArchive = () => {
    const ids = getIdsToUpdate();
    if (!ids.length) return;
    updateEmails(ids, { folderId: 'archive' });
    setSelectedEmailIds([]);
    if (ids.includes(selectedEmailId)) setSelectedEmailId(null);
    toast(ids.length > 1 ? `${ids.length} conversations archived` : 'Archived', { icon: '📦' });
  };

  return (
    <div className="mail-page">
      <Sidebar
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        emails={emails}
        onCompose={handleCompose}
      />

      <div className="mail-main">
        <MailToolbar
          selectedEmails={toolbarSelectedEmails}
          onDelete={handleToolbarDelete}
          onArchive={handleToolbarArchive}
          onMarkRead={handleToolbarMarkRead}
          onFlag={handleToolbarFlag}
          currentFolder={currentFolder}
        />

        <div className="mail-split">
          <MailList
            emails={folderEmails}
            selectedEmailId={selectedEmailId}
            setSelectedEmailId={setSelectedEmailId}
            selectedEmailIds={selectedEmailIds}
            toggleEmailSelection={toggleEmailSelection}
            onDelete={handleDelete}
            onMarkRead={handleMarkRead}
            onFlag={handleFlag}
            onArchive={handleArchive}
            currentFolder={currentFolder}
            onContextMenu={handleEmailContextMenu}
          />
          <ReadingPane
            email={selectedEmail}
            onDelete={() => handleDelete(selectedEmailId)}
            onMarkRead={(isRead) => handleMarkRead(selectedEmailId, isRead)}
            onClose={() => setSelectedEmailId(null)}
            onReply={handleReply}
            onForward={handleForward}
          />
        </div>
      </div>

      {composeState.open && (
        <Compose
          onClose={closeCompose}
          replyTo={composeState.replyTo}
          forwardEmail={composeState.forward}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Mail;
