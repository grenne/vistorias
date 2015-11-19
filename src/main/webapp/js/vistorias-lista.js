/* Documento Lista */

$(document).ready(function() {
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
    var pathPage = location.pathname.split("/")[2];
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var tipoPagina = parametrosDaUrl.split("&")[0];
	var situacao = parametrosDaUrl.split("&")[1];
	var query = parametrosDaUrl.split("&")[2];
	var tipoLista = parametrosDaUrl.split("&")[3];
	console.log ('checkbox --' + query );
	$(function() {
		$.ajax({
			url : "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/lista?usuario=" + localStorage.cpfUsuario + '&queryUsuario=' + query + '&situacao=' + situacao,
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			success : function(data) {
				var dados = JSON.stringify(data);
				console.log ("dados:" + dados);
				$.each(data, function(i, documento) {
					var obj = JSON.stringify(documento);
					console.log ("item:" + obj);
					dados = JSON.parse(obj);
					var id = documento._id;
					var linha = "";
					if (tipoLista == "checkbox") {
						montarLinhaCheckBox(id, tipoPagina, pathPage, parametrosDaUrl, documento);
					};
					if (tipoLista == "link") {
						montarLinhaLink(id, tipoPagina, pathPage, parametrosDaUrl, documento);
					};
					inicializaWindow();
					$('ul').listview('refresh');
				});
			}
		});
	});
});

function montarLinhaCheckBox(id, tipoPagina, pathPage, parametrosDaUrl, documento) {
	var linha =
	    '<li class="ui-field-contain">' +
    		'<input type="checkbox" name="checkbox-' + id + '">';						
	if (documento.header[0].label != null){
		linha = linha + '<strong>' + documento.header[0].valor + '</strong>';
	};

	$.each(documento.header, function(m, header) {
		if (m !=0) {
			linha = linha + '<p>' + header.label + ' : ' + header.valor + '</p>';
		};
	});
	linha = linha + 
	'</li>';				
	$("#listaVistorias").append(linha);
};
function montarLinhaLink(id, tipoPagina, pathPage, parametrosDaUrl, documento) {
	var linha =
	    '<li><a href="vistoria-detalhe.html?' + id + '&' + tipoPagina + '&' + pathPage + '$' + parametrosDaUrl + '" rel="external" data-transition="flip">';

	if (documento.header[0].label != null){
		linha = linha + 
		'<h2>' + documento.header[0].valor + '</h2>';
	};
	$.each(documento.header, function(m, header) {
		if (m !=0) {
			linha = linha + '<p>' + header.label + ' : ' + header.valor + '</p>';
		};
	});
	linha = linha +   
		'</a></li>';
	$("#listaVistorias").append(linha);
};
