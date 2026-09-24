"use client";

import { motion } from "framer-motion";

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/5491163828772"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
        >
            <div className="bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] text-white">
                {/* Logo oficial de WhatsApp */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-8 h-8"
                    fill="currentColor"
                >
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.488 2.027 7.797L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.848l-.486-.29-5.003 1.19 1.226-4.858-.317-.499A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.948c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.63-.199-.895.199-.265.398-1.028 1.294-1.26 1.56-.232.265-.464.298-.862.1-.398-.199-1.681-.619-3.202-1.976-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.464.597-.696.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.895-2.157-1.227-2.953-.323-.776-.65-.671-.895-.683l-.762-.013c-.265 0-.696.1-.1061.497-.365.398-1.393 1.36-1.393 3.317 0 1.957 1.426 3.847 1.625 4.112.199.265 2.806 4.282 6.797 6.003.95.41 1.692.655 2.27.838.954.303 1.822.26 2.509.158.765-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.099-.165-.365-.265-.763-.464z" />
                </svg>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded absolute -top-8 whitespace-nowrap">
                Cotizar Ubicación
            </span>
        </motion.a>
    );
}
