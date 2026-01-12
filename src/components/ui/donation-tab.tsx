"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bitcoin, Coins, Wallet, Check, Copy } from "lucide-react";
import type { ReactNode } from "react";

interface DonationAddress {
    currency: string;
    address: string;
    icon: ReactNode;
    color: string;
}

interface CopyableAddressProps {
    address: string;
    className?: string;
}

const CopyableAddress = ({ address, className }: CopyableAddressProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const truncateAddress = (addr: string) => {
        if (addr.length > 20) {
            return `${addr.slice(0, 10)}...${addr.slice(-10)}`;
        }
        return addr;
    };

    const copyAddress = (addr: string) => {
        navigator.clipboard.writeText(addr);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div
            className={cn(
                "flex items-center justify-between gap-2 font-mono cursor-pointer p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 hover:bg-pink-500/10 hover:border-pink-500/40 transition-all duration-200",
                isCopied && "bg-green-500/10 border-green-500/30",
                className
            )}
            onClick={() => copyAddress(address)}
        >
            <div className="text-sm break-all text-gray-300">{truncateAddress(address)}</div>
            <div className="transition-transform duration-200 ease-in-out flex-shrink-0">
                {isCopied ? (
                    <Check className="h-5 w-5 text-green-500" />
                ) : (
                    <Copy className="h-5 w-5 text-pink-400" />
                )}
            </div>
        </div>
    );
};

interface DonationTabProps {
    addresses?: DonationAddress[];
    className?: string;
}

const defaultAddresses: DonationAddress[] = [
    {
        currency: "Bitcoin",
        address: "bc1q8qyr23xwsyq43p5j7e8a8j6590usagz9gclp5z",
        icon: <Bitcoin className="w-8 h-8" />,
        color: "from-orange-500 to-orange-600",
    },
    {
        currency: "Litecoin",
        address: "LVykzaba26A3MWHLsi5pVwXPBMEzqv289s",
        icon: <Coins className="w-8 h-8" />,
        color: "from-blue-400 to-blue-600",
    },
    {
        currency: "Ethereum",
        address: "0x5E6d2c6Ed0b2a3a87E763D4c2fD1873f2DfbD232",
        icon: <Wallet className="w-8 h-8" />,
        color: "from-purple-500 to-purple-600",
    },
];

export function DonationTab({ addresses = defaultAddresses, className }: DonationTabProps) {
    const [activeTab, setActiveTab] = useState<string>(addresses[0]?.currency);

    if (!addresses?.length) return null;

    const activeAddress = addresses.find((addr) => addr.currency === activeTab);

    return (
        <div className={cn("w-full max-w-2xl mx-auto flex flex-col gap-8", className)}>
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
                    Support Sushi Launcher
                </h2>
                <p className="text-gray-400 text-lg">
                    Help us continue building amazing tools for the community
                </p>
            </div>

            {/* Tab buttons */}
            <div className="flex gap-3 flex-wrap justify-center bg-[#12121a]/80 backdrop-blur-sm p-2 rounded-2xl border border-pink-500/20">
                {addresses.map((addr) => (
                    <button
                        key={addr.currency}
                        onClick={() => setActiveTab(addr.currency)}
                        className={cn(
                            "relative px-5 py-3 text-sm font-bold uppercase tracking-wide rounded-xl outline-none transition-all duration-300 flex items-center gap-3",
                            activeTab === addr.currency
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                        )}
                    >
                        {activeTab === addr.currency && (
                            <motion.div
                                layoutId="active-donation-tab"
                                className="absolute inset-0 bg-pink-500/20 border border-pink-500/40 shadow-[0_0_20px_rgba(255,77,157,0.2)] rounded-xl"
                                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {addr.icon}
                            {addr.currency}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content area */}
            <div className="p-8 bg-[#12121a]/80 backdrop-blur-sm rounded-2xl border border-pink-500/20 min-h-[280px]">
                {activeAddress && (
                    <motion.div
                        key={activeAddress.currency}
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 10,
                            filter: "blur(4px)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: -10,
                            filter: "blur(4px)",
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className={cn(
                                    "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                                    activeAddress.color
                                )}
                            >
                                {activeAddress.icon}
                            </div>
                            <div>
                                <h3 className="text-3xl font-display font-bold text-white">{activeAddress.currency}</h3>
                                <p className="text-gray-400">
                                    Send {activeAddress.currency} to this address
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-pink-400 uppercase tracking-widest">
                                Wallet Address
                            </label>
                            <CopyableAddress address={activeAddress.address} />
                            <p className="text-xs text-gray-500">Click to copy the full address</p>
                        </div>

                        <div className="p-4 bg-pink-500/5 rounded-xl border border-pink-500/10">
                            <p className="text-sm text-gray-400">
                                <strong className="text-pink-400">Note:</strong> Please double-check the address before sending. Transactions
                                are irreversible. Only send {activeAddress.currency} to this address.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="text-center">
                <p className="text-gray-400">
                    Thank you for your support! 🍣
                </p>
            </div>
        </div>
    );
}
