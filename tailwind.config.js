/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0070f4',
				bgColor: '#ffffff'
			},
			keyframes: {
				button: {
					'0%, 100%': {
						transform: 'translateY(-10%)',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
					},
					'50% ': {
						transform: 'none',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
					}
				}
			},
			animation: {
				button: 'button 1s infinite'
			},
			backgroundImage: {
				banner: "url('https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/11/21043602/banner-homemajor-2.webp')"
			}
		}
	},
	plugins: []
};
