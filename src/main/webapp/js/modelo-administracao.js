/* Documento Detalhes */
$(document).ready(function() {   
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
	var tipoDevice = mobileDetect();
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	var urlBack = parametrosDaUrl.split("&")[2].split("$")[0] + '?' + parametrosDaUrl.split("$")[1]; 

	// setar barra superior para voltar para pagina correta 
	montaBarHeader(urlBack);	

	$(function(){
		$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/obter?id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
	            localStorage.setItem("dadosSaved", JSON.stringify(data));
        		montaCabecalho(data.documento.header, id, "true");
        		// formata campos texto
        		$('input[type="text"]').textinput().trigger('create');
        		// formata campos select
        		$('.fieldcontain').fieldcontain().trigger('create');
				var panelLabelList = [];
				$.each(data.documento.panel, function(i, panel){
					var panelId = panel.label.replace(" ", "") + i;
					var panelLabel = panel.label;
					panelLabelList[i] = panel.label;
					inicioPanel(panelId, panelLabel, i, panel, id, "true");
					$.each(panel.fields, function(z, item){
						montaCampos(i, panelId, z, item, "detalhes", id, "true");
					});
					finalPanel(panelId, panelLabel, i, panel, "true");
				});
			    iniciaSnapper();
			    iniciaAcoes(panelLabelList);        
				inicializaWindow();
            }
		});
	});	
});

function incluirOpcoes(opcao) {

	$("#table-campos").append(
			'<tr id="tr-opcoes' + numeroCampo +   '" class="opcoes">' +
				'<td for="textinput-opcoes' + numeroCampo +  '" class="ui-input-text">Opção</td>' +
				'<td id="td-textinput-opcoes">' +
					'<input type="text" name="opcoes' + numeroCampo + '" id="opcoes' + numeroCampo +  '" value="' + opcao +  '" class="input-value" required data-inline="true"/>' +
				'</td>' +
				'<td id="button-opcoes' + numeroCampo +   '">' +
					'<a id="incluirOpcao-' + numeroCampo +   '" data-role="button" data-inline="true" data-theme="a" data-icon="plus" data-mini="true" class="line-button">Nova</a>' +
					'<a id="excluirOpcao-' + numeroCampo +   '" data-role="button" data-inline="true" data-theme="a" data-icon="delete" data-mini="true" class="line-button">Exclui</a>' +
				'</td>' +
			'</tr>'					
		);
	var item = numeroCampo;
	$('#excluirOpcao-' + item).bind( "click", function(event, ui) {
		$('#tr-opcoes' + item).remove();
    });
	$('#incluirOpcao-' + numeroCampo).bind( "click", function(event, ui) {
		incluirOpcoes("");
    });
	
	// formata campos texto
	$('input[type="text"]').textinput().trigger('create');
	// formata campos botoes
	$('.line-button').button().trigger('create');
	
	numeroCampo++;
	
	return numeroCampo;
}

