import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {LibroServices} from '../../Services/Libro.services';
import {TrabajadorServices} from '../../Services/Trabajador.services';
import {TransaccionServices} from '../../Services/Transaccion.services'
import {UsuarioServices} from '../../Services/Usuario.Services'
import type { ApiResponse } from '../../Interfaces/Auth/Auth.Interfaces';

// ── Helpers ───────────────────────────────────────────────────────────────────
function useForm<T extends Record<string, string>>(init: T) {
    const [form, setForm] = useState(init);
    const set = (k: keyof T, v: string) => setForm((f) => ({ ...f, [k]: v }));
    return { form, set };
}

function Field({ label, value, onChange, type = 'text' }: {
    label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
    return (
        <div className="field">
            <label>{label}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}

function Result({ data, error }: { data: unknown; error: string }) {
    if (!data && !error) return null;
    if (error) return <div className="result error">{error}</div>;
    return <div className="result">{JSON.stringify(data, null, 2)}</div>;
}

// ── S1: Registrar libro ───────────────────────────────────────────────────────
function S1_RegistrarLibro() {
    const { form, set } = useForm({
        Nombre: '', Genero: '', Autor: '', fecha_recepcion: '',
        cantidad_copias: '', edad_sugerida: '', editorial: '', precio: '',
    });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await LibroServices.create({
            ...form,
            cantidad_copias: Number(form.cantidad_copias),
            edad_sugerida: Number(form.edad_sugerida),
            precio: Number(form.precio),
            estado: 1,
        });
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="Nombre"          value={form.Nombre}          onChange={(v) => set('Nombre', v)} />
                <Field label="Género"          value={form.Genero}          onChange={(v) => set('Genero', v)} />
                <Field label="Autor"           value={form.Autor}           onChange={(v) => set('Autor', v)} />
                <Field label="Fecha recepción" value={form.fecha_recepcion} onChange={(v) => set('fecha_recepcion', v)} type="date" />
                <Field label="Cantidad copias" value={form.cantidad_copias} onChange={(v) => set('cantidad_copias', v)} type="number" />
                <Field label="Edad sugerida"   value={form.edad_sugerida}   onChange={(v) => set('edad_sugerida', v)} type="number" />
                <Field label="Editorial"       value={form.editorial}       onChange={(v) => set('editorial', v)} />
                <Field label="Precio"          value={form.precio}          onChange={(v) => set('precio', v)} type="number" />
            </div>
            <div className="form-actions">
                <button className="btn-sm" onClick={submit}>Registrar libro</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S2: Registrar usuario ─────────────────────────────────────────────────────
function S2_RegistrarUsuario() {
    const { form, set } = useForm({ nombre: '', rut: '', direccion: '' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await UsuarioServices.create({ ...form, estado: 1 });
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="Nombre"    value={form.nombre}    onChange={(v) => set('nombre', v)} />
                <Field label="RUT"       value={form.rut}       onChange={(v) => set('rut', v)} />
                <Field label="Dirección" value={form.direccion} onChange={(v) => set('direccion', v)} />
            </div>
            <div className="form-actions">
                <button className="btn-sm" onClick={submit}>Registrar usuario</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S3: Deshabilitar copia ────────────────────────────────────────────────────
function S3_DeshabilitarCopia() {
    const { form, set } = useForm({ id: '' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await LibroServices.deshabilitar(Number(form.id));
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="ID Copia libro" value={form.id} onChange={(v) => set('id', v)} type="number" />
            </div>
            <div className="form-actions">
                <button className="btn-sm btn-danger" onClick={submit}>Deshabilitar copia</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S4: Actualizar precio ─────────────────────────────────────────────────────
function S4_ActualizarPrecio() {
    const { form, set } = useForm({ id: '', precio: '' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await LibroServices.actualizarPrecio({ id: Number(form.id), precio: Number(form.precio) });
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="ID Libro"                      value={form.id}     onChange={(v) => set('id', v)} type="number" />
                <Field label="Nuevo precio (mayor al actual)" value={form.precio} onChange={(v) => set('precio', v)} type="number" />
            </div>
            <div className="form-actions">
                <button className="btn-sm" onClick={submit}>Actualizar precio</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S5: Desactivar usuario ────────────────────────────────────────────────────
function S5_DesactivarUsuario() {
    const { form, set } = useForm({ id: '' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await UsuarioServices.deshabilitar(Number(form.id));
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="ID Usuario" value={form.id} onChange={(v) => set('id', v)} type="number" />
            </div>
            <div className="form-actions">
                <button className="btn-sm btn-danger" onClick={submit}>Desactivar usuario</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S6: Registrar préstamo/venta ──────────────────────────────────────────────
function S6_RegistrarTransaccion() {
    const { form, set } = useForm({ Trabajadorlid: '', Usuarioid: '', Copia_libroid: '', tipo: '1' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const esVenta = form.tipo === '1';
        const res = await TransaccionServices.create({
            Trabajadorlid: Number(form.Trabajadorlid),
            Usuarioid: Number(form.Usuarioid),
            Copia_libroid: form.Copia_libroid.split(',').map(Number),
            es_venta: esVenta,
            es_prestamo: !esVenta,
        });
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="ID Trabajador"                   value={form.Trabajadorlid} onChange={(v) => set('Trabajadorlid', v)} type="number" />
                <Field label="ID Usuario"                      value={form.Usuarioid}     onChange={(v) => set('Usuarioid', v)} type="number" />
                <Field label="IDs Copias (separados por coma)" value={form.Copia_libroid} onChange={(v) => set('Copia_libroid', v)} />
                <div className="field">
                    <label>Tipo</label>
                    <select value={form.tipo} onChange={(e) => set('tipo', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text)', fontSize: 13 }}>
                        <option value="1">Venta</option>
                        <option value="0">Préstamo</option>
                    </select>
                </div>
            </div>
            <div className="form-actions">
                <button className="btn-sm" onClick={submit}>Registrar transacción</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── S13: Incrementar stock ────────────────────────────────────────────────────
function S13_AumentarCopia() {
    const { form, set } = useForm({ id: '' });
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const submit = async () => {
        setError(''); setData(null);
        const res = await LibroServices.aumentarCopia(Number(form.id));
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-grid">
                <Field label="ID Libro" value={form.id} onChange={(v) => set('id', v)} type="number" />
            </div>
            <div className="form-actions">
                <button className="btn-sm" onClick={submit}>Incrementar stock</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── SimpleQuery ───────────────────────────────────────────────────────────────
function SimpleQuery({ label, fetchFn }: { label: string; fetchFn: () => Promise<ApiResponse> }) {
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState('');

    const run = async () => {
        setError(''); setData(null);
        const res = await fetchFn();
        if (res.status < 400) setData(res); else setError(res.message);
    };

    return (
        <div className="card">
            <div className="form-actions">
                <button className="btn-sm" onClick={run}>{label}</button>
            </div>
            <Result data={data} error={error} />
        </div>
    );
}

// ── Sidebar nav ───────────────────────────────────────────────────────────────
const NAV = [
    { id: 's1',  label: '1. Registrar libro' },
    { id: 's2',  label: '2. Registrar usuario' },
    { id: 's3',  label: '3. Deshabilitar copia' },
    { id: 's4',  label: '4. Actualizar precio' },
    { id: 's5',  label: '5. Desactivar usuario' },
    { id: 's6',  label: '6. Nuevo préstamo/venta' },
    { id: 's7',  label: '7. Listar usuarios y biblio.' },
    { id: 's8',  label: '8. Con préstamo/venta' },
    { id: 's9',  label: '9. Todos los clientes' },
    { id: 's10', label: '10. Libros disponibles' },
    { id: 's11', label: '11. Recientes (semana)' },
    { id: 's12', label: '12. Incrementar stock' },
    { id: 's13', label: '13. Vendidos año actual' },
    { id: 's14', label: '14. Top 10 Ficción S1' },
    { id: 's15', label: '15. Menos prestados S2' },
    { id: 's16', label: '16. Bibliotecarias' },
];

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const sections: { id: string; num: string; title: string; node: React.ReactNode }[] = [
        { id: 's1',  num: '01', title: 'Registrar nuevo libro',                          node: <S1_RegistrarLibro /> },
        { id: 's2',  num: '02', title: 'Registrar nuevo usuario',                        node: <S2_RegistrarUsuario /> },
        { id: 's3',  num: '03', title: 'Deshabilitar copia de libro',                    node: <S3_DeshabilitarCopia /> },
        { id: 's4',  num: '04', title: 'Actualizar precio de libro',                     node: <S4_ActualizarPrecio /> },
        { id: 's5',  num: '05', title: 'Desactivar usuario',                             node: <S5_DesactivarUsuario /> },
        { id: 's6',  num: '06', title: 'Registrar préstamo / venta',                     node: <S6_RegistrarTransaccion /> },
        { id: 's7',  num: '07', title: 'Listar usuarios y bibliotecarias',               node: <SimpleQuery label="Obtener lista"     fetchFn={UsuarioServices.obtener} /> },
        { id: 's8',  num: '08', title: 'Usuarios con al menos un préstamo/venta',        node: <SimpleQuery label="Obtener lista"     fetchFn={UsuarioServices.conPrestamos} /> },
        { id: 's9',  num: '09', title: 'Todos los clientes',                             node: <SimpleQuery label="Obtener clientes"  fetchFn={UsuarioServices.obtener} /> },
        { id: 's10', num: '10', title: 'Libros disponibles',                             node: <SimpleQuery label="Obtener libros"    fetchFn={LibroServices.obtener} /> },
        { id: 's11', num: '11', title: 'Libros con préstamo/venta esta semana',          node: <SimpleQuery label="Obtener recientes" fetchFn={LibroServices.recientes} /> },
        { id: 's12', num: '12', title: 'Incrementar stock de libro',                     node: <S13_AumentarCopia /> },
        { id: 's13', num: '13', title: 'Libros vendidos en el año actual',               node: <SimpleQuery label="Consultar"         fetchFn={TransaccionServices.ventasAnio} /> },
        { id: 's14', num: '14', title: 'Top 10 Ficción — 1er semestre 2026',             node: <SimpleQuery label="Consultar ranking" fetchFn={TransaccionServices.topFiccion} /> },
        { id: 's15', num: '15', title: '10 menos prestados Comedia — 2do semestre 2025', node: <SimpleQuery label="Consultar ranking" fetchFn={TransaccionServices.comedia} /> },
        { id: 's16', num: '16', title: 'Bibliotecarias',                                 node: <SimpleQuery label="Obtener lista"     fetchFn={TrabajadorServices.bibliotecarias} /> },
    ];

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-logo">biblioteca/</div>
                <div className="sidebar-section">Consultas</div>
                {NAV.map((n) => (
                    <a key={n.id} href="#" onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}>
                        {n.label}
                    </a>
                ))}
                <div className="sidebar-footer">
                    <button className="btn-sm btn-danger" style={{ width: '100%' }} onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="main">
                <div className="page-title">Panel de gestión</div>
                <div className="page-sub">Biblioteca</div>

                {sections.map((s, i) => (
                    <div key={s.id}>
                        <div className="section" id={s.id}>
                            <div className="section-header">
                                <span className="section-num">{s.num}</span>
                                <span className="section-title">{s.title}</span>
                            </div>
                            {s.node}
                        </div>
                        {i < sections.length - 1 && <hr className="divider" />}
                    </div>
                ))}
            </main>
        </div>
    );
}