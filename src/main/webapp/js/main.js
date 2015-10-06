var restPath = "/rest";
var loginPath = "/login";
var funcionarioDetalhesPath = "/funcionario";
var funcionarioNomePath = "/funcionario/nome";
var fotoDoFuncionarioPath = "/funcionario/foto";
var listaFuncionariosDoGestorPath = "/funcionario/lista/doGestor";
var feriasPath = "/ferias";
var feriasHistoricoPath = "/ferias/historico";
var feriasProgramacaoPath = "/ferias/programacao";
var feriasColetivasPath = "/ferias/coletivas";
var holeritePath = "/ficha/holerite";
var processamentosDoAnoPath = "/ficha/processamentosDoAno";
var anosComProcessamentoPath = "/ficha/anosComProcessamento";
var dadosPessoaisPath = "/pessoa";
var excecoesPath = "/ponto/excecoes";
var motivosDeAbonoPath = "/ponto/motivosDeAbono";
var motivosDeAutorizacaoPath = "/ponto/motivosDeAutorizacao";
var tarefasDoWFPath = "/workflow/tarefas";
var completaTarefasDoWFPath = "/workflow/tarefas/completa";

$(document).on('pagebeforecreate', function () {
    colocaPainelEsquerda();
});

$(document).ready(function () {     
    carregaConfiguracao();
    
    escondeAcoesDoGestor();
});

function escondeAcoesDoGestor() {
    if(window.eGestor === 'false') {
        $('.acao-gestor').remove();
    }   
}

function carregaConfiguracao() {
    var configPag = "config.html";
    
    // configuração não está persistida no aparelho ou está incompleta, 
    // redireciona para página de configuração
//    if(localStorage.urlServidor == null 
//        || localStorage.idFun == null
//        || localStorage.idPes == null
//        || localStorage.eGestor == null) {
//    	
//        if(window.location.pathname.indexOf(configPag) == -1) {
//        	document.location.href = configPag;
//        }   
//        
//    } else {
//        window.urlServidor = localStorage.urlServidor;
//        window.idFunLogado = localStorage.idFun;
//        window.idPesLogada = localStorage.idPes;
//        window.eGestor = localStorage.eGestor;
//    }
}


function carregando(mostraOuEsconde, timeout) {
    var timeout = timeout ? timeout : 1;
    
    setTimeout(function(){
        $.mobile.loading(mostraOuEsconde);
    }, timeout); 
}

//function getParametroURL(sParam)
//{
//    var sPageURL = window.location.search.substring(1);
//    var sURLVariables = sPageURL.split('&');
//    for (var i = 0; i < sURLVariables.length; i++)
//    {
//        var sParameterName = sURLVariables[i].split('=');
//        if (sParameterName[0] == sParam)
//        {
//            return sParameterName[1];
//        }
//    }
//}

function colocaPainelEsquerda() {
    var painelEsquerdaHtml =  '' + 
        '<div ' +
            'data-role="panel"' +
            'data-position-fixed="true" ' +
            'data-display="push" ' +
            'data-theme="e" ' +
            'id="nav-panel">' +
            '<ul data-role="listview">' +
	            '<li data-role="list-divider" id="menu-correcao-iphone-5"></li>' +            
                '<li data-icon="delete"><a ' +
                    'href="#"' +
                    'data-rel="close">Fechar</a></li>' +
                '<li><a ' +
                    'href="vistorias.html"' +
                   // 'rel="external"' +
                    'data-transition="flip">Página inicial</a></li>' +
                '<li><a ' +
                    'href="vistorias.html"' +
                    'rel="external"' +
                    'data-transition="flip">Meus Pagamentos</a></li>' +
                '<li class="acao-gestor"><a ' +
                    'href="vistorias.html"' +
                    'rel="external"' +
                    'data-transition="flip">Minha Equipe</a></li>' +
                '<li class="acao-gestor"><a ' +
                    'href="vistorias.html"' +
                    'rel="external"' +
                    'data-transition="flip">Tratamento do Ponto</a></li>' +
                '<li class="acao-gestor"><a ' +
                    'href="vistorias.html"' +
                    'rel="external"' +
                    'data-transition="flip">Aprovação de Workflow</a></li>' +
                '<li><a ' +
                    'href="config.html"' +
                    'rel="external"' +
                    'data-transition="flip">Configurações</a></li>' +
            '</ul>' +
        '</div>';
    
        $('div:jqmData(role="page")').append(painelEsquerdaHtml);
}


