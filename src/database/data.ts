import { DashboardCardProps } from "../models";

export const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Invoices",
    path: "invoices",
  },
];
export const settings = [
  {
    name: "Profile",
    path: "profile",
  },
  {
    name: "Account",
    path: "account",
  },
  {
    name: "Dashboard",
    path: "dashboard",
  }
];
export const users = [
  {
    id: 11,
    email: "admin@gmail.com",
    password: "111",
    role: "ADMIN",
    permissions: "ANY",
  },
  {
    id: 12,
    email: "vasea@gmail.com",
    password: "111",
    role: "CLIENT",
    permissions: "OWN",
  },
];
export const UserDashboard:DashboardCardProps[]=[
  {
    icon: 'ReceiptOutlinedIcon',
    title: 'invoices',
    content: '14'
},{
  icon: 'PaidOutlinedIcon',
  title: 'paid',
  content: '$ 49K'
}
]

export const AdminDashboard: DashboardCardProps[] = [
  {
      icon: 'GroupOutlinedIcon',
      title: 'clients',
      content: '12'
  },
  {
      icon: 'ReceiptOutlinedIcon',
      title: 'invoices',
      content: '14'
  },
  {
      icon: 'DownloadingOutlinedIcon',
      title: 'invoiced',
      content: '$ 65K'
  },
  {
      icon: 'PaidOutlinedIcon',
      title: 'paid',
      content: '$ 49K'
  }
]
