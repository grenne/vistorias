$(document).ready(function() {
	var usuario$ = $('#usuarioInputText');
	var senhaInput$ = $('#senhaPassInput');
	var nomeUsuario$ = $('#nomeUsuario');
	var inputChange = false;
	var mudouUsuario = false;

	if (localStorage.usuario != "undefined") {
		usuario$.val(localStorage.usuario);
	}else{
		usuario$.val("");
	};
	if (localStorage.senha != "undefined") {
		senhaInput$.val(localStorage.senha);
	}else{
		senhaInput$.val("");
	};
	if (localStorage.nomeUsuario != "undefined") {
		nomeUsuario$.val(localStorage.nomeUsuario);
	}else{
		nomeUsuario$.val("");
	};
		
	$("#usuarioInputText").bind( "change", function() {
		  inputChange = true;
		  mudouUsuario = true;
	});

	$("#nomeUsuario").bind( "change", function() {
		  inputChange = true;
	});

	$("#btn-limpa-dados").bind( "click", function() {
		$("#popLimpaDados").popup( "open" );
	});

	$("#btn-limpaDados").bind( "click", function() {
		localStorage.clear();
		document.location.replace("config.html");
	});

	$("#btn-cancelaLimpaDados").bind( "click", function() {
		$("#popLimpaDados").popup( "close" );
	});

	$("#configForm").submit(function(e) {
		e.preventDefault();
		salvaConfiguracao(this, inputChange, mudouUsuario);
	});
	
	$("#preencheBaseDemo").click(function () { 
		utilizarBaseDeDemonstracao();
	});

});

function utilizarBaseDeDemonstracao() {
	var usuario$ = $('#usuarioInputText');
	var senhaInput$ = $('#senhaPassInput');
	var nomeUsuario$ = $('#nomeUsuario');
	
	var urlDemo = "http://54.225.154.23:1080/populisII-web";
	var cpfDemo = "111.111.111-11";
	var senhaDemo = "teste";

	console.info("Preenchendo formulário com dados da base de demonstração");
	usuario$.val(cpfDemo);
	senhaInput$.val(senhaDemo);
}

function salvaConfiguracao(formulario, inputChange, mudouUsuario) {
	var $configForm = $(formulario);

	if (!$configForm[0].checkValidity()) {
		$('#salva-configuracao').click();
	}

	var usuario = $('#usuarioInputText').val();
	var senha = $('#senhaPassInput').val();
	var nomeUsuario = $('#nomeUsuario').val();
	
	if (localStorage.usuarioInvalido == "true" ){
		incluiUsuario (usuario, senha, nomeUsuario);
		inputChange = false;
		localStorage.usuErro = "false";
	};

	if (inputChange && !mudouUsuario){
		atualizaUsuario (usuario, senha, nomeUsuario, localStorage.usuId);
	};

	executaLogin(localStorage.urlServidor, usuario, senha, "true");
};

function executaLogin(urlServidor, usuario, senha, inicialLogin) {
	localStorage.usuErro = "false";
	localStorage.usuarioInvalido = "false";
	localStorage.senhaInvalida = "false";

	console.log ("executando login");
	var resultado = "";
	$('.msg-sucesso, .msg-erro').remove();
	$(function(){
		$.ajax({
			url : "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/login?usuario=" + usuario,
			contentType : "application/json; charset=utf-8",
			async: false,
			dataType : 'json'
		})
	  	.done(function( data ) {
       		if (localStorage.device == "mobile"){
//       			alert("Login executado com sucesso!");		
       		}else{
       			console.log("Login executado com sucesso!");
       		};		
			if (data.usu.senha == senha){
				localStorage.usuario = usuario;
				localStorage.usuarioValido = usuario;
				localStorage.senha = senha;
				localStorage.nomeUsuario = data.usu.nome;
				localStorage.usuAdm = data.usu.administrador;
				localStorage.usuDistribuidor = data.usu.distribuidor;
				localStorage.usuId = data.usu.id;
				localStorage.setItem("usuarios", JSON.stringify(data));
				resultado = "true";
				localStorage.usuErro = "false";
				$(".cadastroUsuario").hide();
				$(".cadastroUsuario").prop('required',false);
				$('#configForm')
						.append(
								"<span class='msg-sucesso'>Configurações salvas com sucesso</span>");
				if (inicialLogin == "true"){
					document.location.replace("vistorias.html");
					inicialLogin = "false";
				};
			}else{
				$('#configForm')
						.append(
								"<span class='msg-erro'>Usuario ou senha invalido, corrija seus dados</span>");
				localStorage.senhaInvalida = "true";
				if (inicialLogin != "true"){
					document.location.replace("config.html");
				};
			};
	  	})
        .fail(function(data) {
			localStorage.usuario = usuario;
			localStorage.senha = senha;
			localStorage.usuario = usuario;
			
       		if (localStorage.device == "mobile"){
//       			alert("Não foi possível executar login.");		
       		}else{
    			console.log("Não foi possível executar login.");
       		};

			$('#configForm')
					.append(
							"<span class='msg-erro'>Usuario invalido, para incluir clique novamente</span>");
			$(".cadastroUsuario").show();
			localStorage.usuarioInvalido = "true";
			localStorage.usuErro = "true";
			$(".cadastroUsuario").prop('required',true);
			if (inicialLogin != "true"){
				document.location.replace("config.html");
			};
			resultado = "false";
			
        })
       	.always(function(data) {
       	});
   	});
	
	return resultado;
}

function incluiUsuario (usuario, senha, nomeUsuario) {
	var new_usuario = 
		'{' +
			  '"usu" : {' +
			    '"id" : "",' +
			    '"usuario" : "' + usuario + '",' +
			    '"nome" : "' + nomeUsuario + '",' +
			    '"senha" : "' + senha + '",' +
			    '"administrador" : "false",' +
			    '"distribuidor" : "false",' +
			    '"documento" : {' +
			      '"numero" : "' + usuario + '",' +
			      '"valor" : "CPF",' +
			      '"tipo" : [{' +
			          '"label" : "CPF",' +
			          '"mascara" : "xxx.xxx.xxx-xx"' +
			        '}, {' +
			          '"label" : "RG",' +
			          '"mascara" : "xxxxxxxxxx"' +
			        '}, {' +
			          '"label" : "Passaporte",' +
			          '"mascara" : "xxxxxxxxxx"' +
			        '}]' +
			    '}' +
			 '}' +
			'}';
	objJson = JSON.parse(new_usuario);
	$.ajax({
		type: "POST",
        url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/incluir/usuario",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJson)
	})
	.done(function( data ) {
		console.log ("inclusão usuario saiu por done");
	})
	.fail(function(data) {
		console.log ("inclusão usuario saiu por fail");
	})
	.always(function(data) {
		document.location.replace("vistorias.html");
	});	
}
function atualizaUsuario (usuario, senha, nomeUsuario) {
	var objJson = JSON.parse(localStorage.getItem("usuarios"));
	objJson.usu.nome = nomeUsuario;
	objJson.usu.senha = senha;
	objJson.usu.usuario = usuario;
	
	$.ajax({
		type: "POST",
        url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/atualizar/usuario",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        data : JSON.stringify(objJson),
	})
	 .done(function( data ) {
		 console.log ("atualiza usuario saiu por done - " + JSON.stringify(data));
	  })
     .fail(function(data) {
    	 console.log ("atualiza usuario saiu por fail - " + JSON.stringify(data));
     })
     .always(function(data) {
    	 console.log ("atualiza usuario saiu por always - " + JSON.stringify(data));
     });
};

