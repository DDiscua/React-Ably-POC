import { Route } from "react-router-dom";
import { Dashboard, Publisher } from "./views";
import App from "./App";
import { ROUTES } from "./routes";

export const AppRouter = () => {
  <Route element={<App />}>
    <Route path={ROUTES.dashboard.base} element={<Dashboard />}></Route>
    <Route path={ROUTES.publisher.base} element={<Publisher />}></Route>
  </Route>;
};
