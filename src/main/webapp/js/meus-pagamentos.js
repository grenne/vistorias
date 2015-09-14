$(document).ready(function() {
	var ano = $.parametroUrl('ano');
	
	carregaAnosComProcessamento(ano);
	
	$('#ano-ativo').change(function () {		
		window.location.href= urlDaPaginaSemParametros() + "?ano=" + $('#ano-ativo').val();
	});

    $(document).keydown(function(e){
        if (e.keyCode == 39) {
        	$('.setas-navegacao .seta-direita').click();
        } else if (e.keyCode == 37) {
        	$('.setas-navegacao .seta-esquerda').click();
        }
    }); 
});

function urlDaPaginaSemParametros() {
	var url = window.location.href;
	
	var indiceFinalUrl = url.indexOf('?');
	
	if(indiceFinalUrl > 0) {
		url = url.substring(0, indiceFinalUrl);
	}
	
	return url;
}

function carregaAnosComProcessamento(anoUrl) {	
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.anosComProcessamentoPath + "/" + window.idFunLogado,
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar lista de anos com processamento!',
        funcaoCallback: function (anos) {
        	$.each(anos, function (i, ano) {
        		var opcaoAno = '<option value="' + ano + '">' + ano + '</option>';
        		
        		$('#ano-ativo').append(opcaoAno);
        	});

        	var anoAtivo;
        	
        	if(anoUrl) {
        		anoAtivo = anoUrl;
        	} else {
        		anoAtivo = $('#ano-ativo').val();
        	}        	        		
        	
        	$('#ano-ativo').val(anoAtivo).selectmenu('refresh');
        	carregaProcessamentosDoAno(anoAtivo);
        }
    });		
}


function carregaProcessamentosDoAno(ano) {
	// Limpa conteúdo existente
	$('.swipe-wrap').html('');
	
	// Preenche conteúdo com dados do servidor
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.processamentosDoAnoPath + "/" + window.idFunLogado + "/" + ano,
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar processamentos!',
        funcaoCallback: function (processamentos) {
        	$.each(processamentos, function (i, proc) {
        		var containerHolerite = '' +
				'<div class="container-holerite" data-indice-holerite="' + i + '">' +
				'<table class="cabecalho-holerite">' +
				'	<tr><td colspan="2"><h3 class="titulo-processamento"></h3></td></tr>' +
				'	<tr>' +
				'		<td>Mês/ano</td>'+
				'		<td class="mes-ano-processamento"></td>'+
				'	</tr>' +
				'	<tr>' +
				'		<td>Data de crédito</td>'+
				'		<td class="data-credito"></td>'+
				'	</tr>' +				
				'</table>' +
				'<table' +
				'	data-role="table"' +
				'	data-mode="reflow"' +
				'	class="tabela-verbas holerite">' +
				'	<thead>' +
				'		<tr>' +
				'			<th data-priority="1">Cod.</th>' +
				'			<th>Nome</th>' +
				'			<th data-priority="3">Qtde.</th>' +
				'			<th data-priority="2">Proventos</th>' +
				'			<th data-priority="2">Descontos</th>' +
				'		</tr>' +
				'	</thead>' +
				'	<tbody>' +
        		'' +
				'	</tbody>' +
				'	<tfoot>' +
				'		<tr class="holerite-proventos">' +
				'			<th colspan="4">Proventos</th>' +
				'			<td></td>' +
				'		</tr>' +
				'		<tr class="holerite-descontos">' +
				'			<th colspan="4">Descontos</th>' +
				'			<td></td>' +
				'		</tr>' +
				'		<tr class="holerite-liquido">' +
				'			<th colspan="4">Líquido</th>' +
				'			<td></td>' +
				'		</tr>' +
				'	</tfoot>' +
				'</table>' +
				'<div class="titulo-neutras">' +
				'	<hr class="separador">' +
				'	<h4>Neutras</h4>' +
				'</div>' +
				'<table' +
				'	data-role="table"' +
				'	data-mode="reflow"' +
				'	class="tabela-verbas neutras">' +
				'	<thead>' +
				'		<tr>' +
				'			<th data-priority="1">Cod.</th>' +
				'			<th>Nome</th>' +
				'			<th data-priority="3">Qtde.</th>' +
				'			<th data-priority="2">Valor</th>' +
				'		</tr>' +
				'	</thead>' +
				'	<tbody>' +
        		'' +
				'	</tbody>' +
				'</table>' +			
        		'</div>	';
        		
        		$('.swipe-wrap').append(containerHolerite);
        	});
        	
        	window.processamentosDoAno = processamentos;
        	
        	var holeriteAtivo = processamentos.length - 1; // último holerite, referente ao ano/mês mais recente
        	
        	$('.ui-content').show();

        	carregaHolerite(holeriteAtivo);
        	
        	iniciaSwipeHolerite(holeriteAtivo);
        }
    });	
}

