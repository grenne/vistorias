/* Funcionário Lista */

$(document).ready(function() {
	$(function() {
		$.ajax({
			url : "http://localhost:8080/vistorias/rest/lista",
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			success : function(data) {
				var dados = JSON.stringify(data);
				$.each(data, function(i, vistoria) {
					var obj = JSON.stringify(vistoria);
					dados = JSON.parse(obj);
					var id = vistoria._id;
					$.each(vistoria.header, function(m, header) {
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