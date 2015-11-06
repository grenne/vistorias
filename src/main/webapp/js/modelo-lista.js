/* Modelos Lista */

$(document).ready(function() {
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
	var url   = window.location.search.replace();
	var nextPage = url.split("?")[1];
	$(function() {
		$.ajax({
			url : "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/modelos",
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			success : function(data) {
				var dados = JSON.stringify(data);
				console.log ("dados:" + dados);
				$.each(data, function(i, modelos) {
					var obj = JSON.stringify(modelos);
					var id = modelos._id;
					console.log ("item:" + obj);
					montaLinha(i, modelos, id, nextPage);
					// formata campos botoes
					$('.line-button').button().trigger('create');
					var separador = '' + '<hr class="separador" />';
					$("#listaModelos").append(separador);
				});
				inicializaWindow();
			}
		});
	});
});

function montaLinha(i, modelos, id, nextPage) {
	var linha = '' + 
				'<div data-id="' + id	+ '">' +
					'<a  href="' + nextPage + '?id=' + id +	'" rel="external" data-inline="true" data-transition="flip" class="labelModelo" >' + modelos.modelo + '</a>' +
					'<a id="incluirButton-' + modelos.modelo + '" data-role="button" data-inline="true" data-theme="a" data-icon="plus" data-mini="true" class="line-button" style="float:right">Novo Modelo</a>' +
					'<a id="excluirButton-' + modelos.modelo + '" data-role="button" data-inline="true" data-theme="a" data-icon="delete" data-mini="true" class="line-button" style="float:right">Excluir</a>' +
				'</div>';
	$("#listaModelos").append(linha);
};