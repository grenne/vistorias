/* Vistoria Detalhes */
$(document).ready(function() {    
	// window.idFuncionario = $.parametroUrl("fun");
	montaPagina();
    iniciaSnapper();
    iniciaAcoes();        
});


/* montagem da pagina */ 
function montaPagina() {
	$(function(){
		$.getJSON("json/tela.json", function(data){
			$.each(data.CAMPOS, function(z, item){
				if (item.tipo == 'input_texto') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'
					);
				}else if(item.tipo == 'input_inteiro') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '" class="input-number inteiro"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_decimal') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '" class="input-number decimal"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_data') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"  placeholder="__/__/____" class="input-number data"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_cpf') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '" placeholder="___.___.___-__" class="input-number cpf"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_cnpj') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"  placeholder="___.___.___.___/__" class="input-number cnpj"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_celular') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"  placeholder="(___)_____.____" class="input-number celular"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_telefone') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"  placeholder="(___)____.____" class="input-number telefone"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				}else if(item.tipo == 'input_placa') {
					$("#tabAcessorios").append(
						'<tr>' +
							'<td class="detalhes-label">' + item.label + ':</td>' +
							'<td>' +
								'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset input-number-div">' + 
		                        	'<input type="text" name="' + item.label.replace(" ", "") + z + '" id="' + item.label.replace(" ", "") + z + '" value="' + item.valor + '"  placeholder="___-____" class="input-number placa"/>' +
		                        '</div>' +
							'</td>' +
						'</tr>'					
					);
				};
			});
			$('.mesano').mask('00/0000');
			$('.data').mask('00/00/0000');
			$('.cpf').mask('000.000.000-00');
			$('.cnpj').mask('000.000.000.000/0000');
			$('.celular').mask('(000)00000.0000');
			$('.telefone').mask('(000)0000.0000');
			$('.inteiro').mask('000.000.000.000');
			$('.decimal').mask('000.000.000.000,00');
			$('.placa').mask('XXX-0000');
			$('.placa').mask('XXX-0000', {translation:  {'X': {pattern: /[A-Z]/}}});
		});	
	});
};

/* Utilizada biblioteca Swipe.js: http://swipejs.com/ */
function iniciaAcoes() {
    var elem = document.getElementById('swipe-acoes');
    window.mySwipe = Swipe(elem, {
      startSlide: 0,
      // auto: 3000,
      // continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      callback: function(index, element) {
        if(index == 0) {
            $('.titulo-pagina').html('Dados Vistoria'); 
        } else if (index == 1) {
            $('.titulo-pagina').html('Dados Proprietário');            
      	} else if (index == 2) {
      		$('.titulo-pagina').html('Dados Veículo');            
      	} else if (index == 3) {
      		$('.titulo-pagina').html('Acessórios');
      	} else if (index == 4) {
      		$('.titulo-pagina').html('Vistoria');
      	} else if (index == 5) {
      		$('.titulo-pagina').html('Fotos');
      	}
      }
      // transitionEnd: function(index, element) {}
    });
    
    $(document).keydown(function(e){
        if (e.keyCode == 39) { 
           window.mySwipe.next();
           return false;
        } else if (e.keyCode == 37) { 
           window.mySwipe.prev();
           return false;
        }
    }); 
    
}

function carregaDetalhesDoFuncionario() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.funcionarioDetalhesPath + "/" + window.idFuncionario + "?trazHistoricos=true",
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar detalhes do funcion��rio',
        funcaoCallback: function (funcionario) {
            $('.fun-re').html(funcionario.re);
            $('.fun-nome').html(funcionario.nome);
            $('.fun-dataAdmissao').html($.formataData(funcionario.dataAdmissao));
            $('.fun-salario').html(funcionario.salario);
            $('.fun-empresa').html(funcionario.empresa);    
            $('.fun-hierarquia').html(funcionario.hierarquia);
            $('.fun-sindicato').html(funcionario.sindicato);
            $('.fun-cargo').html(funcionario.cargo);    
            $('.fun-turno').html(funcionario.turno);
            $('.fun-tipo').html(funcionario.tipo);
            $('.fun-centroCusto').html(funcionario.centroCusto);
            $('.fun-localizacao').html(funcionario.localizacao);
            
            $('.pesfoto-detalhes').attr('src', window.urlServidor + window.restPath + window.fotoDoFuncionarioPath + "/" + funcionario.idPes);
            
            // Coloca id da pessoa em vari��vel global para ser usada em outros
			// m��todos
            window.idPessoa = funcionario.idPes;
            
            $('.ui-content').show();
            iniciaAcoes();        
        }
        
    });
};

