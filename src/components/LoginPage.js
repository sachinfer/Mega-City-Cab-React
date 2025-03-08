import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/firebaseConfig'; // Firebase auth and Google provider
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import './LoginPage.css'; // Adjust this line to match the file name correctly

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/choose-role");
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/choose-role");
    } catch (err) {
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Welcome Back! <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Login to your account</span>
          </h1>
          <p className="px-3" style={{ color: 'hsl(218, 81%, 85%)' }}>
            Enter your credentials to continue using our platform.
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <form onSubmit={handleEmailLogin}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && <p className="text-danger text-center mb-4">{error}</p>}

                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                </div>

                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </MDBBtn>
              </form>

              <div className="text-center">
                <p>or login with:</p>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mdb-btn-google mb-3"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <MDBIcon fab icon="google" size="sm" />
                  &nbsp; Login with Google
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
