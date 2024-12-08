import { Routes, Route } from 'react-router';

import { Layout } from './layouts/default.tsx';
import { CreatePoll } from './views/createPoll.tsx';
import { ViewPolls } from './views/viewPolls.tsx';
import { RedirectTo } from './views/redirectTo.tsx';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CreatePoll />} />
        <Route path="view" element={<ViewPolls />} />
        <Route path="*" element={<RedirectTo to="/view" />} />
      </Route>
    </Routes>
  );
}
