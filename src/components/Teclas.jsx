import { useState } from 'react';
import styles from './Teclas.module.css';
import Pantalla from './Pantalla';
import { evaluate, isNumber } from 'mathjs';

export function Teclas() {
	const [input, setInput] = useState('');
	const [errorMessage, setErrorMessage] = useState({ show: false, message: '' });

	const tecla = [
		{ color: 'btnGray', data: 'AC' },
		{ color: 'btnGray', data: 'DELETE' },
		{ color: 'btnGray', data: '%' },
		{ color: 'btnYellow', data: '/' },
		{ color: 'btnBlack', data: 7 },
		{ color: 'btnBlack', data: 8 },
		{ color: 'btnBlack', data: 9 },
		{ color: 'btnYellow', data: '*' },
		{ color: 'btnBlack', data: 4 },
		{ color: 'btnBlack', data: 5 },
		{ color: 'btnBlack', data: 6 },
		{ color: 'btnYellow', data: '-' },
		{ color: 'btnBlack', data: 1 },
		{ color: 'btnBlack', data: 2 },
		{ color: 'btnBlack', data: 3 },
		{ color: 'btnYellow', data: '+' },
		{ color: 'btnBlack', data: 0 },
		{ color: 'btnBlack', data: '.' },
		{ color: 'btnYellow', data: '=' },
	];

	// console.log(input.toString().substring(0,3).includes('*'))
	console.log(typeof input);
	console.log(input);
	console.log(errorMessage);
	const onButtonClick = (e) => {
		const lastInput = e.data;
		const operators = /[-+*%/]/;
		const isAC = lastInput === 'AC';

		if (isAC) {
			setInput('');
		} else if (lastInput === '=') {
			try {
				setInput(evaluate(input));
			} catch (error) {
				setErrorMessage({ show: true, message: 'Lo sentimos😖 el que me programo no le supo🤬' });
				setInput(`${input}`);
			}
		} else if (lastInput === 'DELETE' || isNumber(lastInput) === 'DELETE') {
			setInput(input.substring(0, input.length - 1));
			setErrorMessage({ show: false, message: '' });
		} else if (input === '') {
			setErrorMessage({ show: false, errorMessage: '' });
			setInput(`${input}${lastInput}`);
		} else if (isNumber(input)) {
			// alert('pepe');
			setErrorMessage({ show: true, message: 'Faltan datos🤬' });

			setInput(`${lastInput}`);
		} else if (input === operators) {
			setInput(`${input}${lastInput}`);
		} else if (isNumber(lastInput)) {
			// alert('hola');
			setInput(`${input}${lastInput}`);
		} else if (operators.test(lastInput)) {
			// alert('ojo');
			setInput(`${input}${lastInput}`);
		}
	};

	return (
		<>
			{errorMessage.show && <div className={styles.error}>{errorMessage.message}</div>}
			<Pantalla input={input} />
			<div className={styles.container}>
				{tecla.map((e, i) => (
					<button
						key={i}
						className={`${e.data == '0' ? styles.hans : styles[e.color]} `}
						onClick={() => onButtonClick(e)}
					>
						{e.data}
					</button>
				))}
			</div>
		</>
	);
}
export default Teclas;

// Bug encontrado
