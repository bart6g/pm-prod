import React from "react";
import { PageContainer, PageWrapper } from "./homeElements";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSelector, useDispatch } from "react-redux";
import { clearMsg } from "../../../redux/user/userActions";

const BeforeLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { registerSuccess } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    dispatch(clearMsg());
  };
  return (
    <PageContainer>
      <PageWrapper isLogin={isLogin} registerSuccess={registerSuccess}>
        {isLogin ? (
          <LoginForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleFormChange={handleFormChange}
          />
        ) : (
          <RegisterForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleFormChange={handleFormChange}
          />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default BeforeLogin;
