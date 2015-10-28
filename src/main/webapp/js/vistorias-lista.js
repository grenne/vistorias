/* Funcionário Lista */

$(document).ready(function() {
	$(function() {
		$.ajax({
			url : "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/lista?usuario=" + localStorage.cpfUsuario,
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
					$.each(documento.header, function(m, header) {
						montaLinha(m, header, id);
					});
					var separador = '' + '<hr class="separador" />';
					$("#listaVistorias").append(separador);
				});
				inicializaWindow();
			}
		});
	});
});

function montaLinha(i, header, id) {
	var linha = '' + '<div data-id="' 
			+ id 
			+ '">'
			+ '<a  href="vistoria-detalhe.html?id=' 
			+ id
			+ '" rel="external" data-transition="flip" class="labelHeader">'
			+ header.label 
			+ ':' 
			+ '</a>'
			+ '<a  href="vistoria-detalhe.html?id=' 
			+ id
			+ '" rel="external" data-transition="flip" class="labelValue">'
			+ header.valor + '</a>' 
			+ '</div>';
	$("#listaVistorias").append(linha);
};