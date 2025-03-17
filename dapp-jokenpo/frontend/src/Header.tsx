
import React, { useEffect } from 'react'
import { doLogin, doLogout, isAdmin, isAuthenticated } from './Web3Service';
import { useNavigate } from 'react-router-dom';
function Header() {

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {

      if(isAdmin()){
        doLogin()
            .then(loginResult => {
                if(!loginResult.isAdmin){
                  navigate("/app");
                }
            }).catch(err => {
              console.error(err);
              onLogoutClick();
            });
      }else{
        navigate("/app");
      }
      
    } else {
      navigate("/");
    }
  }, [])

  function onLogoutClick() {
    doLogout();
    navigate("/");
  }

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
      <a href="/app" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-light">

        <span className="fs-4">Dapp JokenPo</span>
      </a>
      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-danger me-2" onClick={onLogoutClick}>Logout</button>
      </div>

    </header>
  )
}

export default Header;