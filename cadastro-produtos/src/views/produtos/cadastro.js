import React from 'react'

import Card from '../../components/card'
import ProdutoService from '../../app/produtoServices'

import { withRouter } from 'react-router-dom'

const estadoInicial = {
	nome: '',
	sku: '',
	descricao: '',
	preco: 0,
	fornecedor: '',
	sucesso: false,
	errors: [],
	atualizando: false
}

class CadastroProduto extends React.Component {
	state = estadoInicial;

	constructor(){
		super()
		this.service = new ProdutoService();
	}

	onChange = (event) => {
		const valor = event.target.value
		const nomeDoCampo = event.target.name
		this.setState({ [nomeDoCampo]: valor })
	}

	onSubmit = (event) => {
		event.preventDefault();
		const produto = {
			nome: this.state.nome,
			sku: this.state.sku,
			descricao: this.state.descricao,
			preco: this.state.preco,
			fornecedor: this.state.fornecedor
		}
		try {
			this.service.salvar(produto)
			this.limpaCampos()
			this.setState({ sucesso : true })
		} catch (erro) {
			const errors = erro.errors
			this.setState({errors: errors})
		}
	}

	limpaCampos = () => {
		this.setState(estadoInicial)
	}

	componentDidMount(){
		const sku = this.props.match.params.sku

		if(sku){
			const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku )
			if(resultado.length === 1){
				const produtoEncontrado = resultado[0]
				this.setState({ ...produtoEncontrado, atualizando: true })
			}
		}
	}

	render(){
		return (
			<Card header={ this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto' }>
				<form id="frmProduto" onSubmit={this.onSubmit}>

					{
						this.state.sucesso &&
						
						<div class="alert alert-dismissible alert-success">
								<button type="button" class="close" data-dismiss="alert">&times;</button>
								<strong>Bem Feito!</strong> Cadastro Realizado com Sucesso!
							</div>
						
					}

					{
						this.state.errors.length > 0 &&

						this.state.errors.map( msg => {
							return (
								<div class="alert alert-dismissible alert-danger">
									<button type="button" class="close" data-dismiss="alert">&times;</button>
									<strong>Erro!</strong> { msg }!
								</div>
							)
						})
					}

					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="nome">Nome: *</label>
								<input type="text" value={this.state.nome} name="nome" id="nome" className="form-control" onChange={this.onChange} />
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="sku">SKU: *</label>
								<input type="text" value={this.state.sku} name="sku" id="sku" className="form-control" disabled={this.state.atualizando} onChange={this.onChange}/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label htmlFor="descricao">Descrição:</label>
								<textarea name="descricao" value={this.state.descricao} id="descricao" className="form-control" onChange={this.onChange}></textarea>
								</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="preco">Preco: *</label>
								<input type="number" value={this.state.preco} min="0" step="0.01" name="preco" id="preco" className="form-control" onChange={this.onChange} />
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="fornecedor">Fornecedor: *</label>
								<input type="text" value={this.state.fornecedor} name="fornecedor" id="fornecedor" className="form-control" onChange={this.onChange}/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-1">
							<button type="submit" className="btn btn-success">{ this.state.atualizando ? 'Atualizar' : 'Salvar'}</button>
						</div>
						<div className="col-md-1">
							<button className="btn btn-primary" onClick={this.limpaCampos}>Limpar</button>
						</div>
					</div>

				</form>
			</Card>
		)
	}
}

export default withRouter(CadastroProduto);