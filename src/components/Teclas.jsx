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
		const lastChar = input[input.length - 1];
		const operators = /[-+*%/]/;
		const isAC = lastInput === 'AC';
		const negativeOperator = /-\D/;
		// const doubleMinus = /--/;
		const doublePlus = /[++]/;
		// const jojo = /[++]--/;
		const operator = /[-+*%/]/;
		// const lol = /[-+]/
		if (isAC) {
			setInput('');
		} 
		// else if(operator.test(input)){
		// 	// alert('hola')
		// 	// setInput(`${input.charAt(length-1).replace(input,`${input+lastInput}`)}`);
		// 	setInput(`${input.substring(0,input.length-1)}${lastInput}`);
		// 	setErrorMessage({ show: false, message: '' });

		//  }
		

		
		else if (isNumber(lastInput)) {
			// alert('hola');
			setErrorMessage({ show: false, message: '' });
			setInput(`${input}${lastInput}`);
		} else if (lastInput === '=' && input === '') {
			setInput(`${input}`);
			setErrorMessage({ show: true, message: 'Por favor, no sea pto e ingrese datos. tk😘' });
		} else if (input.length < 3 && lastInput === '=') {
			setErrorMessage({ show: true, message: 'No se puede realizar la operación' });
			setInput(`${input}`);
		} else if (lastInput === '=') {
			try {
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
		// ! mirar mañana
		// if (lastInput === '*' || lastInput === '/') {
		// 	if (lastChar === '*' || lastChar === '/') {
		// 		return;
		// 	}
		// }
		// else if (operators.test(input) && isNumber(lastInput) ) {
		else if (operators.test(input)) {
			// alert('hola')
			// setInput(`${input.charAt(length-1).replace(input,`${input+lastInput}`)}`);
			setInput(`${input.substring(0, input.length - 1)}${lastInput}`);
			setErrorMessage({ show: false, message: '' });
		} else if (lastInput === 'DEL') {
			setInput(input.toString().slice(0, -1));
			setErrorMessage({ show: false, message: '' });
		} else if (input === '') {
			setErrorMessage({ show: false, errorMessage: '' });
			setInput(`${input}${lastInput}`);
		} else if (input === operators) {
			setInput(`${input}${lastInput}`);
		} else if (negativeOperator.test(input)) {
			setErrorMessage({
				show: true,
				message: 'No se puede realizar la operación pto😎',
			});
		} 
		
		 if (doublePlus.test(input)) {
				setErrorMessage({
					show: true,
					message: 'No se puede ++++',
				});
				// return;
			} 
			
			
			else if (lastChar === '-' && operator.test(lastInput)) {
				setErrorMessage({
					show: true,
					message: 'No se puede realizar la operación despues de un numero negativo',
				});
				return;
			} else if (lastInput === '.') {
				setInput(`${input}${lastInput}`);
			} else if (operators.test(lastInput)) {
				setInput(`${input}${lastInput}`);
			}
	};



	// useEffect(() => {
	//   first

	//   return () => {
	// 	second
	//   }
	// }, [third])

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
			{errorMessage.show && <div className={styles.error}>{errorMessage.message}</div>}
			<div className={styles.calculator}>
				<Pantalla input={input} />
				<div className={styles.container}>
					{tecla.map((e, i) => (
						<button
							key={i}
							className={`${styles.btn} ${e.data == '0' ? styles.hans : styles[e.color]} `}
							onClick={() => onButtonClick(e)}
						>
							{e.data}
						</button>
					))}
				</div>
			</div>
		</>
	);
}
export default Teclas;

// Bug encontrado
