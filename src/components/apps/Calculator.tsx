import React, { useState } from 'react';

const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
];

const evaluateExpression = (expression: string) => {
    if (!expression.trim()) return '0';
    const safe = expression.replace(/[^0-9+\-*/().]/g, '');
    try {
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${safe})`)();
        if (typeof result !== 'number' || Number.isNaN(result)) return 'Error';
        return result.toString();
    } catch {
        return 'Error';
    }
};

export const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [hasResult, setHasResult] = useState(false);

    const appendValue = (value: string) => {
        if (display === '0' || hasResult) {
            setDisplay(value === '.' ? '0.' : value);
            setHasResult(false);
            return;
        }
        setDisplay((prev) => prev + value);
    };

    const handleOperator = (op: string) => {
        if (display === '0' && op !== '-') return;
        if (/[*+\-/]$/.test(display)) {
            setDisplay((prev) => prev.replace(/[*+\-/]$/, op));
            return;
        }
        setDisplay((prev) => prev + op);
    };

    const handleButton = (value: string) => {
        if (value === '=') {
            const result = evaluateExpression(display);
            setDisplay(result);
            setHasResult(true);
            return;
        }

        if (value === '.') {
            const parts = display.split(/[*+\-/]/);
            const last = parts[parts.length - 1];
            if (last.includes('.')) return;
            appendValue(value);
            return;
        }

        if (/\d/.test(value)) {
            appendValue(value);
            return;
        }

        handleOperator(value);
    };

    const handleClear = () => {
        setDisplay('0');
        setHasResult(false);
    };

    const handleBackspace = () => {
        if (hasResult) {
            setDisplay('0');
            setHasResult(false);
            return;
        }
        setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
    };

    return (
        <div className="p-6 grid gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-right text-2xl font-mono tracking-wide">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-2">
                <button
                    onClick={handleClear}
                    className="col-span-2 rounded-lg bg-white/10 border border-white/10 py-2 text-sm hover:bg-white/20 transition-colors"
                >
                    C
                </button>
                <button
                    onClick={handleBackspace}
                    className="col-span-2 rounded-lg bg-white/10 border border-white/10 py-2 text-sm hover:bg-white/20 transition-colors"
                >
                    ⌫
                </button>
                {buttons.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleButton(value)}
                        className={`rounded-lg py-3 text-sm border border-white/10 transition-colors ${
                            value === '='
                                ? 'bg-cyan-500/70 text-white hover:bg-cyan-500/90'
                                : /[/*+\-]/.test(value)
                                  ? 'bg-white/10 hover:bg-white/20'
                                  : 'bg-white/5 hover:bg-white/15'
                        }`}
                    >
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
};
