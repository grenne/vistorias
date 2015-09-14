/* Vistoria Detalhes */
$(document).ready(function() {    
	// window.idFuncionario = $.parametroUrl("fun");
	console.log ("iniciooo montagem");
	$(function(){
		$.ajax(
				{
					type : "GET",
					url : '/services/VistoriaLista',
					dataType : "json",
					context : this,
					success : function(vistorias) {
//						$.each(vistorias, function(i, vis) {
							console.log ("dentro do Ajax");
//						});
					}
				}).error(function(e) {
					console.log ("deu erro");
			mostraErros([ e.statusText ]);
		})
	});

/*
	$(function(){
		$.ajax(
				{
					type : "GET",
					url : '/populisII-web/rest/posicao/busca?maxResultados=_1&amp;idVisao=' + idVisao,
					dataType : "json",
					context : this,
					success : function(vistorias) {
						$.each(vistorias, function(i, vis) {
							alert ("vistorias");
						});
					}
				}).error(function(e) {
			mostraErros([ e.statusText ]);
		})
	};

		$.ajax({
            url: "http://localhost:8080/www/json/tela.json",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
//            localStorage.setItem("dadosSaved", JSON.stringify(data));    
			var panelLabelList = [];
			$.each(data.panel, function(i, panel){
				alert ("painel");
				var panelId = panel.label.replace(" ", "") + i;
				var panelLabel = panel.label;
				panelLabelList[i] = panel.label;
				inicioPanel(panelId, panelLabel, i, panel);
				$.each(panel.fields, function(z, item){
					alert("campo");
					montaCampos(i, panelId, z, item);
				});
				finalPanel(panelId, panelLabel, i, panel);
			});
		    iniciaSnapper();
		    iniciaAcoes(panelLabelList);        
			inicializaWindow();
			var text = localStorage.getItem("dadosSaved");
			obj = JSON.parse(text);
            }
		});
	});
*/

	var text = 
			'{' +
			  '"panel": [' +
			    '{' +
			      '"tipo": "swipe",' +
			      '"label": "Dados Vistoria",' +
			      '"fields": [' +
			        '{' +
			          '"tipo": "input_checkbox",' +
			          '"label": "Checkbox",' +
			          '"valor": "FUI"' +
			        '},' +
			        '{' +
			          '"tipo": "input_inteiro",' +
			          '"label": "Inteiro",' +
			          '"valor": "124123"' +
			        '}' +
			      ']' +
			    '}' +
			  ']' +
			'}';
	var data = JSON.parse(text);
	var panelLabelList = [];
	$.each(data.panel, function(i, panel){
		console.log ("painel");
		var panelId = panel.label.replace(" ", "") + i;
		var panelLabel = panel.label;
		panelLabelList[i] = panel.label;
		inicioPanel(panelId, panelLabel, i, panel);
		$.each(panel.fields, function(z, item){
			console.log("campo");
			montaCampos(i, panelId, z, item);
		});
		finalPanel(panelId, panelLabel, i, panel);
	});
    iniciaSnapper();
    iniciaAcoes(panelLabelList);        
	inicializaWindow();

});


function inicioPanel(panelId, panelLabel, i, panel) {
	$("#paineis").append(
	'<!-- ' + panel.label + ' -->' +			
	'<div id="panel-' + panelId + '">' +
		'<h3 class="ui-bar ui-bar-d ui-corner-all">' + panel.label + '</h3>' +
		'<div id="container-' + panelId + '" class=" ui-body ui-body-a ui-corner-all vistoria-detalhes">' +
			'<table id="table-' + panelId + '">'
	);
};

function finalPanel(panelId, panelLabel, i, panel) {
	$("#paineis").append(
			'</table>' +
		'</div>' +
		'<!-- ' + panel.label + ' -->' +
	'</div>'
	);
};

