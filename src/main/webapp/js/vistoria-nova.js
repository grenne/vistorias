/* Documento Detalhes */
$(document).ready(function() {   
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
	var tipoDevice = mobileDetect();
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];

	$(function(){
		$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/obter?id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
	            localStorage.setItem("dadosSaved", JSON.stringify(data));
        		montaCabecalho(data.documento.header, id, "false", "");
        		// formata campos texto
        		$('input[type="text"]').textinput().trigger('create');
        		// formata campos select
        		$('.fieldcontain').fieldcontain().trigger('create');
				var panelLabelList = [];
				$.each(data.documento.panel, function(i, panel){
					var panelId = panel.label.replace(" ", "") + i;
					var panelLabel = panel.label;
					panelLabelList[i] = panel.label;
					inicioPanel(panelId, panelLabel, i, panel);
					$.each(panel.fields, function(z, item){
						montaCampos(i, panelId, z, item, "detalhes", id, "false", "");
					});
					finalPanel(panelId, panelLabel, i, panel);
				});
			    iniciaSnapper();
			    iniciaAcoes(panelLabelList);        
				inicializaWindow();
            }
		});
	});
	
	// setar acao para botao submit
	$( ".submitButton" ).bind( "click", function(event, ui) {
		var dataSaved = localStorage.getItem("dadosSaved");
		var objJson = JSON.parse(dataSaved);
		objJson.documento.usuarioAtual = localStorage.cpfUsuario;
		objJson.documento.tipo = "dados";
		objJson.documento.situacao = "pendente";
		objJson.documento.usuarios[0].codigo = localStorage.cpfUsuario;
		console.log (dataSaved);
		console.log (JSON.stringify(objJson));
		
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            success: function(data) {
            	console.log ("terminou atualização id:" + id + " data:" + data);
            }
		});
		$(window.document.location).attr('href','vistorias.html');
	});	
});

