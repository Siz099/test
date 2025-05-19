import { Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const AuthLayout = ({ children, backgroundImage, isLoginPage = false }) => {
  const navigate = useNavigate();

  return (
    <Layout className="auth-layout">
      <Content>
        <Row>
          {isLoginPage ? (
            <>
              <Col xs={0} sm={0} md={12} className="auth-background">
                <div
                  className="auth-background-image"
                  style={{
                    backgroundImage: `url(${
                      backgroundImage || "/images/mountain-lake.jpg"
                    })`,
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={12} className="auth-content">
                {children}
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} sm={24} md={12} className="auth-content">
                {children}
              </Col>
              <Col xs={0} sm={0} md={12} className="auth-background">
                <div
                  className="auth-background-image"
                  style={{
                    backgroundImage: `url(${
                      backgroundImage || "/images/beach-wedding.jpg"
                    })`,
                  }}
                />
              </Col>
            </>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
