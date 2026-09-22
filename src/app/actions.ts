"use server";

export interface ContactFormState {
    success: boolean;
    message: string;
}

export async function submitContactForm(
    _prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const company = (formData.get("company") as string) || "";
    const message = (formData.get("message") as string) || "";

    if (!name || !email) {
        return { success: false, message: "Nombre y email son obligatorios." };
    }

    const apiUrl = process.env.SISTEMA_ZONA_API_URL;
    const apiKey = process.env.CONTACT_API_KEY;
    if (!apiUrl || !apiKey) {
        console.error("Falta SISTEMA_ZONA_API_URL o CONTACT_API_KEY en el entorno");
        return { success: false, message: "Hubo un error al enviar el mensaje. Reintente luego." };
    }

    try {
        const res = await fetch(`${apiUrl}/api/v1/public/contact/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Contact-Api-Key": apiKey,
            },
            body: JSON.stringify({ name, email, company, message }),
        });

        if (res.status === 201) {
            return { success: true, message: "¡Gracias! Recibimos tu consulta y te contactaremos pronto." };
        }
        if (res.status === 429) {
            return { success: false, message: "Estamos recibiendo muchas consultas ahora mismo. Probá de nuevo en unos minutos." };
        }
        if (res.status === 400) {
            const detail = await res.json().catch(() => null);
            return { success: false, message: detail?.email?.[0] || "Revisá los datos ingresados." };
        }
        console.error("Contact backend error:", res.status, await res.text().catch(() => ""));
        return { success: false, message: "Hubo un error al enviar el mensaje. Reintente luego." };
    } catch (e) {
        console.error("Submit Error:", e);
        return { success: false, message: "Ocurrió un error inesperado." };
    }
}
