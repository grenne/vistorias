$(function () {
	carregaExcecoes();
});

function carregaExcecoes() {
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.tarefasDoWFPath,
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar lista de exceções!',
        funcaoCallback: function (processos) {
        	var nomesProcessos = Object.keys(processos);
        	
        	// Processos
        	$.each(nomesProcessos, function (i, nomeProcesso) {
        		var tarefasDoProcesso = processos[nomeProcesso];
        		
        		var nomeProcessoStr = '<li data-role="list-divider">' + nomeProcesso + '<span class="ui-li-count">' + tarefasDoProcesso.length + '</span></li>';
        		
        		$('.lista-aprovacoes').append(nomeProcessoStr);
        		
        		// Tarefas
        		$.each(tarefasDoProcesso, function (j, tarefa) {
        			var variaveisStr = '';
        			var chavesDasVariaveis = Object.keys(tarefa.variaveis);
        			var temBotoesAprovaReprova = false;
        			
        			// Variáveis
        			$.each(chavesDasVariaveis, function(i, chave) {
        				if(chave != 'botoesAprovaReprova') {
        					variaveisStr += '<li><span class="descricao-detalhe">' + chave + ': ' + tarefa.variaveis[chave] + '</span></li>';	
        				} else {
        					temBotoesAprovaReprova = true;
        				}
        			});
        			
        			var desabilitado = temBotoesAprovaReprova ? '' : 'disabled=""';
        			
        			var tarefaStr = '' +
		        		'<li>' +
		                '    <label>' +
		                '        <input type="checkbox" name="checkbox-1" id="checkbox-1"' + desabilitado + ' data-id-instancia-tarefa=' + tarefa.idInstanciaTarefa + '>' +
		                '        <h2 class="nome-funcionario">' + tarefa.descricaoTarefa + '</h2>' +
		                '        <ul class="lista-de-detalhes">' +
		                '            ' + variaveisStr  +
		                '        </ul>' +
		                '    </label>' +
		                '</li>';
        			
        			$('.lista-aprovacoes').append(tarefaStr);
        		});
        		
        	});
        	
        	$('.lista-aprovacoes').listview('refresh');
        	$(':checkbox').checkboxradio();
    		
    		$('.ui-content').show();
        }
    });
}