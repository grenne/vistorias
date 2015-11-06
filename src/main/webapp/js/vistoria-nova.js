/* Documento Detalhes */
$(document).ready(function() {   
    executaLogin(localStorage.urlServidor, localStorage.cpfUsuario, localStorage.senha);
	var tipoDevice = mobileDetect();
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	console.log ("url" + url + " id:" + id);
	$(function(){
		$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/obter?id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
	            localStorage.setItem("dadosSaved", JSON.stringify(data));
        		montaCabecalho(data.documento.header);
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
						montaCampos(i, panelId, z, item, "detalhes");
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
		$(window.document.location).attr('href','modelo-lista.html?vistoria-nova.html');
	});	
});

function inicioPanel(panelId, panelLabel, i, panel) {
	var heightDetalhes = $(window).height() - 135 - $("#cabecalho-detalhes").height();
	var montaScroll = 'style="overflow: scroll; width: 200px; height:' + heightDetalhes + 'px;"';
	console.log ("height detalhes:" + heightDetalhes);
	$("#paineis").append(
	'<!-- ' + panel.label + ' -->' +			
	'<div id="panel-' + panelId + '" ' + montaScroll + '">' +
		'<h3 class="ui-bar ui-bar-d ui-corner-all">' + panel.label + '</h3>' +
		'<div id="container-' + panelId + '" class=" ui-body ui-body-a ui-corner-all vistoria-detalhes"' +
		'>' +
			'<table id="table-' + panelId + '">'
	);
	
};

function montaCabecalho(header) {
	$.each(header, 
			function(i, header) {
		console.log("entrou no each");
		var labelId = header.label.replace( /\s/g, '' ) + 1 + "-" + i;
		$("#table-cabecalho").append(
				'<tr>' +
					'<td for="textinput-' + labelId + '" class="ui-input-text">' + header.label + '</td>' +
					'<td id="td-textinput-' + labelId + '">'
		);
		montaCampos(i, labelId, 1, header, "cabecalho")
		$("#table-cabecalho").append(
				'</td>' +
			'</tr>'					
		);
	});
};

function finalPanel(panelId, panelLabel, i, panel) {
	$("#paineis").append(
			'</table>' +
		'</div>' +
		'<!-- ' + panel.label + ' -->' +
	'</div>'
	);
};

