/** Monthly list price of one VDI license in EUR, excluding VAT. */
export const PRICE_PER_VDI = 4.99;

export const formatEUR = (value: number, decimals = 2) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

export const PRICE_LABEL = formatEUR(PRICE_PER_VDI);

const env = import.meta.env;

export const links = {
  stripeMonthly: env.PUBLIC_STRIPE_LINK_MONTHLY ?? '',
  stripeYearly: env.PUBLIC_STRIPE_LINK_YEARLY ?? '',
  paypalMonthly: env.PUBLIC_PAYPAL_LINK_MONTHLY ?? '',
  paypalYearly: env.PUBLIC_PAYPAL_LINK_YEARLY ?? '',
  trialForm: env.PUBLIC_TRIAL_FORM_ENDPOINT ?? '',
  notifyForm: env.PUBLIC_NOTIFY_FORM_ENDPOINT ?? '',
  clientWindows: env.PUBLIC_CLIENT_WINDOWS_URL ?? '',
  clientMacos: env.PUBLIC_CLIENT_MACOS_URL ?? '',
  salesEmail: env.PUBLIC_SALES_EMAIL ?? 'sales@vdiconnect.it',
};

export type NavKey = 'home' | 'use-cases' | 'compare' | 'pricing' | 'download';

export const nav: { key: NavKey | null; label: string; href: string }[] = [
  { key: null, label: 'Why VDIConnect', href: '/#why' },
  { key: null, label: 'Performance', href: '/#performance' },
  { key: 'use-cases', label: 'Use cases', href: '/use-cases/' },
  { key: 'compare', label: 'Compare', href: '/compare/' },
  { key: 'pricing', label: 'Pricing', href: '/pricing/' },
  { key: 'download', label: 'Free trial', href: '/download/' },
];

export interface Industry {
  id: string;
  label: string;
  title: string;
  teaser: string;
  image: string;
  alt: string;
  heading: string;
  challenge: string;
  solution: string;
  businessCase: string;
  vdis: number;
  costNote?: string;
  chips: string[];
}

