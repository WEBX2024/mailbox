const hour = 1000 * 60 * 60;
const day = hour * 24;
const now = Date.now();

export const mockContacts = [
  { id: 'c1', name: 'Satya Nadella', email: 'satya@microsoft.com', phone: '+1 (425) 882-8080', company: 'Microsoft', role: 'CEO', color: '#0078d4', favorite: true },
  { id: 'c2', name: 'Jessica Park', email: 'jessica.park@company.com', phone: '+1 (555) 234-5678', company: 'Acme Corp', role: 'Design Lead', color: '#00b294', favorite: true },
  { id: 'c3', name: 'Marcus Williams', email: 'marcus.w@company.com', phone: '+1 (555) 345-6789', company: 'Acme Corp', role: 'Backend Engineer', color: '#ca5010', favorite: false },
  { id: 'c4', name: 'Priya Sharma', email: 'priya.sharma@company.com', phone: '+1 (555) 456-7890', company: 'Acme Corp', role: 'HR Manager', color: '#7160e8', favorite: false },
  { id: 'c5', name: 'David Chen', email: 'david.chen@company.com', phone: '+1 (555) 567-8901', company: 'Acme Corp', role: 'Staff Engineer', color: '#005a9e', favorite: true },
  { id: 'c6', name: 'Rachel Kim', email: 'rachel.kim@venture.com', phone: '+1 (555) 678-9012', company: 'Venture Corp', role: 'VP Partnerships', color: '#038387', favorite: false },
  { id: 'c7', name: 'Elena Rodriguez', email: 'elena@company.com', phone: '+1 (555) 789-0123', company: 'Acme Corp', role: 'Product Designer', color: '#c239b3', favorite: false },
  { id: 'c8', name: 'James Taylor', email: 'james.t@partner.io', phone: '+1 (555) 890-1234', company: 'Partner IO', role: 'Solutions Architect', color: '#498205', favorite: false },
  { id: 'c9', name: 'Lisa Chang', email: 'lisa.chang@company.com', phone: '+1 (555) 901-2345', company: 'Acme Corp', role: 'QA Lead', color: '#da3b01', favorite: true },
  { id: 'c10', name: 'Robert Garcia', email: 'r.garcia@external.com', phone: '+1 (555) 012-3456', company: 'External LLC', role: 'Consultant', color: '#647c64', favorite: false },
  { id: 'c11', name: 'Anna Lee', email: 'anna.lee@company.com', phone: '+1 (555) 111-2222', company: 'Acme Corp', role: 'Frontend Engineer', color: '#e74856', favorite: false },
  { id: 'c12', name: 'Kevin Patel', email: 'kevin.p@startup.io', phone: '+1 (555) 222-3333', company: 'Startup IO', role: 'CTO', color: '#8764b8', favorite: false },
];

export const mockCalendarEvents = [
  { id: 'ev1', title: 'Sprint Planning', start: new Date(now + 2 * hour).toISOString(), end: new Date(now + 3 * hour).toISOString(), color: '#0078d4', location: 'Conference Room A', attendees: ['Marcus Williams', 'Priya Sharma'] },
  { id: 'ev2', title: 'Design Review', start: new Date(now + 5 * hour).toISOString(), end: new Date(now + 6 * hour).toISOString(), color: '#00b294', location: 'Zoom', attendees: ['Jessica Park', 'Elena Rodriguez'] },
  { id: 'ev3', title: '1:1 with Manager', start: new Date(now + day + 2 * hour).toISOString(), end: new Date(now + day + 2.5 * hour).toISOString(), color: '#8764b8', location: 'Teams', attendees: ['VP Engineering'] },
  { id: 'ev4', title: 'Team Lunch', start: new Date(now + day + 4 * hour).toISOString(), end: new Date(now + day + 5 * hour).toISOString(), color: '#ca5010', location: 'Cafeteria', attendees: ['Engineering Team'] },
  { id: 'ev5', title: 'Architecture Review', start: new Date(now + 2 * day + 3 * hour).toISOString(), end: new Date(now + 2 * day + 4.5 * hour).toISOString(), color: '#e74856', location: 'Board Room', attendees: ['David Chen', 'Marcus Williams'] },
  { id: 'ev6', title: 'All-Hands Meeting', start: new Date(now + 3 * day + 1 * hour).toISOString(), end: new Date(now + 3 * day + 2 * hour).toISOString(), color: '#0078d4', location: 'Auditorium', attendees: ['Company All'] },
  { id: 'ev7', title: 'Client Call — Venture Corp', start: new Date(now + 4 * day + 6 * hour).toISOString(), end: new Date(now + 4 * day + 7 * hour).toISOString(), color: '#038387', location: 'Zoom', attendees: ['Rachel Kim'] },
];

export const mockTasks = [
  { id: 't1', title: 'Review PR #28491 — concurrent rendering fix', completed: false, dueDate: new Date(now + day).toISOString(), priority: 'high', list: 'My Day' },
  { id: 't2', title: 'Draft Q4 migration plan', completed: false, dueDate: new Date(now + 2 * day).toISOString(), priority: 'high', list: 'My Day' },
  { id: 't3', title: 'Review onboarding docs from Priya', completed: false, dueDate: new Date(now + 3 * day).toISOString(), priority: 'medium', list: 'Important' },
  { id: 't4', title: 'Set up monitoring dashboards', completed: true, dueDate: new Date(now - day).toISOString(), priority: 'medium', list: 'Important' },
  { id: 't5', title: 'Prepare architecture decision record', completed: true, dueDate: new Date(now - 2 * day).toISOString(), priority: 'low', list: 'Planned' },
  { id: 't6', title: 'Schedule partnership call with Rachel Kim', completed: false, dueDate: new Date(now + 4 * day).toISOString(), priority: 'medium', list: 'My Day' },
  { id: 't7', title: 'Update team wiki with new coding standards', completed: false, dueDate: new Date(now + 5 * day).toISOString(), priority: 'low', list: 'Planned' },
  { id: 't8', title: 'Fix deployment pipeline flakiness', completed: false, dueDate: new Date(now + day).toISOString(), priority: 'high', list: 'My Day' },
  { id: 't9', title: 'Order new monitors for the team', completed: true, dueDate: new Date(now - 3 * day).toISOString(), priority: 'low', list: 'Planned' },
  { id: 't10', title: 'Prepare slide deck for all-hands', completed: false, dueDate: new Date(now + 3 * day).toISOString(), priority: 'high', list: 'Important' },
];
