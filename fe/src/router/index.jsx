import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';
import Layout from '../containers/Layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={<Page />}></Route>
          );
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
};

export default AppRouter;