function carregaDadosPessoais() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.dadosPessoaisPath + "/" + window.idPessoa,
        autenticacao : true,
        carregaGlobal: false,
        msgErro: 'Erro ao carregar dados pessoais',
        funcaoCallback: function (pessoa) {
            $('.pes-tel-comercial').html(pessoa.telefoneComercial);
            $('.pes-tel-comercial').attr('href', 'tel:' + pessoa.telefoneComercial);
            
            $('.pes-tel-comercial-ramal').html(pessoa.ramal);
            
            $('.pes-tel-residencia').html(pessoa.telefoneResidencia);
            $('.pes-tel-residencia').attr('href', 'tel:' + pessoa.telefoneResidencia);
            
            $('.pes-tel-celular').html(pessoa.telefoneCelular);
            $('.pes-tel-celular').attr('href', 'tel:' + pessoa.telefoneCelular);
            
            $('.pes-email').html(pessoa.email);
            $('.pes-email').attr('href', 'mailto:' + pessoa.mail);
            
            $('.pes-endereco').html(pessoa.enderecoResidencia.endereco + ", " + pessoa.enderecoResidencia.cidade + " - " + pessoa.enderecoResidencia.estado);
            $('.pes-data-nascimento').html($.formataData(pessoa.dataNascimento));

            if(pessoa.contatosSecundarios.length > 0) {
            	var contato = pessoa.contatosSecundarios[0];
            	
            	$('.con-nome').html(contato.nome);
            	
                $('.con-tel-comercial').html(contato.telefoneComercial);
                $('.con-tel-comercial').attr('href', 'tel:' + contato.telefoneComercial);
                
                $('.con-tel-comercial-ramal').html(contato.ramal);
                
                $('.con-tel-residencia').html(contato.telefoneResidencia);
                $('.con-tel-residencia').attr('href', 'tel:' + contato.telefoneResidencia);
                
                $('.con-tel-celular').html(contato.telefoneCelular);
                $('.con-tel-celular').attr('href', 'tel:' + contato.telefoneCelular);
                
                $('.con-email').html(contato.email);
                $('.con-email').attr('href', 'mailto:' + contato.mail);
                
                $('.dados-contato').show();
            }
        }
    });
}

function carregaPeriodoAquisitivo() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.feriasPath + "/" + window.idFuncionario,
        autenticacao : true,
        carregaDiv: $('.fer-periodo-aquisitivo'),
        msgErro: 'Erro ao carregar dados do per��odo aquisitivo',
        funcaoCallback: function (periodo) {
            // Verifica se pelo menos as datas de in��cio e fim de f��rias foram
			// obtidas do WS
            if(periodo.inicioPeriodoFerias && periodo.fimPeriodoFerias) {
                $('.fer-periodo-inicio').html($.formataData(periodo.inicioPeriodoFerias));
                $('.fer-periodo-fim').html($.formataData(periodo.fimPeriodoFerias));
                $('.fer-saldo').html(periodo.saldoFerias);
                $('.fer-dias-abono-ja-pagos').html(periodo.diasAbonoJaPagos);
                $('.fer-dias-descanso-oportuno').html(periodo.diasDescansoOportuno);
                $('.fer-dias-ponte').html(periodo.diasPonte);
    
            } else {
                $('.fer-periodo-aquisitivo>table').remove();
                $('.fer-periodo-aquisitivo').append('<span class="msg-erro">N��o foram encontrados dados de f��rias para o funcion��rio</span>');
            }      
        }
        
    });
}

