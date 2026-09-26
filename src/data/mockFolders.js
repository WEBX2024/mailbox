export const folderDetails = {
  inbox: { id: 'inbox', name: 'Inbox', icon: 'inbox' },
  drafts: { id: 'drafts', name: 'Drafts', icon: 'drafts' },
  sent: { id: 'sent', name: 'Sent Items', icon: 'sent' },
  deleted: { id: 'deleted', name: 'Deleted Items', icon: 'deleted' },
  junk: { id: 'junk', name: 'Junk Email', icon: 'junk' },
  archive: { id: 'archive', name: 'Archive', icon: 'archive' },
  scheduled: { id: 'scheduled', name: 'Scheduled', icon: 'scheduled' },
  outbox: { id: 'outbox', name: 'Outbox', icon: 'outbox' },
  notes: { id: 'notes', name: 'Notes', icon: 'notes' },
};

export const folderGroups = [
  {
    id: 'favorites',
    name: 'Favorites',
    children: ['inbox', 'sent', 'drafts'],
    defaultExpanded: true
  },
  {
    id: 'folders',
    name: 'Folders',
    children: ['inbox', 'drafts', 'sent', 'deleted', 'junk', 'archive', 'scheduled', 'outbox', 'notes'],
    defaultExpanded: true
  }
];