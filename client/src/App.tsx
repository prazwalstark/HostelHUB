import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import Loading from "./components/Loading";
import "../index.css";
import { Navigate } from "react-router-dom";

const Admindashboard = lazy(() => import("./pages/Admindashboard"));
const Profile = lazy(() => import("./components/Profile"));
const SignUp = lazy(()=>import("./pages/Signuppage"));
const Roomallocation = lazy(() => import("./pages/Roomallocation"));
const Complains = lazy(() => import("./pages/Complains"));
const Clientregisterroom = lazy(() => import("./pages/Clientregisterroom"));
const Notices = lazy(() => import("./pages/Notices"));
const Clientnotices = lazy(() => import("./pages/Clientnotices"));
const Clientcomplains = lazy(() => import("./pages/Clientcomplains"));
const Studentrecords = lazy(() => import("./pages/Studentrecords"));
const Login = lazy(() => import("./pages/clientSignin"));
const Clientchangepassword = lazy(() => import("./pages/Clientchangepassword"));
const Changepassword = lazy(() => import("./pages/Changepassword"));


const App = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const adminResponse = await fetch(
          "https://prajjwal-bhai-test-be.asaurav.com.np/admin/auth/checkauthentication",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        const userResponse = await fetch(
          "https://prajjwal-bhai-test-be.asaurav.com.np/user/auth/checkauthentication",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        if (adminResponse.ok) {
          setAuthState({ isAuthenticated: true, isAdmin: true });
        } else if (userResponse.ok) {
          setAuthState({ isAuthenticated: true, isAdmin: false });
        } else {
          setAuthState({ isAuthenticated: false, isAdmin: false });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthState({ isAuthenticated: false, isAdmin: false });
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  authState.isAuthenticated
                    ? authState.isAdmin
                      ? "/admin/dashboard"
                      : "/client/dashboard"
                    : "/login"
                }
                replace
              />
            }
          />
          <Route
            path="/login"
            element={
              authState.isAuthenticated ? (
                <Navigate
                  to={
                    authState.isAuthenticated
                      ? authState.isAdmin
                        ? "/admin/dashboard"
                        : "/client/dashboard"
                      : "/login"
                  }
                  replace
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/Signup"
            element={
                <SignUp />
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Admindashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/client/dashboard"
            element={
              authState.isAuthenticated && !authState.isAdmin ? (
                <Profile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Other routes for admin */}
          <Route
            path="/admin/roomallocation"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Roomallocation />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin/complains"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Complains />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin/notices"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Notices />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin/studentrecords"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Studentrecords />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin/changepassword"
            element={
              authState.isAuthenticated && authState.isAdmin ? (
                <Changepassword />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Other routes for client */}
          <Route
            path="/client/registerroom"
            element={
              authState.isAuthenticated && !authState.isAdmin ? (
                <Clientregisterroom />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/client/complains"
            element={
              authState.isAuthenticated && !authState.isAdmin ? (
                <Clientcomplains />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/client/notices"
            element={
              authState.isAuthenticated && !authState.isAdmin ? (
                <Clientnotices />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/client/clientchangepassword"
            element={
              authState.isAuthenticated && !authState.isAdmin ? (
                <Clientchangepassword />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