function carregaHistoricoFerias() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.feriasHistoricoPath + "/" + window.idFuncionario,
        autenticacao : true,
        carregaDiv: $('.fer-historico div.ui-body'),
        msgErro: 'Erro ao carregar dados do hist��rico de f��rias',
        funcaoCallback: function (lista) {
            if(lista.length > 0) {
                $.each(lista, function (i, fer) {
                    var linha = ''+
                           '<tr>' +
                            '<th>' + $.formataData(fer.inicio) + '</th>' +
                            '<td>' + $.formataData(fer.fim) + '</td>' +
                            '<td>' + fer.dias + '</td>' +
                            '<td>' + $.formataData(fer.inicioPeriodoFerias) + ' a ' + $.formataData(fer.fimPeriodoFerias) +'</td>' +
                           '</tr>';
                    
                    $('#fer-historico-table>tbody').append(linha);                
                });
                
                $("#fer-historico-table").table("refresh");
            } else {
                $("#fer-historico-table").remove();
                $('.fer-historico .ui-body').append('<span class="msg-info">N��o foram encontrados dados de hist��rico de f��rias</span>');
            }              
        }
        
    });    
}

function carregaProgramacaoFerias() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.feriasProgramacaoPath + "/" + window.idFuncionario,
        autenticacao : true,
        carregaDiv: $('.fer-programacao div.ui-body'),
        msgErro: 'Erro ao carregar dados de programa����o de f��rias',
        funcaoCallback: function (lista) {
            if(lista.length > 0) {
                $.each(lista, function (i, fer) {
                    var linha = ''+
                           '<tr>' +
                            '<th>' + $.formataData(fer.inicio) + '</th>' +
                            '<td>' + $.formataData(fer.fim) + '</td>' +
                            '<td>' + fer.dias + '</td>' +
                            '<td>' + $.formataData(fer.inicioPeriodoFerias) + ' a ' + $.formataData(fer.fimPeriodoFerias) +'</td>' +
                           '</tr>';
                    
                    $('#fer-programacao-table>tbody').append(linha);                
                });
                
                $("#fer-programacao-table").table("refresh");
            } else {
                $("#fer-programacao-table").remove();
                $('.fer-programacao .ui-body').append('<span class="msg-info">N��o foram encontrados dados de programa����o de f��rias</span>');        
            }                         
        }
        
    });
}

function carregaFeriasColetivas() {
    $.ajaxPop({
        url: window.urlServidor + window.restPath + window.feriasColetivasPath + "/" + window.idFuncionario,
        autenticacao : true,
        carregaDiv: $('.fer-coletivas div.ui-body'),
        msgErro: 'Erro ao carregar dados de f��rias coletivas',
        funcaoCallback: function (lista) {
            if(lista.length > 0) {
                $.each(lista, function (i, fer) {
                    var linha = ''+
                           '<tr>' +
                            '<th>' + fer.nome + '</th>' +
                            '<td>' + $.formataData(fer.inicio) + '</td>' +
                            '<td>' + $.formataData(fer.fim) + '</td>' +
                            '<td>' + fer.dias + '</td>' +
                           '</tr>';
                    
                    $('#fer-coletivas-table>tbody').append(linha);                
                });
                
                $("#fer-coletivas-table").table("refresh");
            } else {
                $("#fer-coletivas-table").remove();
                $('.fer-coletivas .ui-body').append('<span class="msg-info">N��o foram encontrados dados de f��rias coletivas</span>');        
            }                
        }
        
    });
}

/* Utilizada biblioteca Snap.js: https://github.com/jakiestfu/Snap.js/ */
function iniciaSnapper() {
    var snapper = new Snap({
        element: document.getElementById('conteudo-geral'),
        dragger: document.getElementById('cabecalho-detalhes')
    });  
    
    snapper.on('animated', function() {
        var estado = snapper.state().state;

    });
    
    $('.snap-drawer').on('click', '.fecha-snapper', function () {
        snapper.close();
    });
};
