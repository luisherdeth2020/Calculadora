import styles from './Pantalla.module.css';

export function Pantalla({ input }) {
	
	// <button onClick={onButtonClick} />;
	return <div className={styles.screen}>{input}</div>;
}
export default Pantalla;
