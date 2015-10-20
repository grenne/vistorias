package com.TKiDe.services;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonProperty;

public final class Document2 {
    public Vistoria vistoria;
    
    @JsonCreator
    public Document2 () {
		
	};
	
    @JsonCreator
    public Document2(@JsonProperty("vistoria") Vistoria vistoria){
        this.vistoria = vistoria;
    }

    public static final class Vistoria {

    	public final String id;
        public final String usuAtual;
        public final Header header[];
        public final Panel panel[];


    	@JsonCreator
        public Vistoria(@JsonProperty("id") String id, @JsonProperty("usuAtual") String usuAtual, @JsonProperty("header") Header[] header, @JsonProperty("panel") Panel[] panel){
            this.id = id;
            this.usuAtual = usuAtual;
            this.header = header;
            this.panel = panel;
        }
    	

    	public static final class Header {
            public final String label;
            public final String valor;
    
            @JsonCreator
            public Header(@JsonProperty("label") String label, @JsonProperty("valor") String valor){
                this.label = label;
                this.valor = valor;
            }
        }

        public static final class Panel {
            public final String tipo;
            public final String label;
            public final Field fields[];
    
            @JsonCreator
            public Panel(@JsonProperty("tipo") String tipo, @JsonProperty("label") String label, @JsonProperty("fields") Field[] fields){
                this.tipo = tipo;
                this.label = label;
                this.fields = fields;
            }
    
            public static final class Field {
                public final String tipo;
                public final String label;
                public final String valor;
        
                @JsonCreator
                public Field(@JsonProperty("tipo") String tipo, @JsonProperty("label") String label, @JsonProperty("valor") String valor){
                    this.tipo = tipo;
                    this.label = label;
                    this.valor = valor;
                }
            }
        }
    }
}
