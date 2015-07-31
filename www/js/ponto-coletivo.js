$(function () {
	$("#toggle-todos").selecionaTodos();
	
	$("#toggle-todos").click(function () {
		atualizaBotoesDeAcoes();		
	});
	
	$('.botoes-acoes .ui-btn').addClass('ui-disabled');
	
	carregaExcecoes();
	carregaMotivos()
	
	preparaBotoesDeAcao();
	preparaBotaoDeConfirmacao();
	preparaPesquisaFuncionario();
});

var timer;

function preparaPesquisaFuncionario() {
	$('#pesquisaFuncionario').keyup(function () {
		if(timer) {
			clearTimeout(timer);
		}
		
		var texto = $(this).val()
		timer = setTimeout(function(){
			pesquisaFuncionario(texto);
		}, 1000 );
		
	});
}

function pesquisaFuncionario(texto) {
	$('.nome-funcionario').each(function () {		
		if($(this).html().toUpperCase().indexOf(texto.toUpperCase()) < 0) {
			$(this).closest('li').hide();	
		} else {
			$(this).closest('li').show();
		}
	});
//	Esconde dias que não possui nenhum funcionário como resultado do filtro
//	$('.lista-aprovacoes li.ui-li-divider').each(function () {
//		var teveFunNaPesquisa = false
//		
//		$(this).find('~ li').each(function () {
//			alert($(this).attr('class'));
//			
//			if($(this).hasClass('ui-li-divider')) {
//				return false; //break - chegou no próximo dia
//			} else {
//				if($(this).find('.nome-funcionario:visible').size() == 0) {
//					teveFunNaPesquisa = true;
//					return false //break - achou funcionário nesse dia
//				}	
//			}
//		});
//		
//		 if(teveFunNaPesquisa) {
//			 $(this).show();
//		 } else {
//			 $(this).hide();
//		 }
//	});
}

function preparaBotaoDeConfirmacao() {
	$('#btnCancela').click(function () {
		$('#popupDialog').popup('close');
	});
	
	$('#btnConfirma').click(function () {
		
		var validou = true;
		
		$('#popupDialog .confirma').each(function () {
			// verifica apenas os motivos que estão visíveis
			if($(this).css('display') != 'none') {
				if($(this).find('select').val() == 0) {
					$('.msg').show();
					validou = false;
					return false;
				}				
			}
		});
			
		if(validou) {
			$('#popupDialog').popup('close');
		}
	});
}

function carregaMotivos() {
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.motivosDeAbonoPath,
        autenticacao : true,
        carregaGlobal: false,
        msgErro: 'Erro ao carregar motivos de abono!',
        funcaoCallback: function (motivos) {
        	$.each(motivos, function (i, motivo) {
        		var motivoStr = '<option value="' + motivo.atrIdMotivoAbono + '" >' + motivo.atrNomeMotivoAbono + '</option>';
        		$('#selectMotivosAbono').append(motivoStr);
        	});
        }	
	});

	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.motivosDeAutorizacaoPath,
        autenticacao : true,
        carregaGlobal: false,
        msgErro: 'Erro ao carregar motivos de autorização!',
        funcaoCallback: function (motivos) {
        	$.each(motivos, function (i, motivo) {
        		var motivoStr = '<option value="' + motivo.atrIdMotivoAutorizacao + '" >' + motivo.atrNomeMotivoAutorizacao + '</option>';
        		$('#selectMotivosAutorizacao').append(motivoStr);
        	});
        }	
	});
}

/**
 * Carrega as exceções pendentes no servidor e monta a lista a ser mostrada na tela
 */
function carregaExcecoes() {
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.excecoesPath + "/" + window.idFunLogado,
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar lista de exceções!',
        funcaoCallback: function (diasComExcecao) {
        	// Dias
        	$.each(diasComExcecao, function (i, diaComExcecao) {
        		var diaStr = '' +
                '<li data-role="list-divider">' + $.formataDataPorExtenso(diaComExcecao.data) + '<span class="ui-li-count">' + diaComExcecao.qtdeDeExcecoes + '</span></li> ';
        	
        		// Funcionários
        		$.each(diaComExcecao.jornadasFuncionarios, function (j, jornada) {
        			var jornadaFunStr = ' ' +
                    '<li> ' +
                    '    <label> ' +
                    '        <input type="checkbox" name="checkbox-' + j + '" id="checkbox-' + j + '" data-tem-abono=' + jornada.temAbono + ' data-tem-autorizacao=' + jornada.temAutorizacao+ ' data-tem-critica=' + jornada.temCritica+ '> ' +
                    '        <h2 class="nome-funcionario">' + jornada.nomeFuncionario + '</h2> ' +
                    '        <ul class="lista-de-detalhes">';
        		
        			// Exceções
        			$.each(jornada.excecoes, function (k, excecao) {
        				var classeIcone = getMapaDeIcones()[excecao.tipo];
        				var corIcone = 'ponto-icone-' + excecao.tipo.toLowerCase();
        				
        				var excecaoStr = '' +
                        '            <li>' +
                        '                <i class="fa ' + classeIcone + ' ponto-icone ' + corIcone + '"></i>' +
                        '                <span class="descricao-detalhe">' + getDescricaoDetalhadaDaExcecao(excecao) + '</span>' +
                        '            </li>';
        			
        				jornadaFunStr = jornadaFunStr + ' ' + excecaoStr; 
        			});
        			
        			diaStr = diaStr + jornadaFunStr;
        		
        			diaStr = diaStr + ' </ul>' +
                    '        <p class="ui-li-aside"><strong>' + $.formataHora(jornada.horaEntrada) + ' - ' + $.formataHora(jornada.horaSaida) + '</strong></p> ' +
                    '    </label> ' +
                    '</li>';
        		});
        		
        		$('.lista-aprovacoes').append(diaStr).listview('refresh');
        	});
        	
        	// Inicia elementos checkBox do jQuery Mobile
        	$(':checkbox').checkboxradio();
        	
        	// Desabilita checkboxes de dias que não possuem abono nem autorização - normalmente dias com crítica entram nesse caso
        	$(':checkbox').each(function () {        		
        		if($(this).attr('data-tem-abono') == 'false' && $(this).attr('data-tem-autorizacao') == 'false') {
        			$(this).checkboxradio( "option", "disabled", true).checkboxradio('refresh');
        		}
        	});
    		
    		
    		$(':checkbox').change(function (e) {
    			atualizaBotoesDeAcoes();
    		});
    		
    		$('.ui-content').show();
        }
    });
}

