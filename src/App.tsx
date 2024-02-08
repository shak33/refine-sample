import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { MuiInferencer } from "@refinedev/inferencer/mui";

import { ListPostsPage } from "./pages/blog/posts/list/";
import { EditPostPage } from "./pages/blog/posts/edit/";
import { ShowPostPage } from "./pages/blog/posts/show";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                  {
                    name: "posts",
                    list: "/posts",
                    show: "/posts/show/:id",
                    edit: "posts/edit/:id",
                    create: "posts/create",
                  }
                ]}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                  <Route path="/posts" element={<ListPostsPage />} />
                  <Route path="/posts/show/:id" element={<ShowPostPage />} />
                  <Route path="/posts/edit/:id" element={<EditPostPage />} />
                  <Route path="/posts/create" element={<MuiInferencer />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
