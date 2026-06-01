import { useState } from "react";
import{ useNavigate } from "react-router-dom";
import {LoginSerivces} from "../../Services/Auth.services";


export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        contrasenia: "",
        rut: "",
        sueldo: "",
        bono: "",
        Rolid: "1",
    });
    const [result, setResult] = useState("");
    const [isError, setIsError] = useState(false);

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const handleRegister = async () => {
        setResult("");
        try {
            const response = await LoginSerivces.register({
                ...form,
                sueldo: Number(form.sueldo),
                bono: Number(form.bono),
            });
            if (response.status != 201 && response.data) {
                setIsError(false);
                setResult("Trabajador registrado exitosamente.");
            } else {
                setIsError(true);
                setResult(response.message);
            }
        } catch {
        setIsError(true);
        setResult("Error al conectar con el servidor");
        }
    };

    return (
        <div className="auth-wrap">
        <div className="auth-box" style={{ width: 420 }}>
            <h1>registro/</h1>
            <p>Crear cuenta de trabajador</p>

            {(["nombre", "correo", "contrasenia", "rut", "sueldo","bono"] as const).map((k) => (
            <div key={k}>
                <label>{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                <input
                type={k === "contrasenia" ? "password" : k === "sueldo" || k === "bono" ? "number" : "text"}
                value={form[k]}
                onChange={(e) => set(k, e.target.value)}
                />
            </div>
            ))}

            <label>Rol</label>
            <select value={form.Rolid} onChange={(e) => set("Rolid", e.target.value)}
            style={{ width: "100%", padding: "8px 10px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: 14 }}>
            {/* TODO: cargar roles dinámicamente desde tu backend */}
            <option value="1">Bibliotecaria</option>
            <option value="2">Administrador</option>
            <option value="3">Auxiliar</option>
            </select>

            {result && <div className={`result ${isError ? "error" : ""}`}>{result}</div>}

            <button className="btn-primary" onClick={handleRegister}>
            Registrar →
            </button>

            <div className="auth-link">
            ¿Ya tienes cuenta? <span onClick={() => navigate("/")}>Inicia sesión</span>
            </div>
        </div>
        </div>
    );
}