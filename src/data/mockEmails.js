const avatarColors = [
  '#0078d4', '#e74856', '#00b294', '#8764b8',
  '#ca5010', '#038387', '#7160e8', '#c239b3',
  '#005a9e', '#498205', '#da3b01', '#647c64'
];

const hour = 1000 * 60 * 60;
const day = hour * 24;
const now = Date.now();

export const mockEmails = [
  // ─── INBOX ───────────────────────────────────────────
  {
    id: 'e1',
    folderId: 'inbox',
    sender: { name: 'Satya Nadella', email: 'satya@microsoft.com', avatar: null, color: avatarColors[0] },
    subject: 'Vision for the next quarter — key priorities',
    preview: 'I wanted to share some thoughts on our upcoming initiatives and the focus areas for Q4. Please review ahead of the all-hands meeting.',
    body: `<p>Team,</p>
<p>As we enter the next quarter, I wanted to share some thoughts on our upcoming initiatives and the focus areas for the team. We need to ensure we are aligned on our core objectives:</p>
<ul>
  <li>Accelerate cloud adoption across enterprise customers</li>
  <li>Invest in AI-first experiences across our product suite</li>
  <li>Strengthen our developer ecosystem and community partnerships</li>
</ul>
<p>Please review the attached deck and come prepared for the all-hands meeting on Thursday.</p>
<p>Best,<br/>Satya</p>`,
    date: new Date(now - 25 * 60 * 1000).toISOString(),
    isRead: false,
    hasAttachment: true,
    isFlagged: true,
    importance: 'high',
    categories: ['work'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [{ name: 'Leadership Team', email: 'leadership@microsoft.com' }],
    attachments: [
      { name: 'Q4_Priorities.pptx', size: '2.4 MB', type: 'pptx' },
      { name: 'Roadmap_Draft.pdf', size: '1.1 MB', type: 'pdf' }
    ]
  },
  {
    id: 'e2',
    folderId: 'inbox',
    sender: { name: 'GitHub Notifications', email: 'noreply@github.com', avatar: null, color: avatarColors[1] },
    subject: '[react] Pull request #28491 merged: Fix concurrent rendering edge case',
    preview: 'The pull request has been merged into main. 14 files changed, 342 insertions(+), 89 deletions(-).',
    body: `<p><strong>Pull Request #28491</strong> has been merged into <code>main</code>.</p>
<p>Fix concurrent rendering edge case where suspended components could trigger duplicate effects during hydration.</p>
<p><strong>Changes:</strong> 14 files changed, 342 insertions(+), 89 deletions(-)</p>
<p>Reviewers: @acdlite, @sebmarkbage</p>
<p><a href="#">View on GitHub →</a></p>`,
    date: new Date(now - 2 * hour).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: ['dev'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e3',
    folderId: 'inbox',
    sender: { name: 'Jessica Park', email: 'jessica.park@company.com', avatar: null, color: avatarColors[2] },
    subject: 'Design review: Updated brand guidelines v3',
    preview: 'Hi everyone, the brand guidelines have been updated to include the new logo variants and color palette. Attached is the full PDF.',
    body: `<p>Hi everyone,</p>
<p>The brand guidelines have been updated to include the new logo variants, color palette, and typography standards.</p>
<p>Key changes in v3:</p>
<ul>
  <li>New secondary color palette for marketing materials</li>
  <li>Updated spacing and grid system</li>
  <li>Social media template pack</li>
</ul>
<p>Please review the attached PDF for the full details and let me know if you have any questions.</p>
<p>Thanks,<br/>Jessica</p>`,
    date: new Date(now - 5 * hour).toISOString(),
    isRead: false,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: ['design'],
    recipients: [{ name: 'Design Team', email: 'design@company.com' }],
    cc: [{ name: 'Marketing', email: 'marketing@company.com' }],
    attachments: [
      { name: 'Brand_Guidelines_v3.pdf', size: '8.7 MB', type: 'pdf' }
    ]
  },
  {
    id: 'e4',
    folderId: 'inbox',
    sender: { name: 'Amazon Web Services', email: 'aws-notifications@amazon.com', avatar: null, color: avatarColors[3] },
    subject: 'AWS Cost Alert: Your estimated charges exceed $150.00',
    preview: 'Your AWS account has accrued estimated charges of $162.34 for the current billing period.',
    body: `<p>Dear AWS Customer,</p>
<p>Your AWS account (ID: ****-4829) has accrued estimated charges of <strong>$162.34</strong> for the current billing period (Sep 1–25, 2026).</p>
<p>Top services by cost:</p>
<ul>
  <li>Amazon EC2: $89.50</li>
  <li>Amazon S3: $34.20</li>
  <li>Amazon RDS: $28.64</li>
  <li>Other: $10.00</li>
</ul>
<p>To review your usage, visit the <a href="#">AWS Billing Dashboard</a>.</p>`,
    date: new Date(now - 8 * hour).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: true,
    importance: 'high',
    categories: ['billing'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e5',
    folderId: 'inbox',
    sender: { name: 'Marcus Williams', email: 'marcus.w@company.com', avatar: null, color: avatarColors[4] },
    subject: 'Re: Sprint planning — API migration timeline',
    preview: 'I agree with the proposed timeline. Let me check with the backend team about the database schema changes before we commit to the Nov 15 deadline.',
    body: `<p>Hey,</p>
<p>I agree with the proposed timeline. Let me check with the backend team about the database schema changes before we commit to the Nov 15 deadline.</p>
<p>A few concerns:</p>
<ol>
  <li>The auth service migration needs at least 2 weeks of testing</li>
  <li>We should coordinate the rollout with the mobile team</li>
  <li>Monitoring dashboards need to be set up before going live</li>
</ol>
<p>Can we discuss this in tomorrow's standup?</p>
<p>—Marcus</p>`,
    date: new Date(now - 12 * hour).toISOString(),
    isRead: false,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: ['work'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [{ name: 'Engineering', email: 'eng@company.com' }],
    attachments: []
  },
  {
    id: 'e6',
    folderId: 'inbox',
    sender: { name: 'LinkedIn', email: 'notifications@linkedin.com', avatar: null, color: avatarColors[5] },
    subject: 'You appeared in 23 searches this week',
    preview: 'See who\'s viewed your profile and discover new connection opportunities. Your profile ranking has improved by 12%.',
    body: `<p>Hi Alex,</p>
<p>You appeared in <strong>23 searches</strong> this week — that's a 12% increase from last week.</p>
<p>Top search appearances by:</p>
<ul>
  <li>Recruiters at tech companies</li>
  <li>Product managers in your network</li>
  <li>People who viewed similar profiles</li>
</ul>
<p><a href="#">See all search appearances →</a></p>`,
    date: new Date(now - day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e7',
    folderId: 'inbox',
    sender: { name: 'Priya Sharma', email: 'priya.sharma@company.com', avatar: null, color: avatarColors[6] },
    subject: 'Onboarding docs for new team members',
    preview: 'Hi Alex, I\'ve compiled the onboarding documents for the three new hires starting next Monday. Could you review the technical sections?',
    body: `<p>Hi Alex,</p>
<p>I've compiled the onboarding documents for the three new hires starting next Monday. Could you review the technical sections before I send them out?</p>
<p>Documents included:</p>
<ul>
  <li>Development environment setup guide</li>
  <li>Code review standards and PR workflow</li>
  <li>Architecture overview and service map</li>
  <li>Team communication channels and escalation paths</li>
</ul>
<p>I'd appreciate your feedback by Thursday EOD if possible.</p>
<p>Thanks!<br/>Priya</p>`,
    date: new Date(now - day - 3 * hour).toISOString(),
    isRead: false,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: ['work'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: [
      { name: 'Onboarding_Pack.zip', size: '15.2 MB', type: 'zip' }
    ]
  },
  {
    id: 'e8',
    folderId: 'inbox',
    sender: { name: 'Slack', email: 'notification@slack.com', avatar: null, color: avatarColors[7] },
    subject: 'New messages in #engineering-general',
    preview: 'You have 5 unread messages in channels you follow. @david mentioned you in #engineering-general.',
    body: `<p>You have <strong>5 unread messages</strong> in channels you follow:</p>
<p><strong>#engineering-general</strong> — @david mentioned you:<br/>
"Hey @alex, can you take a look at the deployment pipeline? It's been flaky since the infra update."</p>
<p><strong>#random</strong> — 3 new messages</p>
<p><a href="#">Open Slack →</a></p>`,
    date: new Date(now - 2 * day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e9',
    folderId: 'inbox',
    sender: { name: 'Rachel Kim', email: 'rachel.kim@venture.com', avatar: null, color: avatarColors[8] },
    subject: 'Follow-up: Partnership discussion',
    preview: 'Great meeting you at the conference last week. I\'d love to continue our conversation about the potential integration between our platforms.',
    body: `<p>Hi Alex,</p>
<p>Great meeting you at the TechConnect conference last week. I'd love to continue our conversation about the potential integration between our platforms.</p>
<p>To recap what we discussed:</p>
<ul>
  <li>API-level integration for shared customer data</li>
  <li>Co-marketing opportunities for Q1 2027</li>
  <li>Joint webinar series for enterprise customers</li>
</ul>
<p>Would you be available for a 30-minute call next Tuesday? I'm free between 2–5 PM PST.</p>
<p>Looking forward to it!</p>
<p>Rachel Kim<br/>VP of Partnerships, Venture Corp</p>`,
    date: new Date(now - 3 * day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: true,
    importance: 'normal',
    categories: ['business'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e10',
    folderId: 'inbox',
    sender: { name: 'Vercel', email: 'notifications@vercel.com', avatar: null, color: avatarColors[9] },
    subject: 'Deployment successful: outlook-clone-8x2k',
    preview: 'Your project outlook-clone-8x2k has been deployed to production. Build time: 34s. Status: Ready.',
    body: `<p>Your project <strong>outlook-clone-8x2k</strong> has been deployed.</p>
<p><strong>Status:</strong> ✅ Ready<br/>
<strong>Branch:</strong> main<br/>
<strong>Commit:</strong> fix: sidebar collapse animation<br/>
<strong>Build Time:</strong> 34s<br/>
<strong>Domain:</strong> outlook-clone-8x2k.vercel.app</p>
<p><a href="#">View Deployment →</a></p>`,
    date: new Date(now - 3 * day - 5 * hour).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: ['dev'],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },

  // ─── SENT ITEMS ──────────────────────────────────────
  {
    id: 'e11',
    folderId: 'sent',
    sender: { name: 'You', email: 'alex@outlook.com', avatar: null, color: avatarColors[0] },
    subject: 'Re: Sprint planning — API migration timeline',
    preview: 'Thanks Marcus. Let\'s aim for a phased rollout starting Nov 1. I\'ll draft the migration plan today.',
    body: `<p>Thanks Marcus,</p>
<p>Let's aim for a phased rollout starting Nov 1. I'll draft the migration plan today and share it with the team for review.</p>
<p>Agreed on all three points. I'll also loop in DevOps for the monitoring setup.</p>
<p>—Alex</p>`,
    date: new Date(now - 11 * hour).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'Marcus Williams', email: 'marcus.w@company.com' }],
    cc: [{ name: 'Engineering', email: 'eng@company.com' }],
    attachments: []
  },
  {
    id: 'e12',
    folderId: 'sent',
    sender: { name: 'You', email: 'alex@outlook.com', avatar: null, color: avatarColors[0] },
    subject: 'Project update — Week 38 summary',
    preview: 'Hi team, here is the weekly summary for Week 38. Key highlights include the API migration kickoff and the new monitoring dashboard.',
    body: `<p>Hi team,</p>
<p>Here is the weekly summary for Week 38:</p>
<ul>
  <li><strong>API Migration:</strong> Kickoff meeting completed, timeline agreed</li>
  <li><strong>Monitoring:</strong> New Grafana dashboards deployed</li>
  <li><strong>Performance:</strong> P99 latency reduced by 18% after caching update</li>
  <li><strong>Hiring:</strong> 3 new engineers starting Monday</li>
</ul>
<p>Next week's priorities are in the attached doc.</p>
<p>Best,<br/>Alex</p>`,
    date: new Date(now - 2 * day).toISOString(),
    isRead: true,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: ['work'],
    recipients: [{ name: 'Engineering Team', email: 'eng@company.com' }],
    cc: [{ name: 'VP Engineering', email: 'vp.eng@company.com' }],
    attachments: [
      { name: 'Week38_Summary.docx', size: '245 KB', type: 'docx' }
    ]
  },

  // ─── DRAFTS ──────────────────────────────────────────
  {
    id: 'e13',
    folderId: 'drafts',
    sender: { name: 'You', email: 'alex@outlook.com', avatar: null, color: avatarColors[0] },
    subject: 'Proposal: Microservices architecture migration',
    preview: 'Draft — This document outlines the proposed migration from our monolithic architecture to a microservices-based approach...',
    body: `<p><em>[DRAFT]</em></p>
<p>This document outlines the proposed migration from our monolithic architecture to a microservices-based approach.</p>
<p>Key sections to complete:</p>
<ul>
  <li>Risk assessment matrix</li>
  <li>Cost-benefit analysis</li>
  <li>Team allocation and timeline</li>
</ul>`,
    date: new Date(now - 4 * hour).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'CTO', email: 'cto@company.com' }],
    cc: [],
    attachments: []
  },

  // ─── DELETED ITEMS ───────────────────────────────────
  {
    id: 'e14',
    folderId: 'deleted',
    sender: { name: 'Newsletter Weekly', email: 'digest@newsletter.com', avatar: null, color: avatarColors[10] },
    subject: 'Your weekly tech digest — Issue #247',
    preview: 'Top stories: React 19 stable release, TypeScript 6.0 beta, and the future of WebAssembly.',
    body: `<p>Your weekly tech digest — Issue #247</p>
<p>Top stories this week:</p>
<ul>
  <li>React 19 stable release notes</li>
  <li>TypeScript 6.0 beta announced</li>
  <li>The future of WebAssembly</li>
</ul>`,
    date: new Date(now - 5 * day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },
  {
    id: 'e15',
    folderId: 'deleted',
    sender: { name: 'Promotions', email: 'deals@store.com', avatar: null, color: avatarColors[11] },
    subject: '🎉 Flash Sale — 50% off everything this weekend!',
    preview: 'Don\'t miss our biggest sale of the year. Use code FLASH50 at checkout.',
    body: `<p>🎉 Flash Sale!</p><p>50% off everything this weekend. Use code <strong>FLASH50</strong> at checkout.</p>`,
    date: new Date(now - 6 * day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },

  // ─── JUNK ────────────────────────────────────────────
  {
    id: 'e16',
    folderId: 'junk',
    sender: { name: 'Unknown Sender', email: 'xyz123@suspicious.net', avatar: null, color: '#888' },
    subject: 'You have won a prize! Claim now!',
    preview: 'Congratulations! You have been selected as the winner of our monthly giveaway...',
    body: `<p>Congratulations! You have been selected as the winner of our monthly giveaway. Click below to claim your prize.</p><p><em>This is a suspicious email. It has been moved to Junk.</em></p>`,
    date: new Date(now - 2 * day).toISOString(),
    isRead: false,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'You', email: 'alex@outlook.com' }],
    cc: [],
    attachments: []
  },

  // ─── ARCHIVE ─────────────────────────────────────────
  {
    id: 'e17',
    folderId: 'archive',
    sender: { name: 'HR Department', email: 'hr@company.com', avatar: null, color: avatarColors[2] },
    subject: 'Holiday schedule for 2027',
    preview: 'Please find the approved holiday schedule for the upcoming year attached.',
    body: `<p>Dear team,</p><p>Please find the approved holiday schedule for 2027 attached.</p><p>Key dates:</p>
<ul><li>New Year's Day: Jan 1</li><li>Spring Break: Mar 28–Apr 1</li><li>Summer Break: Jul 4–8</li><li>Thanksgiving: Nov 25–26</li><li>Winter Break: Dec 23–Jan 1</li></ul>`,
    date: new Date(now - 14 * day).toISOString(),
    isRead: true,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'Company All', email: 'all@company.com' }],
    cc: [],
    attachments: [
      { name: 'Holiday_Schedule_2027.pdf', size: '340 KB', type: 'pdf' }
    ]
  },
  {
    id: 'e18',
    folderId: 'archive',
    sender: { name: 'David Chen', email: 'david.chen@company.com', avatar: null, color: avatarColors[8] },
    subject: 'Architecture Decision Record: Event-driven messaging',
    preview: 'Attached is the ADR for moving to an event-driven messaging system using Kafka. Please review at your convenience.',
    body: `<p>Team,</p>
<p>Attached is the Architecture Decision Record (ADR) for moving to an event-driven messaging system using Kafka.</p>
<p>Summary: We propose replacing our REST-based inter-service communication with Apache Kafka for asynchronous event processing. This will improve system resilience and decouple services.</p>
<p>Please review at your convenience and add comments directly to the doc.</p>
<p>—David</p>`,
    date: new Date(now - 21 * day).toISOString(),
    isRead: true,
    hasAttachment: true,
    isFlagged: false,
    importance: 'normal',
    categories: ['dev'],
    recipients: [{ name: 'Engineering', email: 'eng@company.com' }],
    cc: [],
    attachments: [
      { name: 'ADR_Event_Driven.md', size: '12 KB', type: 'md' }
    ]
  },

  // ─── SCHEDULED ───────────────────────────────────────
  {
    id: 'e19',
    folderId: 'scheduled',
    sender: { name: 'You', email: 'alex@outlook.com', avatar: null, color: avatarColors[0] },
    subject: 'Happy birthday, Elena!',
    preview: 'Wishing you a wonderful birthday and a fantastic year ahead!',
    body: `<p>Hi Elena,</p><p>Wishing you a wonderful birthday and a fantastic year ahead! 🎂🎉</p><p>Best,<br/>Alex</p>`,
    date: new Date(now + 5 * day).toISOString(),
    isRead: true,
    hasAttachment: false,
    isFlagged: false,
    importance: 'normal',
    categories: [],
    recipients: [{ name: 'Elena Rodriguez', email: 'elena@company.com' }],
    cc: [],
    attachments: []
  }
];