/* Documento Lista */

$(document).ready(function() {
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
    var pathPage = location.pathname.split("/")[2];
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var tipoPagina = parametrosDaUrl.split("&")[0];
	var situacao = parametrosDaUrl.split("&")[1];
	var query = parametrosDaUrl.split("&")[2];
	console.log ('query --' + query );
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
					var linha = 
					    '<li><a href="vistoria-detalhe.html?' + id + '&' + tipoPagina + '&' + pathPage + '$' + parametrosDaUrl + '" rel="external" data-transition="flip">';
					if (documento.header[0].label != null){
						linha = linha + 
						'<h2>' + documento.header[0].valor + '</h2>';
					};
					var x = linha;
					$.each(documento.header, function(m, header) {
						if (m !=0) {
							x = x + '<p>' + header.label + ' : ' + header.valor + '</p>';
						};
					});
					linha =   
					    '</a></li>';
					x= x + linha;
					$("#listaVistorias").append(x);
				});
				inicializaWindow();
				$('ul').listview('refresh');
			}
		});
	});
});
