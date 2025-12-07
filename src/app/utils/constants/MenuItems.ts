export interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

export const navDesktopItems: MenuItem[] = [
  { label: 'Home', route: '/', icon: 'home' },
  { label: 'About', route: '/about', icon: 'info' },
  { label: 'Contact Us', route: '/contact-us', icon: 'call' },
];

export const menuItemsDesktop: MenuItem[] = [
  {
    label: 'Learn more about Soll',
    route: '/info/how-soll-works',
    icon: 'school',
  },
  {
    label: 'Early Payout System',
    route: '/info/early-payout-system',
    icon: 'payments',
  },
  {
    label: 'End of Cycle Payout System',
    route: '/info/end-of-cycle-payout-system-ecps',
    icon: 'autorenew',
  },
  {
    label: 'Becoming a Soll Leader',
    route: '/info/group-leaders',
    icon: 'military_tech',
  },
  {
    label: 'Becoming a Soll Partner',
    route: '/partnership',
    icon: 'handshake',
  },
  { label: 'Feedback', route: '/feedback', icon: 'feedback' },
];

export const menuItemsMobile: MenuItem[] = [
  {
    label: 'Learn more about Soll',
    route: '/info/how-soll-works',
    icon: 'school',
  },
  {
    label: 'Early Payout System',
    route: '/info/early-payout-system',
    icon: 'payments',
  },
  {
    label: 'End of Cycle Payout System',
    route: '/info/end-of-cycle-payout-system-ecps',
    icon: 'autorenew',
  },
  {
    label: 'Becoming a Soll Leader',
    route: '/info/group-leaders',
    icon: 'military_tech',
  },
  {
    label: 'Becoming a Soll Partner',
    route: '/partnership',
    icon: 'handshake',
  },
  { label: 'About', route: '/about', icon: 'info' },
  { label: 'Contact Us', route: '/contact-us', icon: 'call' },
  { label: 'Feedback', route: '/feedback', icon: 'feedback' },
];
