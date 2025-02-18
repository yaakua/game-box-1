'use client'
import { motion } from 'framer-motion';
import {Link} from '@/lib/i18n/navigation'

type GameCardProps = {
    game: {
        url: string;
        cover: string;
        title: string;
    };
    isHorizontal?: boolean;
};

export default function GameCard({ game, isHorizontal = false }: GameCardProps) {
    return (
        <Link
            href={game.url}
            className="group block"
        >
            <motion.div 
                className="relative p-1 rounded-lg"
                whileHover={{ scale: 1.02 }}
            >
                <div className={`relative rounded-lg overflow-hidden  group-hover:ring-2 group-hover:ring-primary transition-all duration-300 ${isHorizontal ? 'aspect-[238/139]' : 'aspect-[248/372]'}`}>
                    <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={game.cover}
                            alt={game.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                    {/* 标题效果 */}
                    <div 
                        className="absolute inset-x-0 bottom-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-white/30 backdrop-blur-[2px]"
                    >
                        <div className="px-3 py-2 md:px-4 md:py-3">
                            <h4 className="text-sm md:text-base font-semibold text-game-card-hover-text transition-colors line-clamp-1">
                                {game.title}
                            </h4>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
