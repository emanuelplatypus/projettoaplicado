import React, { Component } from 'react';
import moment from 'moment';

class Main extends Component {
	
	constructor(props) {
    super(props);		
	  this.state = { attivox: true};
	}
	
	myChangeHandler = (event) => {
		  const opcao1 = this.tippoUssuario.value
		  
		  if ( opcao1.localeCompare('1–Associado')  )
		  this.setState({
			attivox: false
		  })
		  
		  if ( opcao1.localeCompare('2–Operador')  )
		  this.setState({
			attivox: true
		  })
		  
		  const nome1 = this.nomeAssociado.value		  
		  const placa1 = this.tareffaPlacca.value
		  const datta1 = this.tareffaData.value
		  const ocorr1 = this.tareffaOcorrencia.value	  	  
		  var anox = datta1.substring(0, 4);
		  var mesex = datta1.substring(5, 7);
		  var dia = datta1.substring(8, 10);
		  var dataFormatada = dia + '/'+ mesex +'/'+ anox;
		  
		  this.setState({
			usercontent:
		    opcao1+'; '+nome1+'; '+dataFormatada+'; '+placa1+'; '+ocorr1
		  });
	}

  	onChange(e){
		
		const crypto = require('crypto');
		var hashedCode  = '';
		let filless = e.target.files;
		let reader = new FileReader();
		reader.readAsDataURL(filless[0]);
		reader.onload = (e) => {
			hashedCode  = crypto.createHash('sha1').update(e.target.result).digest('hex');
			document.getElementById('tareffaHashDocumento').value = hashedCode;
		}
	}
	
	   
  render() {
    return (
	
      <div id="content">
        <h2>Adicionar registro</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
		  const opcao1 = this.tippoUssuario.value
		  const marcador1 = 'marcNULO'
		  const marcador2 = this.tareffaMarccaddor.value
          const nome1 = this.nomeAssociado.value		  
		  const placa1 = this.tareffaPlacca.value
		  const datta1 = this.tareffaData.value
		  const ocorr1 = this.tareffaOcorrencia.value		  
		  const hashd1 = this.tareffaHashDocumento.value
		  var anox = datta1.substring(0, 4);
		  var mesex = datta1.substring(5, 7);
		  var dia = datta1.substring(8, 10);
		  var dataFormatada = dia + '/'+ mesex +'/'+ anox;
		  var timestamp = new Date().getTime();
		  if ( marcador2.length == 0  )
            this.props.createTask(opcao1+' '+nome1+' '+dataFormatada+' '+marcador1+' '+placa1+' '+ocorr1+' '+hashd1, timestamp)
	      if ( marcador2.length > 0   )
		    this.props.createTask(opcao1+' '+nome1+' '+dataFormatada+' '+marcador2+' '+placa1+' '+ocorr1+' '+hashd1, timestamp)
        }}>
		
		
		  <div className="form-group mr-sm-2">	
		  
		  <label for="cars"><span style={{color: '#007bff'}}>Usuário:&nbsp;&nbsp;&nbsp;</span></label>
			<select id="tippoUssuario" content="cars" onChange={this.myChangeHandler} ref={(select) => { this.tippoUssuario = select }} required>   
			  <option value="">Selecione a categoria</option>
			  <option value="1–Associado">1–Associado</option>
			  <option value="2–Operador">2–Operador</option>
		   </select>
		    
          </div>		         
		  
          <div className="form-group mr-sm-2">
            <input
              id="nomeAssociado"
              type="text"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.nomeAssociado = input }}
              className="form-control"
              placeholder="Nome do associado"
              required />			
          </div>
          
		  <div className="form-group mr-sm-2">
            <input
              id="tareffaData"
              type="date"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.tareffaData = input }}
              className="form-control"
              max={moment().format("YYYY-MM-DD")}			  
			  style={{background: 'white'}}
              required />
          </div>
		  
		  <div className="form-group mr-sm-2">
            <input
              id="tareffaPlacca"
              type="text"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.tareffaPlacca = input }}
              className="form-control"
              placeholder="Placa"
              required />
          </div>
		  
		  <div className="form-group mr-sm-2">
            <input
              id="tareffaOcorrencia"
              type="text"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.tareffaOcorrencia = input }}
              className="form-control"
              placeholder="Ocorrencia"
              required />
          </div>		  
		  		 
		<div className="form-group mr-sm-2">
		  <input type='text' class="form-control" placeholder="Registro completo" value={this.state.usercontent} />		
		</div>
		  
		  <div className="form-group mr-sm-2">
            <input
              id="tareffaHashDocumento"
              type="text"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.tareffaHashDocumento = input }}
              className="form-control"
              placeholder="Código do documento"
              /*required*/ />
          </div>
		  
		 <div className="form-group mr-sm-2">
            <input
              id="tareffaMarccaddor"
              type="text"
			  onChange={this.myChangeHandler}
              ref={(input) => { this.tareffaMarccaddor = input }}
              className="form-control"
			  disabled = {this.state.attivox} // inicio setado como 'true'
              placeholder="Marcador (campo preenchido apenas pela Central)"
              required />			
          </div> 

		<p></p>
		
		  <div>		
			  <div onSubmit={this.onFormSubmit}>
			  <h6>Se desejar anexar hash (código) de documento, siga as intruções abaixo.</h6>
			  <input type='file' content='file' onChange={(e)=>this.onChange(e)} />
			  </div>   
        </div>
		<p></p>
		  
          <button type="submit" className="btn btn-primary">Enviar dados</button>
        </form>
		

        <p>&nbsp;</p>
        <h6>Ocorrências</h6>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
			  <th scope="col">Núm do Registro</th>
              <th scope="col">Ocorrência</th>              
              <th scope="col">Endereço</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tareffaList">
            { this.props.tasks.map((tareffa, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{tareffa.id.toString()}</th>
				  <td>{tareffa.numReeggistro.toString()}</td>
                  <td>{tareffa.content}</td>                  
                  <td>{tareffa.owner.toString().substring(2, 10)}...</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
