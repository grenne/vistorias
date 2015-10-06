/* Vistoria Detalhes */
$(document).ready(function() {   
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	console.log ("url" + url + " id:" + id);
	$(function(){
		$.ajax({
            url: "http://localhost:8080/vistorias/rest/documento?id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
	            localStorage.setItem("dadosSaved", JSON.stringify(data));
	        	$.each(data.vistoria.header, function(i, header) {
	        		montaLinhaCabecalho(header);
	        	});
				var panelLabelList = [];
				$.each(data.vistoria.panel, function(i, panel){
					var panelId = panel.label.replace(" ", "") + i;
					var panelLabel = panel.label;
					panelLabelList[i] = panel.label;
					inicioPanel(panelId, panelLabel, i, panel);
					$.each(panel.fields, function(z, item){
						montaCampos(i, panelId, z, item);
					});
					finalPanel(panelId, panelLabel, i, panel);
				});
			    iniciaSnapper();
			    iniciaAcoes(panelLabelList);        
				inicializaWindow();
				var text = localStorage.getItem("dadosSaved");
				obj = JSON.parse(text);
            }
		});
	});
	$( ".submitButton" ).bind( "click", function(event, ui) {
		var text = localStorage.getItem("dadosSaved");
		obj = JSON.parse(text);
		$.ajax({
            url: "http://localhost:8080/vistorias/rest/updatedocument?document=" + obj,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
            	console-log ("terminou atualização");
            }
		});
		$(window.document.location).attr('href','vistorias-lista.html');
	});	
});

function inicioPanel(panelId, panelLabel, i, panel) {
	$("#paineis").append(
	'<!-- ' + panel.label + ' -->' +			
	'<div id="panel-' + panelId + '">' +
		'<h3 class="ui-bar ui-bar-d ui-corner-all">' + panel.label + '</h3>' +
		'<div id="container-' + panelId + '" class=" ui-body ui-body-a ui-corner-all vistoria-detalhes">' +
			'<table id="table-' + panelId + '">'
	);
};

function montaCabecalho(vistoria) {
	$.each(vistoria.header, function(i, header) {
		console.log("entrou no each");
		montaLinhaCabecalho(vistoria.header);
	});
};
function montaLinhaCabecalho(header) {
	var linha = '' +  
				'<div class="cabecalho-dados">' +
				'<span class="detalhes-label">' + header.label + ': </span>' +
				'<span class="fun-turno">' + header.valor + '</span>' +
				'</div>';	
	$("#cabecalho").append(linha);
};
function finalPanel(panelId, panelLabel, i, panel) {
	$("#paineis").append(
			'</table>' +
		'</div>' +
		'<!-- ' + panel.label + ' -->' +
	'</div>'
	);
};

function montaCampos(i, panelId, z, item) {
	var labelId = item.label.replace( /\s/g, '' ) + z + "-" + i;
	var label = item.label;
	var labelRadioId = "";
	inicioCampo(panelId, label, labelId);

	if (item.tipo == 'input_texto') {
		$("#td-textinput-" + labelId).append(
                	'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value inteiro"/>'
		);
	}else if(item.tipo == 'input_inteiro') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value input-number inteiro"/>'
		);
	}else if(item.tipo == 'input_decimal') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value input-number decimal"/>'
		);
	}else if(item.tipo == 'input_data') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="__/__/____" class="input-value input-number data"/>'
		);
	}else if(item.tipo == 'input_cpf') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" placeholder="___.___.___-__" class="input-value input-number cpf"/>'
		);
	}else if(item.tipo == 'input_cnpj') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___.___.___.___/__" class="input-value input-number cnpj"/>'
		);
	}else if(item.tipo == 'input_celular') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)_____.____" class="input-value input-number celular"/>'
		);
	}else if(item.tipo == 'input_telefone') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="(___)____.____" class="input-value input-number telefone"/>'
		);
	}else if(item.tipo == 'input_placa') {
		$("#td-textinput-" + labelId).append(
					'<input type="text" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '"  placeholder="___-____" class="input-value input-number placa"/>'
		);
	}else if(item.tipo == 'input_checkbox') {
		$("#td-textinput-" + labelId).append(
					'<input type="checkbox" name="' + labelId + '" id="' + labelId + '" value="' + item.valor + '" class="input-value"/>'
		);
	}else if(item.tipo == 'input_radio') {
		$("#td-textinput-" + labelId).append(
					'<fieldset id="' + labelId + '" data-role="controlgroup" data-mini="true" data-type="horizontal" class="controlgroup">'
			);
		$.each(item.opcoes, function(w, item_radio){
			var labelRadioId = item_radio.label.replace( /\s/g, '' ) + z;
			var textChecked ="";
			if (item_radio.label == item.valor) {
				textChecked = 'checked="checked"';
			};
			$("#" + labelId).append(
						'<input type="radio" class="ui-radio" name="' + labelId + '" id="' + labelRadioId + '"  value="' + item_radio.label + '" ' + textChecked + ' class="input-value" />' + 
						'<label for="' + labelRadioId + '">' + item_radio.label + '</label>' 
			);
			$("#" + labelRadioId).click(function() {
				var text = localStorage.getItem("dadosSaved");
				obj = JSON.parse(text);
				obj.panel[i].fields[z].valor =  $("#" + labelRadioId).val();
		        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
				var text1 = localStorage.getItem("dadosSaved");
				obj1 = JSON.parse(text1);
			});
		});
		$("#td-textinput-" + labelId).append(
					'</fieldset>'
		);
	}else if(item.tipo == 'input_select') {
		$("#td-textinput-" + labelId).append(
						'<div id="' + labelId + '" data-role="fieldcontain" class="fieldcontain" >' +
							'<select name="' + labelId + '" id="select-' + labelId + '" data-mini="true">'
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
			var text = localStorage.getItem("dadosSaved");
			obj = JSON.parse(text);
			obj.panel[i].fields[z].valor =  $("#select-" + labelId).val();
	        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
			var text1 = localStorage.getItem("dadosSaved");
			obj1 = JSON.parse(text1);
		});
//		$("#table-" + panelId).append(
//						'	</select>' +
//						'</div>'
//		);
	};
	// salva conteudo
	$("#" + labelId).blur(function() {
		var text = localStorage.getItem("dadosSaved");
		obj = JSON.parse(text);
		if (obj.vistoria.panel[i].fields[z].tipo != "input_texto") {
			obj.vistoria.panel[i].fields[z].valor =  $("#" + labelId).val().replace(/[^a-z0-9]+/gi,'');
		}else{
			obj.vistoria.panel[i].fields[z].valor =  $("#" + labelId).val();
		};
        localStorage.setItem("dadosSaved", JSON.stringify(obj));    
		var text1 = localStorage.getItem("dadosSaved");
		obj1 = JSON.parse(text1);
	});

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
