import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogin, isAdmin, isAuthenticated } from './Web3Service';


function Login() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isAuthenticated()) {

            redirectAfterLogin(isAdmin());
        }

    }, []);

    function redirectAfterLogin(isAdmin: boolean) {
        navigate(isAdmin ? "/admin" : "/app");
    }


    function onBtnClick() {
        setMessage("Logging in...");

        doLogin()
            .then(loginResult => {
                redirectAfterLogin(loginResult.isAdmin);
                setMessage("");
            }
            ).catch(err => setMessage(err.message));
    }

    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">DAPP JokenPo</h3>

                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
                        <a className="nav-link fw-bold py-1 px-0" href="#">About</a>
                    </nav>
                </div>
            </header>

            <main className="px-3">
                <h1>Login and play with us</h1> <br />

                <p className="lead">Play Rock-Paper-Scissors and earn prizes </p>
                <br /><br />
                <p className="lead">
                    <a href="#" onClick={onBtnClick} className="btn btn-lg btn-light fw-bold border-white bg-white">
                        <img src="/assets/metamask.svg" alt='Metamask logo' width={48} />
                        Login with MetaMask </a>
                </p>
                <p className="lead">
                    {message}
                </p>
            </main>

            <footer className="mt-auto text-white-50">
                <p>Built by  <a href="https://www.linkedin.com/in/deivid-r-santos/" className="text-white">Deivid Roger</a></p>
            </footer>
        </div>
    );
}

export default Login;