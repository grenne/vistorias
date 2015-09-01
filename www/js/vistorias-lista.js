/* Funcionário Lista */

$(document).ready(function() {  
	/*
	$.ajaxPop({
        url: window.urlServidor + window.restPath + window.listaFuncionariosDoGestorPath + "/" + window.idFunLogado,
        autenticacao : true,
        carregaGlobal: true,
        msgErro: 'Erro ao carregar lista de funcionários!',
        funcaoCallback: function (lista) {
            var listaIds = "";
            
            $.each(lista, function (i, fun) {
                var linha = ''+
                   '<tr data-idFun="' + fun.idFun + '">' + 
                    '<td><img src="' + window.urlServidor + window.restPath + window.fotoDoFuncionarioPath + "/" + fun.idPes + '" class="pesfoto"></td>' +           
                    '<td>' + fun.re + '</td>' +
                    '<td>' + fun.nome + '</td>' +
                    '<td>' + fun.cargo + '</td>' +
                    '<td>' + fun.salario + '</td>' +
                    '<td>' + fun.turno + '</td>' +
                    '<td></td>' +                    
                   '</tr>';                
                
                $("#tabela-funcionarios>tbody").append(linha);
                
                // vai montando string de ids
                listaIds = listaIds + fun.idFun + ',';
            });
            
            // remove última vírgula
            listaIds = listaIds.substring(0, listaIds.length - 1);
            
            $('#tabela-funcionarios tr').click(function() {            
                var href = "funcionario-detalhes.html?fun=" + $(this).attr('data-idFun') + "&ids=" + listaIds;
                
                window.location = href;
            });            
            
            $("#tabela-funcionarios").table("refresh");
            
            $('.ui-content').show();        
        }
        
    });
*/
    var linha = ''+
   		'<div data-idFun="' + 1 + '">' + 
   			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
   		'</div>';
    $("#listaVistorias").append(linha);
    linha = ''+
		'<div>' +    	
			'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
		'</div>';
    $("#listaVistorias").append(linha);
    linha = ''+
    	'<div>' +
   			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
   		'</div>';
    $("#listaVistorias").append(linha);
    linha = ''+
		'<hr class="separador" />';
    $("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="vistoria-detalhe.html" rel="external" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);




linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);



linha = ''+
		'<div data-idFun="' + 1 + '">' + 
			'<a href="#videos" data-transition="flip" class="placaVeiculo">' + 'Placa FCZ 9212' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +    	
		'<a class="dadoVistoria">' + 'Motivo - Novo' + '</a>' +
	'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<div>' +
			'<a class="dadoVistoria">' + 'Endereço - Rua 7 de Abril 344 5. andar' + '</a>' +
		'</div>';
$("#listaVistorias").append(linha);
linha = ''+
	'<hr class="separador" />';
$("#listaVistorias").append(linha);


    
});