function carregaHolerite(indiceHoleriteAtivo) {		
	var processamentoAtivo = window.processamentosDoAno[indiceHoleriteAtivo];
	var tipoProc = processamentoAtivo.atrTipoProcessamento;
	var anoMes = processamentoAtivo.atrAnoMesProcessamento;
	var numGer = processamentoAtivo.atrNumeroGeracao;
	var numProc = processamentoAtivo.atrNumeroProcessamento;
	
	var holeriteAtivo$ = $('.container-holerite[data-indice-holerite=' + indiceHoleriteAtivo + ']');
	
	ajustaSetasNavegacao(indiceHoleriteAtivo);
	
	//Espécie de cache - só carrega cada holerite apenas uma vez.
	if(!holeriteAtivo$.data('carregou')) {		
		$.ajaxPop({
	        url: window.urlServidor + window.restPath + window.holeritePath + "?idFun=" + 
	        	window.idFunLogado + "&tipoProcessamento=" + tipoProc + 
	        	"&anoMes=" + anoMes + 
	        	"&numeroProcessamento=" + numProc + 
	        	"&numeroGeracao=" + numGer,
	        autenticacao : true,
	        carregaGlobal: false,
	        msgErro: 'Erro ao carregar dados do holerite!',
	        funcaoCallback: function (processamento) {	        		
            	holeriteAtivo$.find('.titulo-processamento').html(processamento.nomeProcessamento);
            	holeriteAtivo$.find('.mes-ano-processamento').html(processamento.mesAnoProcessamento);
            	holeriteAtivo$.find('.data-credito').html($.formataData(processamento.dataDeCredito));
            	
            	holeriteAtivo$.find('.holerite-proventos>td').html(processamento.valorProventos);
            	holeriteAtivo$.find('.holerite-descontos>td').html(processamento.valorDescontos);
            	holeriteAtivo$.find('.holerite-liquido>td').html(processamento.valorLiquido);
            	
            	var temNeutras = false;
            	
            	$.each(processamento.eventos, function (i, evento) {	
            		if(evento.tipo == 'N') {
                		var linha = '' +
    					'<tr> ' + 
				            '<th>' + evento.codigo + '</th>' +
				            '<td class="nome-verba">' + evento.nome + '</td>' +
				            '<td class="holerite-valor">' + evento.quantidade + '</td>' +
				            '<td class="holerite-valor">' + evento.valor + '</td>' +
				        '</tr>';
                		
                		temNeutras = true;
                		
            			holeriteAtivo$.find('.neutras>tbody').append(linha);
            		} else {
                		var provento = "";
                		var desconto = "";
                		
                		if(evento.tipo == 'D') {
                			desconto = evento.valor;
                		} else if (evento.tipo == 'P') {
                			provento = evento.valor;
                		}
                		
                		var linha = '' +
            					'<tr> ' + 
        				            '<th>' + evento.codigo + '</th>' +
        				            '<td class="nome-verba">' + evento.nome + '</td>' +
        				            '<td class="holerite-valor">' + evento.quantidade + '</td>' +
        				            '<td class="holerite-valor holerite-valor-positivo">' + provento + '</td>' +
        				            '<td class="holerite-valor holerite-valor-negativo">' + desconto + '</td>' +
        				        '</tr>';
                		
                		holeriteAtivo$.find('.holerite>tbody').append(linha);
            		}
            	});

            	holeriteAtivo$.find('.holerite').table();
            	
            	if(temNeutras) {
            		holeriteAtivo$.find('.neutras').table();	
            	} else {
            		holeriteAtivo$.find('.neutras').hide();
            	}
            	
            	holeriteAtivo$.css('visibility', 'visible');
            	holeriteAtivo$.data('carregou', 'true');
            	
	        }
	    });			
	}

}

function ajustaSetasNavegacao(indiceHoleriteAtivo) {
	$('.setas-navegacao .seta-esquerda').css('opacity', '.2').unbind('click');
	$('.setas-navegacao .seta-direita').css('opacity', '.2').unbind('click');
	
	if(indiceHoleriteAtivo != 0) {
		$('.setas-navegacao .seta-esquerda').css('opacity', '1').click(function () {
			window.mySwipe.prev();
		});		
	}
	if(indiceHoleriteAtivo != window.processamentosDoAno.length - 1) {		
		$('.setas-navegacao .seta-direita').css('opacity', '1').click(function () {
			window.mySwipe.next();
		});
	}	
}

/* Utilizada biblioteca Swipe.js: http://swipejs.com/ */
function iniciaSwipeHolerite(indiceHoleriteAtivo) {
    var elem = document.getElementById('swipe-holerite');
    window.mySwipe = Swipe(elem, {
      continuous: false,
      startSlide: indiceHoleriteAtivo,
      callback: function(index, element) {
    	   carregaHolerite(index);	
      }
    });    
}