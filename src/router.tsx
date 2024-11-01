import Footer from "@components/Common/Footer";
import Header from "@components/Common/Header";
import RegisterPage from "@pages/RegisterPage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import MyPage from "@pages/MyPage";
import PostCreatePage from "@pages/PostCreatePage";
import PostDetailPage from "@pages/PostDetailPage";
import PostPage from "@pages/PostPage";
import RankPage from "@pages/RankPage";
import SearchPage from "@pages/SearchPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ProtectedRoute } from "@components/Common/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main id="wrapper">
          <Outlet />
        </main>
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/post",
        element: <PostPage />
      },
      {
        path: "/post/popular",
        element: <PostPage />
      },
      {
        path: "/post/user/:id",
        element: <PostPage />
      },
      {
        path: "/post/:id",
        element: <PostDetailPage />
      },
      {
        path: "/post/create",
        element: (
          <ProtectedRoute>
            <PostCreatePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/mypage",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/rank",
        element: <RankPage />
      },
      {
        path: "/search/:query",
        element: <SearchPage />
      }
    ]
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute redirectUrl="/" requireLogin={false}>
        <LoginPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute redirectUrl="/" requireLogin={false}>
        <RegisterPage />
      </ProtectedRoute>
    )
  }
]);