(function( $ ){
    $.fn.carregando = function(terminouCarregamento) {
        
        return this.each(function () {
            if(terminouCarregamento) {
                $(this).removeClass('div-carregando');
                $(this).find('.loader-div').remove();
            } else {
                $(this).append('<img src="css/images/ajax-loader.gif" class="loader-div"/>');
                $(this).addClass('div-carregando');
            }
        });
    };
    
    /**
     * Retorna data escrita por extenso. Ex.: domingo, 02 de fevereiro de 2014
     */
    $.formataDataPorExtenso = function(dataEmMils) {
    	if(!dataEmMils) {
    		return '';
    	}
    	
    	var options = {
    		    year: "numeric", month: "long", day: "2-digit", weekday: "long"
    		};
    	
    	var data = new Date(dataEmMils);
    	
    	return data.toLocaleDateString("pt-BR", options);
    } 
    
    /**
     * Retorna data formatada dd/MM/yyyy. Ex.: 02/04/2014
     */
    $.formataData = function(dataEmMils) {   
    	if(!dataEmMils) {
    		return '';
    	}
    	
    	var options = {
    		    year: "numeric", month: "2-digit", day: "2-digit"
    		};
    	
    	var data = new Date(dataEmMils);
    	
    	return data.toLocaleDateString("pt-BR", options);
    }    
    
    /**
     * Retorna horário formatado [hh]h[mm]. Ex.: 09h45
     */
    $.formataHora = function(dataEmMils) {    	
    	if(!dataEmMils) {
    		return '';
    	}
    	
    	var data = new Date(dataEmMils);
    	var horas = data.getHours().toString();
    	var minutos = data.getMinutes().toString();
    	
    	return (horas.length < 2 ? '0' : '') + horas + "h" + (minutos.length < 2 ? '0' : '') + minutos;
    }    
    
    $.basicAuth = function () {
        var decodedStr = localStorage.cpfUsuario + ':' + localStorage.senha;
        var encodedStr = btoa(decodedStr);
        return "Basic " + encodedStr;
    }
    
    $.ajaxPop = function (settings) {
        $.ajax({
            url: settings.url,
            beforeSend: function (xhr) {                
                if(settings.autenticacao) {
                    xhr.setRequestHeader ("Authorization", $.basicAuth());
                }
                if(settings.carregaDiv) {
                    settings.carregaDiv.carregando();
                } else if(settings.carregaGlobal) {
                    $('.ui-content').hide();
                    carregando("show");    
                }
            }
        }).done(function(data) {       
            settings.funcaoCallback(data);
            
            if(settings.carregaDiv) {
                settings.carregaDiv.carregando(true);
            } else if(settings.carregaGlobal) {
                carregando("hide", 200);    
            }
            
        }).error(function () {
            alert(settings.msgErro);
            carregando("hide", 200); 
        });        
    }
    
    $.parametroUrl = function(nome){
        var results = new RegExp('[\\?&]' + nome + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        } else {
           return results[1] || 0;
        }
    }
    
    /**
     * Transforma um elemento em um botão de selecionar/limpar todos os checkbox da tela.
     * 
     */
    $.fn.selecionaTodos = function() { 
    	var toggle$ = $(this);
    	
    	var textoSelecionar = "Selecionar todos";
    	var textoLimpar = "Limpar todos";
    	
    	toggle$.html(textoSelecionar).addClass('ui-btn-icon-left ui-icon-check');
    	
    	toggle$.click(function () {
    		if(toggle$.data('selecionado')) {
    			$(':checkbox:enabled:visible').removeProp('checked').checkboxradio('refresh');
    			
    			toggle$.data('selecionado', false).html(textoSelecionar).removeClass('ui-icon-delete').addClass('ui-icon-check');
    		} else {
    			$(':checkbox:enabled:visible').prop('checked', 'true').checkboxradio('refresh');
    			
    			toggle$.data('selecionado', true).html(textoLimpar).removeClass('ui-icon-check').addClass('ui-icon-delete');
    		}
    	});    	
    	
    }
    
})

function inicializaWindow() {	
	$('input[type="text"]').textinput().trigger('create');
	$('[type=checkbox]').checkboxradio().trigger('create');
	$('.controlgroup').controlgroup().trigger('create');
	$('.fieldcontain').fieldcontain().trigger('create');
	$('.mesano').mask('00/0000');
	$('.data').mask('00/00/0000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('000.000.000.000/0000');
	$('.celular').mask('(000)00000.0000');
	$('.telefone').mask('(000)0000.0000');
	$('.inteiro').mask('000.000.000.000');
	$('.decimal').mask('000.000.000.000,00');
	$('.placa').mask('XXX-0000');
	$('.placa').mask('XXX-0000', {translation:  {'X': {pattern: /[A-Z]/}}});
};

/* Utilizada biblioteca Swipe.js: http://swipejs.com/ */
function iniciaAcoes(panelLabelList) {
    var elem = document.getElementById('swipe-acoes');
    window.mySwipe = Swipe(elem, {
      startSlide: 0,
      // auto: 3000,
      // continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      callback: function(index, element) {
            $('.titulo-pagina').html(panelLabelList[index]); 
      }
      // transitionEnd: function(index, element) {}
    });
    
    $(document).keydown(function(e){
        if (e.keyCode == 39) { 
           window.mySwipe.next();
           return false;
        } else if (e.keyCode == 37) { 
           window.mySwipe.prev();
           return false;
        }
    }); 
    
}

/* Utilizada biblioteca Snap.js: https://github.com/jakiestfu/Snap.js/ */
function iniciaSnapper() {
    var snapper = new Snap({
        element: document.getElementById('conteudo-geral'),
        dragger: document.getElementById('cabecalho-detalhes')
    });  
    
    snapper.on('animated', function() {
        var estado = snapper.state().state;

    });
    
    $('.snap-drawer').on('click', '.fecha-snapper', function () {
        snapper.close();
    });
};

( jQuery );