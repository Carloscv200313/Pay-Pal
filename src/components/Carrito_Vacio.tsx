import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Carrito_Vacio() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="inline-block mb-8"
                >
                    <ShoppingCart size={64} className="text-gray-400" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
                <Link href="/" passHref>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Explorar productos
                        <ArrowRight className="ml-2" size={20} />
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
}

