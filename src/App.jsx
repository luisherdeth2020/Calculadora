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
		</main>
	);
}

export default App;
