import './App.css';
import Teclas from './components/Teclas';

function App() {
	let docTitle = document.title;
	window.addEventListener('blur', () => {
		document.title = '😭 Come back 😭';
	});

	window.addEventListener('focus', () => {
		document.title = docTitle;
	});
	const year = new Date().getFullYear();

	return (
		<main className="App">
			<section className="wrapper">
				<header>
					<span className="button">
						&nbsp;CALCULATOR&nbsp;
						<span className="hover-text" aria-hidden="true">
							&nbsp;CALCULATOR&nbsp;
						</span>
					</span>
				</header>
				<section>
					<Teclas />
				</section>
				<aside>
					<span className="titleRight">v1.0</span>
				</aside>
			</section>
			<footer className="years">
				Copyright &copy; <span>{year}</span> <a href="https://luisherdeth.com/">@luisherdeth</a>
			</footer>
		</main>
	);
}

export default App;
