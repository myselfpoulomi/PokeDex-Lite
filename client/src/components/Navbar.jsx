import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { clearSession, getSession } from "../utils/session";

export default function Navbar() {
    const [user, setUser] = useState(() => getSession());

    function handleLogout() {
        clearSession();
        setUser(null);
    }

    return (
        <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#1F1611]/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                <Link
                    to="/"
                    className="text-lg md:text-xl font-bold text-white shrink-0"
                >
                    Pokedex{" "}
                    <span className="text-[#D4A569]">Lite</span>
                </Link>

                <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="min-w-0 text-right max-w-[100px] sm:max-w-[240px]">
                                    <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                        {user.name || "Trainer"}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-white/60 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                {user.picture ? (
                                    <img
                                        src={user.picture}
                                        alt=""
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/20 shrink-0"
                                    />
                                ) : (
                                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0">
                                        <User
                                            className="w-5 h-5 text-[#D4A569]"
                                            aria-hidden
                                        />
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12] transition-colors"
                                aria-label="Log out"
                            >
                                <LogOut className="w-5 h-5 text-[#D4A569]" />
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-2xl bg-[#D4A569] text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
