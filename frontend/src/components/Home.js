
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import Admin1_Header from './Admin1_Header'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCheckbox(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        return <div>Invalid credentials</div>;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    return <Admin1_Header />;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '2px', backgroundColor: '#f8f9fa' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="navbar-brand">
            <img alt="logo" src="logo_new.png" style={{ maxHeight: '70px' }} />
          </a>
          <div className="text-center" style={{ marginLeft: '-20px' }}>
            <h1 className="fw-bold mb-3">N.S.S. Attendance Portal</h1>
            <p style={{ fontSize: '20px', color: '#4C0099' }}>
              <b>NATIONAL INSTITUTE OF TECHNOLOGY JAMSHEDPUR</b>
            </p>
          </div>
          <div></div>
        </div>
      </nav>

      <section className="text-center text-lg-start" style={{ backgroundColor: '#f8f9fa', paddingTop: '50px' }}>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card mb-3">
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-lg-4 d-none d-lg-flex">
                    <div className="border rounded-5" style={{ marginLeft: '30px', height: '220px', backgroundColor: '#f8f9fa' }}>
                      <img src="intro2.png" alt="logo" className="w-100 h-100 rounded-5" />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card-body py-2 px-md-5">
                      <h2 className="fw-bold mb-3 text-center">Sign In</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <HiUser />
                            </span>
                            <input
                              type="email"
                              id="form2Example1"
                              className="form-control"
                              value={email}
                              onChange={handleEmailChange}
                            />
                          </div>
                          <label className="form-label" htmlFor="form2Example1">
                            Username
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text">
                              <HiLockClosed />
                            </span>
                            <input
                              type="password"
                              id="form2Example2"
                              className="form-control"
                              value={password}
                              onChange={handlePasswordChange}
                            />
                          </div>
                          <label className="form-label" htmlFor="form2Example2">
                            Password
                          </label>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="col-sm-offset-0 col-sm-12">
                              <div className="alert alert-info">Username is the Registration Number.</div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col d-flex justify-content-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={checkbox}
                                id="form2Example31"
                                checked={checkbox}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label" htmlFor="form2Example31">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <a href="#!">Forgot password?</a>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
























// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
// import { HiUser, HiLockClosed } from 'react-icons/hi';
// import Admin1_Header from './Admin1_Header';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [checkbox, setCheckbox] = useState(false);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleCheckboxChange = (e) => {
//     setCheckbox(e.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       console.log(data);
//       if (data.success) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         return <div>Invalid credentials</div>;
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (isLoggedIn) {
//     return <Admin1_Header />;
//   }

//   return (
    
//     <div style={{ background: 'linear-gradient(to right, yellow, skyblue)', minHeight: '100vh' }}>
//       <Container>
//         <Row>
//           <Col sm={6} style={{ backgroundColor: 'skyblue', padding: '20px' }}>
//             <img
//               src="nss_logo.png"
//               alt="logo"
//               className="w-100 h-100 rounded-5"
//               style={{ width: '50px', height: '50px' }}
//             />
//           </Col>
//           <Col sm={6} style={{ backgroundColor: 'lightyellow', padding: '20px' }}>
//             <div className="card mb-3">
//               <div className="card-body py-2 px-md-5">
//                 <h2 className="fw-bold mb-3 text-center">Sign In</h2>
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-outline mb-4">
//                     <div className="input-group">
//                       <span className="input-group-text">
//                         <HiUser />
//                       </span>
//                       <input
//                         type="email"
//                         id="form2Example1"
//                         className="form-control"
//                         value={email}
//                         onChange={handleEmailChange}
//                       />
//                     </div>
//                     <label className="form-label" htmlFor="form2Example1">
//                       Username
//                     </label>
//                   </div>
//                   <div className="form-outline mb-4">
//                     <div className="input-group">
//                       <span className="input-group-text">
//                         <HiLockClosed />
//                       </span>
//                       <input
//                         type="password"
//                         id="form2Example2"
//                         className="form-control"
//                         value={password}
//                         onChange={handlePasswordChange}
//                       />
//                     </div>
//                     <label className="form-label" htmlFor="form2Example2">
//                       Password
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <div className="col-md-12">
//                       <div className="col-sm-offset-0 col-sm-12">
//                         <div className="alert alert-info">Username is the Registration Number.</div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row mb-4">
//                     <div className="col d-flex justify-content-center">
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           value={checkbox}
//                           id="form2Example31"
//                           checked={checkbox}
//                           onChange={handleCheckboxChange}
//                         />
//                         <label className="form-check-label" htmlFor="form2Example31">
//                           Remember me
//                         </label>
//                       </div>
//                     </div>
//                     <div className="col">
//                       <a href="#!">Forgot password?</a>
//                     </div>
//                   </div>
//                   <button type="submit" className="btn btn-primary btn-block mb-4">
//                     Sign in
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;
