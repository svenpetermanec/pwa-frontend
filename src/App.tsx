import { LoginContainer } from 'containers/LoginContainer';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  //check redux store
  const isLoggedIn = () => true;

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route path={'/login'} element={<LoginContainer />} />
        <Route path={'/register'} element={<div>register</div>} />
        <Route
          path={'/home'}
          element={isLoggedIn() ? <div>home</div> : <Navigate to={'/login'} />}
        />
        <Route path={'*'} element={<Navigate to={'/login'} />} />
      </Routes>
    </>
  );
};
