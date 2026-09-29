// Trampa anti-spam: campo que un humano no ve ni alcanza con Tab, pero los
// bots que llenan todos los inputs del form sí completan. Si viene con algo,
// el server action descarta el envío (ver isHoneypotFilled en app/actions.ts).
// Se esconde fuera de pantalla y no con display:none porque algunos bots
// saltean los campos ocultos con display:none.
export const HONEYPOT_FIELD = "website";

export function HoneypotField() {
    return (
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor={HONEYPOT_FIELD}>No completar este campo</label>
            <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
    );
}