function montaCampos(i, panelId, z, item) {
	var labelId = item.label.replace( /\s/g, '' ) + z + "-" + i;
	var label = item.label;
	var labelRadioId = "";
	inicioCampo(panelId, label, labelId);

	if (item.tipo == 'input_texto') {
		$("#td-textinput-" + labelId).append(
                	'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"/>'
		);
	}else if(item.tipo == 'input_inteiro') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-number inteiro"/>'
		);
	}else if(item.tipo == 'input_decimal') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-number decimal"/>'
		);
	}else if(item.tipo == 'input_data') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="__/__/____" class="input-number data"/>'
		);
	}else if(item.tipo == 'input_cpf') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" placeholder="___.___.___-__" class="input-number cpf"/>'
		);
	}else if(item.tipo == 'input_cnpj') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___.___.___.___/__" class="input-number cnpj"/>'
		);
	}else if(item.tipo == 'input_celular') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)_____.____" class="input-number celular"/>'
		);
	}else if(item.tipo == 'input_telefone') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)____.____" class="input-number telefone"/>'
		);
	}else if(item.tipo == 'input_placa') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___-____" class="input-number placa"/>'
		);
	}else if(item.tipo == 'input_checkbox') {
		$("#td-textinput-" + labelId).append(
					'<input type="checkbox" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" />'
		);
	}else if(item.tipo == 'input_radio') {
		$("#td-textinput-" + labelId).append(
					'<fieldset id="' + labelId + '" data-role="controlgroup" data-mini="true" data-type="horizontal" class="controlgroup">'
			);
		$.each(item.opcoes, function(w, item_radio){
			var labelRadioId = item_radio.label.replace( /\s/g, '' ) + z;
			var textChecked ="";
			if (item_radio.label == item.valor) {
				textChecked = 'checked="checked"';
			};
			$("#" + labelId).append(
						'<input type="radio" class="ui-radio" name="' + labelId + '" id="' + labelRadioId + '"  value="' + item_radio.label + '" ' + textChecked + ' />' + 
						'<label for="' + labelRadioId + '">' + item_radio.label + '</label>' 
			);
			$("#" + labelRadioId).click(function() {
				var text = localStorage.getItem("dadosSaved");
				obj = JSON.parse(text);
				obj.panel[i].fields[z].valor =  $("#" + labelRadioId).val();
//		        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
//				var text1 = localStorage.getItem("dadosSaved");
//				obj1 = JSON.parse(text1);
//				console.log (obj1.panel[i].fields[z].valor);
			});
		});
		$("#td-textinput-" + labelId).append(
					'</fieldset>'
		);
	}else if(item.tipo == 'input_select') {
		$("#td-textinput-" + labelId).append(
						'<div id="' + labelId + '" data-role="fieldcontain" class="fieldcontain" >' +
							'<select name="' + labelId + '" id="select-' + labelId + '" data-mini="true">'
			);
		$("#select-" + labelId).append(
    			'<option value="">Selecionar</option>' 
		);
		$.each(item.opcoes, function(w, item_select){
			var textSelected ="";
			if (item_select.label == item.valor) {
				textSelected = 'selected';
			};
			$("#select-" + labelId).append(
			        			'<option value="' + item_select.label + '" ' + textSelected + '>' + item_select.label + '</option>' 
			);
		});
		$("#select-" + labelId).click(function() {
			if($("#select-" + labelId).val() == "Selecionar"){
				$("#select-" + labelId).val("");
			};
			var text = localStorage.getItem("dadosSaved");
			obj = JSON.parse(text);
			obj.panel[i].fields[z].valor =  $("#select-" + labelId).val();
//	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
			var text1 = localStorage.getItem("dadosSaved");
			obj1 = JSON.parse(text1);
//			console.log (obj1.panel[i].fields[z].valor);				
		});
//		$("#table-" + panelId).append(
//						'	</select>' +
//						'</div>'
//		);
	};
	// salva conteudo
	$("#" + labelId).blur(function() {
		var text = localStorage.getItem("dadosSaved");
		obj = JSON.parse(text);
		if (obj.panel[i].fields[z].tipo != "input_texto") {
			obj.panel[i].fields[z].valor =  $("#" + labelId).val().replace(/[^a-z0-9]+/gi,'');
		}else{
			obj.panel[i].fields[z].valor =  $("#" + labelId).val();
		};
        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		var text1 = localStorage.getItem("dadosSaved");
		obj1 = JSON.parse(text1);
		console.log (obj1.panel[i].fields[z].valor);
	});

	finalCampo(panelId, label, labelId);
};

function inicioCampo(panelId, label, labelId) {
	$("#table-" + panelId).append(
			'<tr>' +
				'<td for="textinput-' + labelId + '" class="ui-input-text">' + label + '</td>' +
				'<td id="td-textinput-' + labelId + '">'
	);
};

function finalCampo(panelId, label, labelId) {
	$("#table-" + panelId).append(
				'</td>' +
			'</tr>'					
	);
};

function inicializaWindow() {	
	$('input[type="text"]').textinput().trigger('create');
	$('[type=checkbox]').checkboxradio().trigger('create');
	$('.controlgroup').controlgroup().trigger('create');
	$('.fieldcontain').fieldcontain().trigger('create');
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
};

/* Utilizada biblioteca Swipe.js: http://swipejs.com/ */
function iniciaAcoes(panelLabelList) {
    var elem = document.getElementById('swipe-acoes');
    window.mySwipe = Swipe(elem, {
      startSlide: 0,
      // auto: 3000,
      // continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      callback: function(index, element) {
            $('.titulo-pagina').html(panelLabelList[index]); 
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

function atualizarFields(data, i, z, id, value){ 
	panel[i].fileds[z] = JSON.stringify({
		value : $(id).val(value) 
	}); 
}; 


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
