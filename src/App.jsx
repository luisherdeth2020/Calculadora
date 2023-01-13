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
		<div className="App">
			<button data-text="Awesome" className="button">
				<span className="title">
					&nbsp;CALCULATOR&nbsp;
				</span>
				<span className="hover-text" aria-hidden="true">
					&nbsp;CALCULATOR&nbsp;
				</span>
			</button>
			<Teclas />

			<span className="titleRight">v1.0</span>
		</div>
	);
}

export default App;
