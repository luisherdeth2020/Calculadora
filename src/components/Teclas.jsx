import { useState, useEffect } from 'react';
import styles from './Teclas.module.css';
import Pantalla from './Pantalla';
import { evaluate, isNumber } from 'mathjs';

export function Teclas() {
	const [input, setInput] = useState('');
	const [errorMessage, setErrorMessage] = useState({ show: false, message: '' });

	const tecla = [
		{ color: 'btnGray', data: 'AC' },
		{ color: 'btnGray', data: 'DEL' },
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

	const onButtonClick = (e) => {
		const lastInput = e.data;
		const operators = /[-+*%/]/;
		const isAC = lastInput === 'AC';

		if (isAC) {
			setInput('');
			setErrorMessage({
				show: false,
				message: '',
			});
		} else if (lastInput === '=' && isNumber(input)) {
			setInput(`${input}`);
		} else if (lastInput === '=') {
			try {
				//Me devuelve el resultado en String
				//Para luego no tener problemas al añadir un caracter
				setInput(evaluate(input));
				setErrorMessage({
					show: false,
					message: '',
				});
			} catch (error) {
				setErrorMessage({
					show: true,
					message: `Que haces bobo \nanda pa' allá😒`,
				});
			}
		}

		// Elimina el ÚLTIMO valor del INPUT y muestra lo anterior (12+) --> (12)
		else if (lastInput === 'DEL') {
			setInput(input.toString().slice(0, -1));
		}

		//  Evalua si el INPUT contiene el operador (-,+,*,/)
		//  Me devuelves TODO el valor del input MENOS el último y AÑADE la TECLA(valor) PULSADA
		else if (operators.test(input.toString().slice(-1)) && operators.test(lastInput)) {
			setInput(`${input.toString().slice(0, -1)}${lastInput}`);
		}
		// Muestra la TECLA(valor) introducido en PANTALLA(calculadora)
		else {
			setInput(`${input}${lastInput}`);
		}
	};

	useEffect(() => {
		document.addEventListener('keyup', handleKeyUp);
		return () => document.removeEventListener('keyup', handleKeyUp);
	}, [input]);

	const handleKeyUp = (event) => {
		if (event.key >= 0 && event.key <= 9) {
			setInput(input + event.key);
		} else {
			switch (event.key) {
				case '+':
					onButtonClick({ data: '+' });
					break;
				case '-':
					onButtonClick({ data: '-' });
					break;
				case '*':
					onButtonClick({ data: '*' });
					break;
				case '/':
					onButtonClick({ data: '/' });
					break;
				case '.':
					onButtonClick({ data: '.' });
					break;
				case 'Enter':
					onButtonClick({ data: '=' });
					break;
				case 'Backspace':
					onButtonClick({ data: 'DEL' });
					break;
				case 'Escape':
					onButtonClick({ data: 'AC' });
					break;
				default:
					break;
			}
		}
	};

	return (
		<>
			<div className={styles.calculator}>
				{errorMessage.show && <div className={styles.error}>{errorMessage.message}</div>}
				<Pantalla input={input} />
				<div className={styles.container}>
					{tecla.map((e, i) => (
						<span
							key={i}
							className={`${e.data == '0' ? styles.hans : styles.btn} `}
							onClick={() => onButtonClick(e)}
						>
							{e.data}
						</span>
					))}
				</div>
			</div>
		</>
	);
}
export default Teclas;
