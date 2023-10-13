import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useServer from "../../hooks/useServer.js";
import { useState } from "react";
import "./style.css";

function SignUp() {
  const navigate = useNavigate();
  const { post } = useServer();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [mainPassword, setMainPassword] = useState("");
  const [showPasswordValidations, setShowPasswordValidations] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const checkPasswordCriteria = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const minLength = password.length >= 8;

    setPasswordValidations({
      hasUppercase: uppercaseRegex.test(password),
      hasLowercase: lowercaseRegex.test(password),
      hasNumber: numberRegex.test(password),
      hasMinLength: minLength,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = Object.fromEntries(new FormData(form));
    const { data } = await post({ url: "/user/register", body: credentials });
    if (data) return navigate("/login");
  };

  const togglePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <main>
      <div className="sign-up-page">
        <div className="sign-up-container">
          <div className="sign-up">
            <h2>Regístrate</h2>
          </div>

          <div className="sign-up-form">
            <form onSubmit={submitHandler}>
              <div>
                <label className="sign-up-info" htmlFor="email">
                  <span>Correo electrónico:</span>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>
              </div>

              <div>
                <label className="sign-up-info" htmlFor="nickname">
                  <span>Nickname:</span>
                  <div>
                    <input
                      id="nickname"
                      name="nickname"
                      type="text"
                      autoComplete="nickname"
                      required
                    />
                  </div>
                </label>
              </div>

              <div>
                <div>
                  <label className="sign-up-info" htmlFor="password">
                    <span>Contraseña:</span>
                  </label>
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type={passwordVisibility ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={(event) => {
                      setMainPassword(event.target.value);
                      checkPasswordCriteria(event.target.value);
                    }}
                    minLength={8}
                    onFocus={() => setShowPasswordValidations(true)}
                  />
                </div>
              </div>
              <div className="password-indicators">
                {showPasswordValidations && (
                  <>
                    <p>
                      {passwordValidations.hasUppercase
                        ? ""
                        : "❌ No contiene ninguna mayúscula"}
                    </p>
                    <p>
                      {passwordValidations.hasLowercase
                        ? ""
                        : "❌ No contiene ninguna minúscula"}
                    </p>
                    <p>
                      {passwordValidations.hasNumber
                        ? ""
                        : "❌ No contiene ningún número"}
                    </p>
                    <p>
                      {passwordValidations.hasMinLength
                        ? ""
                        : "❌ No contiene mínimo 8 caracteres"}
                    </p>
                  </>
                )}
              </div>
              <div>
                <div>
                  <label className="sign-up-info" htmlFor="password">
                    <span>Repetir contraseña:</span>
                  </label>
                </div>
                <div>
                  <input
                    id="repeat-password"
                    name="repeat-password"
                    type={passwordVisibility ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={(event) => setRepeatPassword(event.target.value)}
                    minLength={8}
                  />
                  <input
                    type="checkbox"
                    id="ojoPassword"
                    className="hidden"
                    onChange={togglePassword}
                  />
                  <label htmlFor="ojoPassword">
                    <FontAwesomeIcon
                      icon={passwordVisibility ? faEye : faEyeSlash}
                      className="eye"
                    />
                  </label>
                </div>
              </div>

              {repeatPassword === mainPassword ? (
                ""
              ) : (
                <p className="error-password">Las contraseñas no coinciden</p>
              )}

              <div className="sign-up-div-container">
                <button className="sign-up-div" type="submit">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
