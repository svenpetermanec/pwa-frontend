import { LoginContainer } from 'containers/LoginContainer';
import { RegisterContainer } from 'containers/RegisterContainer';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoggedInStateEnum } from 'redux/reducers/authReducer';
import { RootState } from 'redux/store';

export const App = () => {
  const isLoggedIn = () => loggedInState === LoggedInStateEnum.LoggedIn;

  const loggedInState: LoggedInStateEnum = useSelector(
    (state: RootState) => state.auth.loggedInState
  );

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
        <Route path={'/register'} element={<RegisterContainer />} />
        <Route
          path={'/home'}
          element={isLoggedIn() ? <div>home</div> : <Navigate to={'/login'} />}
        />
        <Route path={'*'} element={<Navigate to={'/login'} />} />
      </Routes>
    </>
  );
};
