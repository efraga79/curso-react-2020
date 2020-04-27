import React, { useState, useEffect } from 'react';

function App() {
	const [numero, setNumero] = useState('')
	const [segundoNumero, setSegundoNumero] = useState('')
	const [resultado, setResultado] = useState('')

	const somar = () => {
		const numeroInt = parseInt(numero)
		const segNumeroInt = parseInt(segundoNumero)
		setResultado( numeroInt + segNumeroInt)
	}

	useEffect(() => {
			console.log('variável número: ', numero)
	}, [numero])

	return (
		<>
			<div>
				<label htmlFor="numero">Número 1:</label>
				<input type="text" value={numero} onChange={e => setNumero(e.target.value)} />
			</div>
			<div>
				<label htmlFor="segundo">Número 2:</label>
				<input type="text" value={segundoNumero} onChange={e => setSegundoNumero(e.target.value)} />
			</div>
			<div>
				<button onClick={somar}>Somar</button>
			</div>
			<div>
				<label htmlFor="resultado">Resultado:</label>
				<input type="text" value={resultado} readOnly/>
			</div>
		</>
  );
}
