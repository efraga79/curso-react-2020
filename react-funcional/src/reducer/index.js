import React, { useState} from 'react';

import useStore from './somaReducer';

function ReducerHook() {
	const [numero, setNumero] = useState('')
	const [segundoNumero, setSegundoNumero] = useState('')
	
	const [store, dispatch] = useStore()
	
	const somar = () => {
		const numeroInt = parseInt(numero)
		const segNumeroInt = parseInt(segundoNumero)

		dispatch({
			type: 'SOMA',
			payload: numeroInt + segNumeroInt
		})
	}

	const subtrair = () => {
		const numeroInt = parseInt(numero)
		const segNumeroInt = parseInt(segundoNumero)

		dispatch({
			type: 'SUBTRACAO',
			payload: numeroInt - segNumeroInt
		})
	}

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
				<button onClick={subtrair}>Subtrair</button>
			</div>
			<div>
				<label htmlFor="resultado">Resultado:</label>
				<input type="text" value={store.resultado} readOnly />
			</div>
		</>
	);
}

export default ReducerHook;
