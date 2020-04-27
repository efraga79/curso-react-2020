import React from 'react';

class App extends React.Component {

	state = {
		nome : ""
	}

	modificarNome = (e) => {
		this.setState({
			nome: e.target.value
		})
	}

	criaComboBox = () => {
		const opcoes = [
			"fulano",
			"cicrano",
			"beltrano"
		]
		const comboBoxOpcoes = opcoes.map(opcao => <option>{opcao}</option>)

		return (
			<select>	
				{comboBoxOpcoes}
			</select>
		)
	}

	componentDidMount(){
		console.log('Executou o compnentDidMount')
	}

	render(){
		console.log('Executou o render')

		const MeuComboBox = () => this.criaComboBox()

		return (
			<>
				<h1>Hello {this.props.nome} sua idade é {this.props.idade} </h1>
				<input className="texto-centralizado" type="text" value={this.state.nome} onChange={ this.modificarNome } />
				<h2>o nome digitado foi {this.state.nome}</h2>
				<MeuComboBox></MeuComboBox>
			</>
		)
	}

}
	
export default App;
