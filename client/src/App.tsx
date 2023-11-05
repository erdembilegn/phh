import { useUserInfo } from '@libs/hooks';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomeContainer from './pages/Home/HomeContainer';
import LoginContainer from './pages/Login/LoginContainer';

const App: React.FC = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useUserInfo();
  const [userInfo] = useAtom(userInfoAtom);
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate, userInfo]);
  return (
    <div className="bg-[#eae8f0]">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomeContainer />
            </>
          }
        />
        <Route path="/login" element={<LoginContainer />} />
      </Routes>
    </div>
  );
};
export default App;
