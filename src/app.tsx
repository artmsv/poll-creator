import { Routes, Route } from 'react-router';

import { Layout } from './layouts/default.tsx';
import { CreatePollForm } from './views/createPoll.tsx';
import { ViewPolls } from './views/viewPolls.tsx';
import { RedirectTo } from './views/RedirectTo.tsx';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CreatePollForm />} />
        <Route path="view" element={<ViewPolls />} />
        <Route path="*" element={<RedirectTo to="/view" />} />
      </Route>
    </Routes>
  );
}
