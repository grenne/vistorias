package com.TKiDe.services;

import org.codehaus.jackson.annotate.JsonCreator;

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
		public String tipo;
		public String usuarioAtual;
		public String modelo;
		public String situacao;
		public Usuarios usuarios[];
		public Header header[];
		public Panel panel[];


		public Documento() {

		}

		@JsonCreator
		public Documento(String id, String tipo, String usuarioAtual, String modelo, String situacao,  Usuarios[] usuarios, Header[] header, Panel[] panel) {
			this.id = id;
			this.tipo = tipo;
			this.usuarioAtual = usuarioAtual;
			this.modelo = modelo;
			this.situacao = situacao;
			this.usuarios = usuarios;
			this.header = header;
			this.panel = panel;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getId() {
			return this.id;
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
			return new StringBuffer(" Id : ").append(this.id).append(" Usuario : ").append(this.usuarios)
					.append(" Header : ").append(this.header).append(" Panel : ").append(this.panel).toString();
		}



		public static final class Usuarios {
			public String codigo;

			public Usuarios() {

			}

			@JsonCreator
			public Usuarios(String codigo) {
				this.codigo = codigo;
			}

			public void setCodigo(String codigo) {
				this.codigo = codigo;
			}

			public String getCodigo() {
				return this.codigo;
			}
		}

		public static final class Header {
			public String modelo;
			public String label;
			public String valor;
			public Opcoes[] opcoes;

			public Header() {

			}

			@JsonCreator
			public Header(String label,String modelo, String valor, Opcoes[] opcoes) {
				this.modelo = modelo;
				this.label = label;
				this.valor = valor;
				this.opcoes = opcoes;
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