import { Outlet } from 'react-router';

import { Header } from '../components/header.tsx';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
