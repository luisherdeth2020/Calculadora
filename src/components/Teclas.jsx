import { useState } from 'react';
import styles from './Teclas.module.css';
import Pantalla from './Pantalla';
import { evaluate } from 'mathjs';

export function Teclas() {
	const [num, setNum] = useState('');

	const tecla = [
		{ color: 'btnGray', data: 'AC' },
		{ color: 'btnGray', data: '+/-' },
		{ color: 'btnGray', data: '%' },
		{ color: 'btnYellow', data: '/' },
		{ color: 'btnBlack', data: '7' },
		{ color: 'btnBlack', data: '8' },
		{ color: 'btnBlack', data: '9' },
		{ color: 'btnYellow', data: '*' },
		{ color: 'btnBlack', data: '4' },
		{ color: 'btnBlack', data: '5' },
		{ color: 'btnBlack', data: '6' },
		{ color: 'btnYellow', data: '-' },
		{ color: 'btnBlack', data: '1' },
		{ color: 'btnBlack', data: '2' },
		{ color: 'btnBlack', data: '3' },
		{ color: 'btnYellow', data: '+' },
		{ color: 'btnBlack', data: '0' },
		{ color: 'btnBlack', data: '.' },
		{ color: 'btnYellow', data: '=' },
	];

	return (
		<>
			<Pantalla input={num} />
			<div className={styles.container}>
				{tecla.map((e, i) => (
					<button
						key={i}
						className={`${e.data == '0' ? styles.hans : styles[e.color]} `}
						onClick={() => (e.data == '=' ? setNum(evaluate(num)) : setNum(num + e.data))}
					>
						{e.data}
					</button>
				))}
			</div>
			<button onClick={() => setNum('')}>Clear</button>
		</>
	);
}
export default Teclas;
