"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { success: false, message: "" };

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

    return (
        <div>
            {state.success ? (
                <div className="p-8 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <h3 className="text-xl font-bold text-green-400 mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-green-200 text-sm mb-4">{state.message}</p>
                </div>
            ) : (
                <form action={formAction} className="space-y-4">
                    {state.message && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            {state.message}
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

                    <Button type="submit" className="w-full md:w-auto md:px-10" variant="accent" disabled={isPending}>
                        {isPending ? "Enviando..." : "Enviar Solicitud"}
                    </Button>
                </form>
            )}
        </div>
    );
}
