package com.TKiDe.services;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonProperty;

public class Document {

	public Documento documento;

	public Document() {

	}

	public Document(Documento documento) {
		this.documento = documento;
	}

	public void setDocumento( Documento documento) {
		this.documento = documento;
	}

	public Documento getDocumento() {
		return this.documento;
	}

	@Override
	public String toString() {
		return new StringBuffer(" Documento : ").append(this.documento).toString();
	}

	public static final class Documento {

		public String id;
		public String usuario;
		public Header header[];
		public Panel panel[];

		public Documento() {

		}

		@JsonCreator
		public Documento(String id, String usuario, Header[] header, Panel[] panel) {
			this.id = id;
			this.usuario = usuario;
			this.header = header;
			this.panel = panel;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getId() {
			return this.id;
		}

		public void setUsuario(String usuario) {
			this.usuario = usuario;
		}

		public String getUsuario() {
			return this.usuario;
		}

		public void setHeader(Header[] header) {
			this.header = header;
		}

		public Header[] getHeader() {
			return this.header;
		}

		public void setPanel(Panel[] panel) {
			this.panel = panel;
		}

		public Panel[] getPanel() {
			return this.panel;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Id : ").append(this.id).append(" Usuario : ").append(this.usuario)
					.append(" Header : ").append(this.header).append(" Panel : ").append(this.panel).toString();
		}

		public static final class Header {
			public String label;
			public String valor;

			public Header() {

			}

			@JsonCreator
			public Header(String label, String valor) {
				this.label = label;
				this.valor = valor;
			}

			public void setLabel(String label) {
				this.label = label;
			}

			public String getLabel() {
				return this.label;
			}

			public void setValor(String valor) {
				this.valor = valor;
			}

			public String getValor() {
				return this.valor;
			}
		}

		public static final class Panel {
			public String modelo;
			public String label;
			public Field fields[];

			public Panel() {

			}

			@JsonCreator
			public Panel( String modelo,  String label,   Field[] fields) {
				this.modelo = modelo;
				this.label = label;
				this.fields = fields;
			}

			public void setModelo(String modelo) {
				this.modelo = modelo;
			}

			public String getModelo() {
				return this.modelo;
			}

			public void setLabel(String label) {
				this.label = label;
			}

			public String getLabel() {
				return this.label;
			}

			public void setFields(Field[] fields) {
				this.fields = fields;
			}

			public Field[] getFields() {
				return this.fields;
			}
		    
            public static final class Field {
                public String modelo;
                public String label;
                public String valor;
				public Opcoes[] opcoes;

                public Field() {

    			}
       
                @JsonCreator
                public Field(String modelo,  String label, String valor, Opcoes[] opcoes){
                    this.modelo = modelo;
                    this.label = label;
                    this.valor = valor;
                    this.opcoes = opcoes;
                }

    			public void setModelo(String modelo) {
    				this.modelo = modelo;
    			}

    			public String getModelo() {
    				return this.modelo;
    			}

    			public void setLabel(String label) {
    				this.label = label;
    			}

    			public String getLabel() {
    				return this.label;
    			}

    			public void setValor(String valor) {
    				this.valor = valor;
    			}

    			public String getValor() {
    				return this.valor;
    			}

    			public void setOpcoes(Opcoes[] opcoes) {
    				this.opcoes = opcoes;
    			}

    			public Opcoes[] getOpcoes() {
    				return this.opcoes;
    			}

    			public static final class Opcoes {
                    public String label;
           

                    public Opcoes() {

        			}

                    @JsonCreator
                    public Opcoes(String label){
                        this.label = label;
                    }

        			public void setLabel(String label) {
        				this.label = label;
        			}

        			public String getLabel() {
        				return this.label;
        			}
                }
            }

		}
	}
}