export const industries: Industry[] = [
  {
    id: 'engineering',
    label: 'Engineering & manufacturing',
    title: 'CAD and electronics design, away from the workstation',
    teaser: 'Rack workstations and GPU VMs, reached from the plant, home or a supplier’s site.',
    image: '/images/engineering.jpg',
    alt: 'An engineer reviewing a circuit design on two monitors',
    heading: 'CAD and electronics design, wherever the engineer is.',
    challenge: 'CAD, simulation and PCB design need GPU workstations. Mobile workstations are expensive, and every one that leaves the building carries your designs with it.',
    solution: 'Workstations or GPU virtual machines stay in the server room. Engineers connect from an ordinary laptop at home, on the shop floor or at a supplier, with 4:4:4 colour for thin lines and small labels, relative mouse mode for 3D navigation and up to eight displays.',
    businessCase: 'A 30-engineer design team moves from 30 mobile workstations to central GPU hosts. Design data never leaves the building, hardware is refreshed in one place, and a new hire is productive as soon as a laptop arrives.',
    vdis: 30,
    chips: ['4:4:4 colour', 'Up to 8 displays', 'Relative mouse', 'Generated displays'],
  },
  {
    id: 'aec',
    label: 'Architecture & construction',
    title: 'BIM models stay in the office',
    teaser: 'Site teams open the current model over a mobile link, with nothing copied to site laptops.',
    image: '/images/aec-bim.jpg',
    alt: 'Two colleagues reviewing a building model on dual monitors',
    heading: 'BIM models stay in the office. The site still sees them.',
    challenge: 'BIM models run to gigabytes and change every day. Site offices work over 4G or 5G, and syncing models to laptops is slow, error-prone and risky.',
    solution: 'The model stays on the office workstation; only the picture travels. Loss protection keeps the image stable on mobile links, and the private overlay network reaches the office without a VPN.',
    businessCase: 'Twelve site managers review the current model from the site cabin, the same morning it changed — with no copies of the project on site laptops and no VPN to keep running.',
    vdis: 12,
    chips: ['Mobile links', 'No VPN', 'Mirrored displays'],
  },
  {
    id: 'media',
    label: 'Media & post-production',
    title: 'Edit, review and mix on studio hardware',
    teaser: 'Full-chroma picture and 7.1 sound, with footage kept on studio storage.',
    image: '/images/media.jpg',
    alt: 'An editor in headphones working on video in a dark room',
    heading: 'Edit, review and mix on studio hardware — from anywhere.',
    challenge: 'Editing and mixing need a fluid timeline, full-chroma picture and multichannel sound — and pre-release footage must never end up on personal machines.',
    solution: 'Editors work on studio workstations and shared storage from wherever they are, with 4:4:4 colour, high-refresh displays and 5.1 or 7.1 monitoring. Audio never waits behind video.',
    businessCase: 'Bring five freelance editors in for a month on five studio workstations licensed for that month: no hardware shipped, no footage copied, and access removed when the job ends.',
    vdis: 5,
    costNote: 'for the month',
    chips: ['7.1 surround', 'Up to 240 Hz', '4:4:4 colour', 'Monthly licenses'],
  },
  {
    id: 'finance',
    label: 'Finance & trading',
    title: 'The whole multi-screen desk, from home',
    teaser: 'Up to eight displays with input prioritised, for business continuity.',
    image: '/images/finance.jpg',
    alt: 'Trading charts on several monitors and a tablet',
    heading: 'The whole multi-screen desk, from home.',
    challenge: 'Trading and risk desks run four to eight screens, and data must stay in controlled environments — including on the day staff can’t reach the office.',
    solution: 'The desk streams to a home setup with up to eight displays, input and cursor ahead of video, and every application and dataset kept in the data centre.',
    businessCase: 'A business-continuity plan in which 20 critical desks can be worked from home the same day: the same desktop, the same screen layout, the same applications.',
    vdis: 20,
    chips: ['Up to 8 displays', 'Ultra-low latency', 'Data stays in the DC'],
  },
  {
    id: 'software',
    label: 'Software & game studios',
    title: 'The studio’s fastest machines, on day one',
    teaser: 'Gamepads, relative mouse and high refresh rates on studio hardware.',
    image: '/images/software.jpg',
    alt: 'A developer’s desk with code on screen and a backlit keyboard',
    heading: 'The studio’s fastest machines, on day one.',
    challenge: 'Build machines and GPU workstations are expensive, game testing needs controllers and responsive input, and the source code is the company.',
    solution: 'Developers and testers use studio machines remotely, with relative mouse mode for engines and 3D tools, up to four gamepads with rumble and display modes up to 240 Hz.',
    businessCase: 'Fifteen remote developers and testers work on the studio’s GPU hosts. Nobody waits for a workstation to be shipped, and the source code never leaves the studio network.',
    vdis: 15,
    chips: ['Gamepads', 'Relative mouse', 'High refresh'],
  },
  {
    id: 'contact',
    label: 'Contact centres',
    title: 'Clear headset audio, both ways',
    teaser: 'Home agents on the standard corporate desktop, from any laptop.',
    image: '/images/contact-center.jpg',
    alt: 'Contact centre agents wearing headsets at their desks',
    heading: 'Clear headset audio, on the standard desktop.',
    challenge: 'Agents spend the day on headset calls. Working from home needs clear two-way audio and the same locked-down desktop as in the office.',
    solution: 'Low-latency audio flows both ways, with an adaptive jitter buffer for home broadband. The corporate desktop runs on the host and reaches the agent on any laptop.',
    businessCase: 'Open a 40-agent home team without shipping managed PCs: license the agents’ desktops, send the free client link, and every agent works on the standard corporate desktop.',
    vdis: 40,
    chips: ['Two-way audio', 'Microphone', 'Any laptop'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    title: 'Clinical desktops that follow the clinician',
    teaser: 'Dictation and multi-display, with patient data kept in the hospital.',
    image: '/images/healthcare.jpg',
    alt: 'A doctor at a desk on a video call with a patient',
    heading: 'Clinical desktops that follow the clinician.',
    challenge: 'Clinicians move between wards, clinics and home on call, and patient data must stay inside the hospital.',
    solution: 'Clinical desktops stay in the hospital data centre and appear on whatever device the clinician has, with the microphone available for dictation and multiple displays for records and results.',
    businessCase: '25 on-call doctors open the same hospital desktop from home, sign in at the Windows sign-in screen and start dictating — with no patient data stored on the laptop.',
    vdis: 25,
    chips: ['Data stays in hospital', 'Dictation', 'Sign-in screen'],
  },
];

export const scenarios = [
  { title: 'Work from anywhere, without a VPN', text: 'Retire the VPN for desktop access: hosts are reachable over the private overlay network and never expose a port.' },
  { title: 'Business continuity', text: 'When the office is closed — strike, flood, snow — every desk keeps working from home on the same hosts.' },
  { title: 'Contractors and own devices', text: 'Give consultants and freelancers a full desktop without handing over a laptop or a copy of your data.' },
  { title: 'GPU hosts shared across shifts', text: 'Licensed per VDI, not per user: a day shift and a night shift share the same GPU workstation under one license.' },
  { title: 'IT support from the sign-in screen', text: 'Sign in, unlock and approve UAC prompts remotely, and reconnect after a restart without anyone at the desk.' },
  { title: 'The hybrid office', text: 'Mirror the office workstation from home: same desktop, same windows, exactly where you left them.' },
];

export interface CompareGroup {
  group: string;
  rows: { label: string; us: string; parsec: string; citrix: string; rdp: string }[];
}

export const comparison: CompareGroup[] = [
  {
    group: 'Positioning',
    rows: [
      { label: 'Designed for', us: 'Persistent 1:1 Windows VDI and remote workstations', parsec: 'Creative and game studios, remote workstations', citrix: 'Enterprise VDI and application delivery', rdp: 'Remote administration and Remote Desktop Services' },
    ],
  },
  {
    group: 'Picture',
    rows: [
      { label: 'Video codec', us: 'AV1, software or hardware encoding', parsec: 'H.264, H.265', citrix: 'H.264, H.265, AV1', rdp: 'H.264 (AVC 420 / AVC 444)' },
      { label: 'Full 4:4:4 chroma', us: 'Native AV1 4:4:4, chosen per connection', parsec: 'On Warp and Teams plans, Windows hosts', citrix: 'Yes, set by policy', rdp: 'AVC 444 mode, set by policy' },
      { label: 'Monitors', us: 'Up to 8, virtual or mirrored', parsec: 'Multiple', citrix: 'Multiple', rdp: 'Up to 16' },
      { label: 'Virtual displays on headless hosts', us: 'Yes — generated displays sized to the client window, or mirrored monitors', parsec: 'Yes, on paid plans', citrix: 'Yes', rdp: 'Yes, per session' },
    ],
  },
  {
    group: 'Network',
    rows: [
      { label: 'Transport', us: 'Low-latency encrypted UDP transport, TLS 1.3', parsec: 'Proprietary UDP protocol', citrix: 'EDT over UDP, with TCP fallback', rdp: 'TCP, with RDP-UDP' },
      { label: 'Reach hosts without a VPN', us: 'Built in — private overlay network, encrypted relay fallback', parsec: 'Built in — peer-to-peer, with relays', citrix: 'Citrix Gateway or Gateway Service', rdp: 'RD Gateway, VPN or Azure Virtual Desktop' },
    ],
  },
  {
    group: 'Platforms',
    rows: [
      { label: 'Host', us: 'Windows 11 x64', parsec: 'Windows, macOS', citrix: 'Windows, Linux', rdp: 'Windows' },
      { label: 'Clients', us: 'Windows, macOS; Linux coming soon', parsec: 'Windows, macOS, Linux, Android, web', citrix: 'Windows, macOS, Linux, iOS, Android, ChromeOS, web', rdp: 'Windows, macOS, iOS, Android, web; Linux through third-party clients' },
    ],
  },
  {
    group: 'Deployment and licensing',
    rows: [
      { label: 'Infrastructure', us: 'A server on each host, a client on each device', parsec: 'Parsec account and cloud service', citrix: 'Delivery Controllers, StoreFront and Gateway, or Citrix Cloud', rdp: 'Built into Windows; RDS roles for multi-user farms' },
      { label: 'Brokering and fleet management', us: 'Not included — clients connect to each host directly', parsec: 'Team admin console', citrix: 'Yes', rdp: 'RD Connection Broker' },
      { label: 'Licensing', us: `${PRICE_LABEL} per VDI per month, bought online by card or PayPal; free client, 30-day server trial`, parsec: 'Free for personal use; Warp and Teams subscriptions', citrix: 'Subscriptions through Citrix and partners', rdp: 'Included in Windows; RDS CALs for session hosts' },
    ],
  },
];
