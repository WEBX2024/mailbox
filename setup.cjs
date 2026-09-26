const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components/AppShell',
  'src/components/Sidebar',
  'src/components/NavigationRail',
  'src/components/Header',
  'src/components/Search',
  'src/components/MailList',
  'src/components/MailRow',
  'src/components/ReadingPane',
  'src/components/MailToolbar',
  'src/components/Compose',
  'src/components/ContextMenu',
  'src/components/Dropdown',
  'src/components/Modal',
  'src/components/Toast',
  'src/components/Tooltip',
  'src/pages/Mail',
  'src/pages/Calendar',
  'src/pages/People',
  'src/pages/Tasks',
  'src/pages/Settings',
  'src/data',
  'src/hooks',
  'src/utils',
  'src/styles'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Mock Emails Data
const mockEmailsContent = `export const mockEmails = [
  {
    id: '1',
    folderId: 'inbox',
    sender: { name: 'Satya Nadella', email: 'satya@microsoft.com', avatar: null },
    subject: 'Vision for the next quarter',
    preview: 'I wanted to share some thoughts on our upcoming initiatives and the focus areas for the team...',
    body: '<p>Team,</p><p>As we enter the next quarter, I wanted to share some thoughts on our upcoming initiatives and the focus areas for the team. We need to ensure we are aligned on our core objectives.</p><p>Best,<br/>Satya</p>',
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: false,
    hasAttachment: false,
    isFlagged: true,
    importance: 'high',
    categories: ['work'],
    recipients: [{ name: 'You', email: 'you@outlook.com' }]
  },
  {
    id: '2',
    folderId: 'inbox',
    sender: { name: 'GitHub', email: 'noreply@github.com', avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    subject: '[GitHub] Dependabot alert: prototype pollution in minimist',
    preview: 'A new vulnerability was found in minimist. Please review the details below.',
    body: '<p>A new vulnerability was found in minimist.</p><p>Please review the details below to ensure your repository remains secure.</p>',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'you@outlook.com' }]
  },
  {
    id: '3',
    folderId: 'inbox',
    sender: { name: 'Design Team', email: 'design@company.com', avatar: null },
    subject: 'New brand guidelines updated',
    preview: 'Hi everyone, we have updated the brand guidelines to include the new logo variants.',
    body: '<p>Hi everyone,</p><p>We have updated the brand guidelines to include the new logo variants. Please review the attached PDF for the full details.</p><p>Thanks,</p>',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: false,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: ['design'],
    recipients: [{ name: 'You', email: 'you@outlook.com' }]
  },
  {
    id: '4',
    folderId: 'archive',
    sender: { name: 'HR Department', email: 'hr@company.com', avatar: null },
    subject: 'Holiday schedule for next year',
    preview: 'Please find the approved holiday schedule for the upcoming year.',
    body: '<p>Please find the approved holiday schedule for the upcoming year attached.</p>',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    isRead: true,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'Company All', email: 'all@company.com' }]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src/data/mockEmails.js'), mockEmailsContent);

// Mock Folders Data
const mockFoldersContent = `import { FiInbox, FiSend, FiFile, FiTrash2, FiArchive, FiAlertOctagon, FiClock, FiStar } from 'react-icons/fi';

export const mockFolders = [
  { id: 'favorites', name: 'Favorites', isGroup: true, children: ['inbox', 'sent'] },
  { id: 'folders', name: 'Folders', isGroup: true, children: ['inbox', 'drafts', 'sent', 'deleted', 'junk', 'archive', 'scheduled'] },
];

export const folderDetails = {
  inbox: { id: 'inbox', name: 'Inbox', icon: 'inbox', unreadCount: 2 },
  drafts: { id: 'drafts', name: 'Drafts', icon: 'drafts', unreadCount: 0 },
  sent: { id: 'sent', name: 'Sent Items', icon: 'sent', unreadCount: 0 },
  deleted: { id: 'deleted', name: 'Deleted Items', icon: 'deleted', unreadCount: 0 },
  junk: { id: 'junk', name: 'Junk Email', icon: 'junk', unreadCount: 1 },
  archive: { id: 'archive', name: 'Archive', icon: 'archive', unreadCount: 0 },
  scheduled: { id: 'scheduled', name: 'Scheduled', icon: 'scheduled', unreadCount: 0 },
};`;

fs.writeFileSync(path.join(__dirname, 'src/data/mockFolders.js'), mockFoldersContent);

console.log('Setup complete.');
