$(document).ready(function() {
	var urlInput$ = $('#urlTextInput');
	var cpfInput$ = $('#cpfTextInput');
	var senhaInput$ = $('#senhaPassInput');

	urlInput$.val(localStorage.urlServidor);
	cpfInput$.val(localStorage.cpfUsuario);
	senhaInput$.val(localStorage.senha);

	$('#cpfTextInput').mask('000.000.000-00', {
		reverse : true
	});

	$("#configForm").submit(function(e) {
		e.preventDefault();
		salvaConfiguracao(this);
	});
	
	$("#preencheBaseDemo").click(function () { 
		utilizarBaseDeDemonstracao();
	});

});

function utilizarBaseDeDemonstracao() {
	var urlInput$ = $('#urlTextInput');
	var cpfInput$ = $('#cpfTextInput');
	var senhaInput$ = $('#senhaPassInput');
	
	var urlDemo = "http://54.225.154.23:1080/populisII-web";
	var cpfDemo = "111.111.111-11";
	var senhaDemo = "teste";

	console.info("Preenchendo formulário com dados da base de demonstração");
	urlInput$.val(urlDemo);
	cpfInput$.val(cpfDemo);
	senhaInput$.val(senhaDemo);
}

function salvaConfiguracao(formulario) {
	var $configForm = $(formulario);

	if (!$configForm[0].checkValidity()) {
		$('#salva-configuracao').click();
	}

	var urlServidor = $('#urlTextInput').val();
	var cpfUsuario = $('#cpfTextInput').val();
	var senha = $('#senhaPassInput').val();

	executaLogin(urlServidor, cpfUsuario, senha);
}

function executaLogin(urlServidor, cpfUsuario, senha) {
	var metodoLogin = "/rest/usuario/login";

	cpfUsuario = cpfUsuario.replace(new RegExp(/[^0-9]/g), '');

	var urlFinal = urlServidor + metodoLogin + "?cpf=" + cpfUsuario + "&senha="
			+ senha;

	var resultado;

	$('.msg-sucesso, .msg-erro').remove();

	$
			.ajax(urlFinal)
			.done(
					function(usu) {
						console.info("Login executado com sucesso!");
						localStorage.urlServidor = urlServidor;
						localStorage.cpfUsuario = cpfUsuario;
						localStorage.senha = senha;

						localStorage.idFun = usu.idFuncionario;
						localStorage.idPes = usu.idPessoa;
						localStorage.eGestor = usu.gestor;

						$('#configForm')
								.append(
										"<span class='msg-sucesso'>Configurações salvas com sucesso</span>");
					})
			.error(
					function() {
						console.info("Não foi possível executar login.");
						$('#configForm')
								.append(
										"<span class='msg-erro'>Não foi possível realizar o login com as informações digitadas</span>");
					});

	return resultado;
}