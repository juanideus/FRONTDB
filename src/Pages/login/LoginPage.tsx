import { useState } from "react";
import {LoginSerivces} from "../../Services/Auth.services";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("");
    try {
      const response = await LoginSerivces.login({ correo, contrasenia });
      if (response.status == 200   && response.data) {
        navigate("/Dashboard")
      } else {
        setError(response.message);
      }
    } catch {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <h1>biblioteca/</h1>
        <p>Ingresa con tu cuenta de trabajador</p>

        <label>Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@biblioteca.cl"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          placeholder="••••••••"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && <div className="result error" style={{ marginTop: 12 }}>{error}</div>}

        <button className="btn-primary" onClick={handleLogin}>
          Iniciar sesión →
        </button>

        <div className="auth-link">
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/Register")}>Regístrate</span>
        </div>
      </div>
    </div>
  );
}