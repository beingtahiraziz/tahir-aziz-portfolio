import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#070706', panel: '#11100D', paper: '#F5F0E6', blue: '#D6A73A', violet: '#F6C85F', cyan: '#FFE6A3' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Arial', 'sans-serif'] } } }, plugins: [] } satisfies Config;