/**
 * Retorna um mapa que associa as diferentes exceções a classes CSS representando ícones do FontAwesome
 * @returns {mapa}
 */
function getMapaDeIcones() {
	var mapa = {};
	mapa['FALTA'] = 'fa-user';
	mapa['ATRASO'] = 'fa-clock-o';
	mapa['HORA_EXTRA'] = 'fa-usd';
	mapa['CRITICA'] = 'fa-exclamation';
	
	return mapa;
}

/**
 * Retorna a descrição da exceção juntamente com os detalhes da mesma. Caso seja uma hora extra ou atraso
 * inclui o tempo da exceção na descrição
 * 
 * @param excecao
 * @returns {String}
 */
function getDescricaoDetalhadaDaExcecao(excecao) {
	var descricao = excecao.descricao;
	
	var textoDetalhe = '';
	
	if(excecao.tipo == 'HORA_EXTRA' || excecao.tipo == 'ATRASO') {
		textoDetalhe = ' - ' + transformaHorasEmTexto(excecao.horas);
	} 
	
	return descricao + textoDetalhe;
}

/**
 * Transforma uma quantidade de horas em um texto amigável. Caso o valor seja menor que 1 
 * o texto é adaptado para indicar o tempo em minutos. Logo se o parâmetro passado for 0.5
 * o retorno será '30 minutos'.
 * 
 * @param horas
 * @returns {String}
 */
function transformaHorasEmTexto(horas) {
	if(horas < 1) {
		return horas * 60 + " minutos";
	} else if (horas >= 1 && horas < 2) {
		return horas + " hora";
	} else {
		return horas + " horas";
	} 
}

/**
 * Executada a cada alteração nos checkbox, essa função verifica se a jornada(s) selecionada(s) possui
 * abono e/ou autorização e habilita o(s) botão(ões) correspondente(s).
 */
function atualizaBotoesDeAcoes() {		
	$('.botoes-acoes .ui-btn').addClass('ui-disabled');
	
	$(':checkbox').each(function () {
		
		if( $(this).prop( "checked" ) ) {			
			if($(this).attr('data-tem-abono') == 'true') {				
				$('#btnAbona').parent().removeClass('ui-disabled');
			}

			if($(this).attr('data-tem-autorizacao') == 'true') {
				$('#btnAutoriza').parent().removeClass('ui-disabled');
			}
		};
		
	});
	
	if(!$('#btnAbona').parent().hasClass('ui-disabled') && !$('#btnAutoriza').parent().hasClass('ui-disabled') ) {
		$('#btnAbonaAutoriza').parent().removeClass('ui-disabled');	
	}	
}

function preparaBotoesDeAcao() {
	/* ações em comum para os três botões */
	$('.botoes-acoes :button').click(function () {
		$('.msg').hide();
		$('#popupDialog').popup('open');
	});
	
	$('#btnAbonaAutoriza').click(function () {		
		var qtdeAutorizacoes = getQtdeAutorizacoes();
		var qtdeAbonos = getQtdeAbonos();
		
		$('.confirma-autorizacoes').show();
		$('.confirma-abonos').show();
		
		$('.confirma-autorizacoes strong').html(qtdeAutorizacoes)
		$('.confirma-abonos strong').html(qtdeAbonos).show();
	});	
	
	$('#btnAbona').click(function () {		
		var qtdeAbonos = getQtdeAbonos();
		
		$('.confirma-autorizacoes').hide();
		$('.confirma-abonos').show();
		
		$('.confirma-abonos strong').html(qtdeAbonos);
	});	
	
	$('#btnAutoriza').click(function () {		
		var qtdeAutorizacoes = getQtdeAutorizacoes();
		
		$('.confirma-abonos').hide();
		$('.confirma-autorizacoes').show();
		
		$('.confirma-autorizacoes strong').html(qtdeAutorizacoes);
	});		
}

function getQtdeAbonos() {
	var qtdeAbonos = 0;
	
	$('.ui-checkbox-on + input').each(function () {
		if($(this).attr('data-tem-abono') == 'true') {
			qtdeAbonos += 1;
		}
	});	
	
	return qtdeAbonos;
}

function getQtdeAutorizacoes() {
	var qtdeAutorizacoes = 0;
	
	$('.ui-checkbox-on + input').each(function () {
		if($(this).attr('data-tem-autorizacao') == 'true') {
			qtdeAutorizacoes += 1;
		}
	});
	
	return qtdeAutorizacoes;
}