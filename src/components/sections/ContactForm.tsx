"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

export function ContactForm() {
    const [status, setStatus] = useState<null | string>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Convertimos FormData a un objeto simple para Formspree
        const data = Object.fromEntries(formData.entries());

        try {
            const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "tu_id_aca";
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("¡Gracias! Recibimos tu consulta y te contactaremos pronto.");
                form.reset();
            } else {
                const result = await response.json();
                setError(result.error || "Hubo un problema al enviar el formulario.");
            }
        } catch (err) {
            setError("Ocurrió un error de conexión. Intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {status ? (
                <div className="p-8 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <h3 className="text-xl font-bold text-green-400 mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-green-200 text-sm mb-4">{status}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStatus(null)}
                    >
                        Nueva consulta
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-medium text-neutral-400 uppercase">Nombre</label>
                            <Input id="name" name="name" className="bg-black/40 border-white/5" placeholder="Tu nombre" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="company" className="text-xs font-medium text-neutral-400 uppercase">Empresa</label>
                            <Input id="company" name="company" className="bg-black/40 border-white/5" placeholder="Empresa" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-medium text-neutral-400 uppercase">Email</label>
                            <Input id="email" name="email" type="email" className="bg-black/40 border-white/5" placeholder="tu@email.com" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-medium text-neutral-400 uppercase">Mensaje</label>
                        <Textarea id="message" name="message" className="bg-black/40 border-white/5 min-h-[140px]" placeholder="Detalles de la campaña..." />
                    </div>

                    <Button type="submit" className="w-full md:w-auto md:px-10" variant="accent" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar Solicitud"}
                    </Button>
                </form>
            )}
        </div>
    );
}
