export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-warning",
  },
  {
    path: "/admin/showing",
    title: "Tayangan",
    type: "sub",
    icontype: "fas fa-film text-green",
    collapse: "showing",
    isCollapsed: true,
    children: [
      { path: "showtime", title: "Jadual Tayangan", type: "link" },
      { path: "database", title: "Senarai Tayangan", type: "link" },
    ],
  },
  {
    path: "/admin/simulated-adventure",
    title: "Kembara Simulasi",
    type: "sub",
    icontype: "fas fa-desktop text-info",
    collapse: "simulated-adventure",
    isCollapsed: true,
    children: [
      { path: "simulatedtime", title: "Jadual Kembara Simulasi", type: "link" },
      {
        path: "simulatedregistration",
        title: "Senarai Permohonan",
        type: "link",
      },
    ],
  },
  {
    path: "/admin/exhibition",
    title: "Pameran",
    type: "sub",
    icontype: "fas fa-landmark text-dark",
    collapse: "exhibition",
    isCollapsed: true,
    children: [{ path: "exhibition", title: "Senarai Pameran", type: "link" }],
  },
  {
    path: "/admin/visit",
    title: "Lawatan",
    type: "sub",
    icontype: "fas fa-users text-orange",
    collapse: "visit",
    isCollapsed: true,
    children: [
      { path: "application", title: "Senarai Permohonan", type: "link" },
      { path: "close-visit", title: "Jadual Penutupan Lawatan", type: "link" },
    ],
  },
  {
    path: "/admin/education-program",
    title: "Program Pendidikan",
    type: "sub",
    icontype: "fas fa-chalkboard-teacher text-red",
    collapse: "education-program",
    isCollapsed: true,
    children: [
      { path: "list", title: "Senarai Program Pendidikan", type: "link" },
      { path: "application", title: "Senarai Permohonan", type: "link" },
      {
        path: "waiting-application",
        title: "Senarai Menunggu Permohonan",
        type: "link",
      },
    ],
  },
  {
    path: "/admin/ticketing",
    title: "Tiket",
    type: "sub",
    icontype: "fas fa-ticket-alt text-pink",
    collapse: "ticketing",
    isCollapsed: true,
    children: [{ path: "price", title: "Harga Tiket", type: "link" }],
  },
  {
    path: "/admin/feedback",
    title: "Maklum Balas",
    type: "sub",
    icontype: "fas fa-comments text-danger",
    collapse: "ticketing",
    isCollapsed: true,
    children: [
      { path: "list", title: "Senarai Borang Maklum Balas", type: "link" },
    ],
  },
  // {
  //   path: "/admin/educational-program",
  //   title: "Educational Program",
  //   type: "sub",
  //   icontype: "fas fa-book-reader text-green",
  //   collapse: "program",
  //   isCollapsed: true,
  //   children: [{ path: "database", title: "Database", type: "link" }],
  // },
  {
    path: "/admin/report",
    title: "Laporan",
    type: "sub",
    icontype: "far fa-file-alt text-yellow",
    collapse: "report",
    isCollapsed: true,
    children: [
      { path: "operation", title: "Laporan Operasi", type: "link" },
      { path: "analysis", title: "Laporan Analisa", type: "link" },
      { path: "ticket-sales", title: "Laporan Penjualan Tiket", type: "link" },
    ],
  },
  {
    path: "/admin/analytics",
    title: "Analytics",
    type: "sub",
    icontype: "far fa-chart-bar text-blue",
    collapse: "analytics",
    isCollapsed: true,
    children: [
      { path: "big-data", title: "Big Data Analytics", type: "link" },
      { path: "google", title: "Google Analytics", type: "link" },
    ],
  },
  {
    path: "/admin/calendar",
    title: "Kalendar",
    type: "link",
    icontype: "far fa-calendar-alt text-info",
  },
  {
    path: "/admin/utility",
    title: "Utiliti",
    type: "sub",
    icontype: "fas fa-cogs text-purple",
    collapse: "utility",
    isCollapsed: true,
    children: [
      {
        path: "public-user-mgmt",
        title: "Public User Management",
        type: "link",
      },
      { path: "staff-user-mgmt", title: "Staff User Management", type: "link" },
      { path: "user-privileges", title: "Staff User Privilege", type: "link" },
      { path: "audit-trail", title: "Audit Trail", type: "link" },
    ],
  },
];

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/
