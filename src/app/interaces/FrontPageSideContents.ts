export interface FrontPageSideCategory {
  title: string;
  items: {
    label: string;
    link: string;
  }[];
}

export const FRONT_PAGE_SIDE_CONTENTS: FrontPageSideCategory[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'What Is Soll?', link: 'info/what-is-soll' },
      { label: 'How Soll Works', link: 'info/how-soll-works' },
    ],
  },
  {
    title: 'Soll Systems',
    items: [
      {
        label: 'End of Cycle Payout System (ECPS)',
        link: 'info/end-of-cycle-payout-system-ecps',
      },
      {
        label: 'Early Payout System (EPS)',
        link: 'info/early-payout-system-eps',
      },
    ],
  },
  {
    title: 'Groups',
    items: [
      { label: 'Creating a Group', link: 'info/creating-a-group' },
      { label: 'Membership Requests', link: 'info/membership-requests' },
      { label: 'Group Leaders', link: 'info/group-leaders' },
      { label: 'Finding a Group', link: 'info/finding-a-group' },
      { label: 'Joining Soll Groups', link: 'info/joining-soll-groups' },
    ],
  },
];