function montaCampos(i, panelId, z, item, origem) {
	var labelId = item.label.replace( /\s/g, '' ) + z + "-" + i;
	var label = item.label;
	var labelRadioId = "";
	inicioCampo(panelId, label, labelId);

	if (item.modelo == 'input_texto') {
		$("#td-textinput-" + labelId).append(
                	'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value" required/>'
		);
	}else if(item.modelo == 'input_inteiro') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value input-number inteiro" required/>'
		);
	}else if(item.modelo == 'input_decimal') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value input-number decimal" required/>'
		);
	}else if(item.modelo == 'input_data') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="__/__/____" class="input-value input-number data" required/>'
		);
	}else if(item.modelo == 'input_cpf') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" placeholder="___.___.___-__" class="input-value input-number cpf" required/>'
		);
	}else if(item.modelo == 'input_cnpj') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___.___.___.___/__" class="input-value input-number cnpj" required/>'
		);
	}else if(item.modelo == 'input_celular') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)_____.____" class="input-value input-number celular" required/>'
		);
	}else if(item.modelo == 'input_telefone') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)____.____" class="input-value input-number telefone" required/>'
		);
	}else if(item.modelo == 'input_placa') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___-____" class="input-value input-number placa" required/>'
		);
	}else if(item.modelo == 'input_checkbox') {
		var textChecked ="";
		if (item.valor != "") {
			textChecked = 'checked="checked"';
		};
		$("#td-textinput-" + labelId).append(
					'<input type="checkbox" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value" ' + textChecked + ' required/>'
		);
		$("#" + labelId).click(function() {
			$("#" + labelId).val("");
			if($(this).is(':checked')) {
				$("#" + labelId).val("checked");
			};
			obj = JSON.parse(localStorage.getItem("dadosSaved"));
			obj.documento.panel[i].fields[z].valor =  $("#" + labelId).val();
	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		});
	}else if(item.modelo == 'input_radio') {
		var itemChecked ="";
		$("#td-textinput-" + labelId).append(
				'<fieldset id="' + labelId + '" data-role="controlgroup" data-mini="true" class="controlgroup">'
			);
		$.each(item.opcoes, function(w, item_radio){
			var labelRadioId = item_radio.label.replace( /\s/g, '' ) + z;
			var textChecked ="";
			$("#" + labelId).append(
						'<input type="radio" name="' + labelId + '" id="' + labelRadioId + '"  value="' + item_radio.label + '" class="input-value" ' + textChecked +  ' required/>' + 
						'<label for="' + labelRadioId + '">' + item_radio.label + '</label>' 
			);
			$("#" + labelRadioId).checkboxradio().checkboxradio("refresh");
			if (item_radio.label == item.valor) {
				itemChecked = labelRadioId;
				$("#" + labelRadioId).attr("checked",true);
			};
			$("#" + labelRadioId).click(function() {
				obj = JSON.parse(localStorage.getItem("dadosSaved"));
				obj.documento.panel[i].fields[z].valor =  $("#" + labelRadioId).val();
		        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
			});
			$("#" + itemChecked).attr("checked", true).checkboxradio("refresh");
		});
		$("#td-textinput-" + labelId).append(
					'</fieldset>'
		);
	}else if(item.modelo == 'input_select') {
		$("#td-textinput-" + labelId).append(
						'<div id="' + labelId + '" data-role="fieldcontain" class="fieldcontain" >' +
							'<select name="' + labelId + '" id="select-' + labelId + '" data-mini="true" required>'
			);
		$("#select-" + labelId).append(
    			'<option value="">Selecionar</option>' 
		);
		$.each(item.opcoes, function(w, item_select){
			var textSelected ="";
			if (item_select.label == item.valor) {
				textSelected = 'selected';
			};
			$("#select-" + labelId).append(
			        			'<option value="' + item_select.label + '" ' + textSelected + '>' + item_select.label + '</option>' 
			);
		});
		$("#select-" + labelId).click(function() {
			if($("#select-" + labelId).val() == "Selecionar"){
				$("#select-" + labelId).val("");
			};
			obj = JSON.parse(localStorage.getItem("dadosSaved"));
			obj.documento.panel[i].fields[z].valor =  $("#select-" + labelId).val();
	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		});

//		$("#table-" + panelId).append(
//						'	</select>' +
//						'</div>'
//		);
		
	};
	// salva conteudo
	if (origem == "detalhes"){
		$("#" + labelId).blur(function() {
			obj = JSON.parse(localStorage.getItem("dadosSaved"));
			console.log ("Cantes:" + obj.documento.panel[i].fields[z].valor);
			if (obj.documento.panel[i].fields[z].tipo != "input_texto") {
				obj.documento.panel[i].fields[z].valor =  $("#" + labelId).val().replace(/^\s+|\s+$/g,"");
			}else{
				obj.documento.panel[i].fields[z].valor =  $("#" + labelId).val();
			};
			console.log ("depois:" + obj.documento.panel[i].fields[z].valor);
	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		});
	}else{
		$("#" + labelId).blur(function() {
			obj = JSON.parse(localStorage.getItem("dadosSaved"));
			console.log ("CAB antes:" + obj.documento.header[i].valor);
			if (obj.documento.header[i].tipo != "input_texto") {
				obj.documento.header[i].valor =  $("#" + labelId).val().replace(/^\s+|\s+$/g,"");
			}else{
				obj.documento.header[i].valor =  $("#" + labelId).val();
			};
			console.log ("CAB depois:" + obj.documento.header[i].valor);
	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		});
	};

	finalCampo(panelId, label, labelId);
};

function inicioCampo(panelId, label, labelId) {
	$("#table-" + panelId).append(
			'<tr>' +
				'<td for="textinput-' + labelId + '" class="ui-input-text">' + label + '</td>' +
				'<td id="td-textinput-' + labelId + '">'
	);
};

function finalCampo(panelId, label, labelId) {
	$("#table-" + panelId).append(
				'</td>' +
			'</tr>'					
	);
};

function inicializaWindow() {
	// formata campos texto
	$('input[type="text"]').textinput().trigger('create');
	// formata campos select
	$('.fieldcontain').fieldcontain().trigger('create');
	// formata mascaras
	$('.mesano').mask('00/0000');
	$('.data').mask('00/00/0000');
	$('.cpf').mask('000.000.000-00');
	$('.cnpj').mask('000.000.000.000/0000');
	$('.celular').mask('(000)00000.0000');
	$('.telefone').mask('(000)0000.0000');
	$('.inteiro').mask('000.000.000.000');
	$('.decimal').mask('000.000.000.000,00');
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

function mobileDetect() {
	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
			.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
					.test(navigator.userAgent.substr(0, 4))) {
		return true;
	} else {
		return false;
	};
};
