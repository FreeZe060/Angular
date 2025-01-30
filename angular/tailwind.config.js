/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
	theme: {
		extend: {
			animation: {
				'holo-glow': 'holo-glow 3s ease-in-out infinite',
				'sparkle': 'sparkle 4s ease-in-out infinite',
				'energy-spin': 'energy-spin 10s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'shine': 'shine 4s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'rainbow': 'rainbow 6s linear infinite',
				'tilt-shine': 'tilt-shine 1.5s ease-in-out infinite',
			},
			keyframes: {
				'holo-glow': {
					'0%, 100%': {
						opacity: '0.5',
						transform: 'translateZ(0) rotateZ(0)'
					},
					'50%': {
						opacity: '1',
						transform: 'translateZ(100px) rotateZ(5deg)'
					}
				},
				'sparkle': {
					'0%, 100%': { opacity: '0' },
					'50%': { opacity: '1' }
				},
				'energy-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shine': {
					'0%': { backgroundPosition: '200% center' },
					'100%': { backgroundPosition: '-200% center' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' }
				},
				'rainbow': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				},
				'tilt-shine': {
					'0%, 100%': { transform: 'rotate(-12deg) translateX(-10px)' },
					'50%': { transform: 'rotate(12deg) translateX(10px)' }
				}
			}
		}
	},
	plugins: [],
}

