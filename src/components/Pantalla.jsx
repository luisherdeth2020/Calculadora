import styles from './Pantalla.module.css';

export function Pantalla({ input }) {
	return <div className={styles.screen}>{input}</div>;
}
export default Pantalla;
