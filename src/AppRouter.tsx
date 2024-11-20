import { Route } from "react-router-dom";
import { Dashboard, Publisher, About, PageNotFound } from "./views";
import { App } from "./App";
import { ROUTES } from "./routes";

export const AppRouter = (
  <Route path="/" element={<App />}>
    <Route path={ROUTES.dashboard.base} element={<Dashboard />}></Route>
    <Route path={ROUTES.publisher.base} element={<Publisher />}></Route>
    <Route path={ROUTES.about.base} element={<About />}></Route>

    <Route path={"*"} element={<PageNotFound />} />
  </Route>
);

export default AppRouter;
