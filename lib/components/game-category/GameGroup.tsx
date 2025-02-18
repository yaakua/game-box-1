'use client'
import { motion } from 'framer-motion';
import {Link} from '@/lib/i18n/navigation'

type Game = {
    url: string;
    cover: string;
    title: string;
};

type GameGroupProps = {
    games: Game[];
};

export default function GameGroup({ games }: GameGroupProps) {
    if (games.length === 0) return null;
    
    const [mainGame, ...smallGames] = games;
    
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full ">
            {/* 大图游戏卡片 */}
            <Link 
                href={mainGame.url}
                className="w-full md:w-[400px] relative overflow-hidden rounded-lg hover:ring-1 hover:ring-primary transition-all duration-300 bg-primary/50"
            >
                <div className="aspect-[16/9] relative">
                    <motion.img
                        src={mainGame.cover}
                        alt={mainGame.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* 标题悬停效果 */}
                    <motion.div
                        className="absolute inset-0 bg-game-card-hover-overlay flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="text-xl font-bold text-game-card-hover-text px-4 text-center">{mainGame.title}</h3>
                    </motion.div>
                </div>
            </Link>
            
            {/* 小图游戏卡片网格 */}
            <div className="w-full md:w-[400px] grid grid-cols-2 gap-4">
                {smallGames.slice(0, 4).map((game) => (
                    <div key={game.url} className="relative">
                        <Link
                            href={game.url}
                            className="block relative overflow-hidden rounded-lg hover:ring-1 hover:ring-primary transition-all duration-300 bg-primary/50"
                        >
                            <div className="aspect-[16/9] relative">
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
                                {/* 标题悬停效果 */}
                                <motion.div
                                    className="absolute inset-0 bg-game-card-hover-overlay flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h3 className="text-sm font-bold text-game-card-hover-text px-2 text-center">{game.title}</h3>
                                </motion.div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
