package com.TKiDe.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@Singleton
// @Lock(LockType.READ)
@Path("/documento")
public class Documentos {	

		private final String UPLOADED_FILE_PATH = "C:/jboss/standalone/deployments/vistorias.war/recursos/";
		
		@POST
		@Path("/upload")
		@Consumes("multipart/form-data")
		public Response uploadFile(MultipartFormDataInput input, @QueryParam("prefix") String prefix) {
			String fileName = "";
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
			List<InputPart> inputParts = uploadForm.get("uploadedFile");
			for (InputPart inputPart : inputParts) {

				try {

					MultivaluedMap<String, String> header = inputPart.getHeaders();
					fileName = prefix + "_" + getFileName(header);

					//convert the uploaded file to inputstream
					InputStream inputStream = inputPart.getBody(InputStream.class,null);

					byte [] bytes = IOUtils.toByteArray(inputStream);
					
					//constructs upload file path
					fileName = UPLOADED_FILE_PATH + fileName;
					
					writeFile(bytes,fileName);
					
					System.out.println("Done");

				} catch (IOException e) {
					e.printStackTrace();
				}

			}

			return Response.status(200)
					.entity("uploadFile is called, Uploaded file name : " + fileName).build();

		}

		/**
		 * header sample
		 * {
		 * 		Content-Type=[image/png], 
		 * 		Content-Disposition=[form-data; name="file"; filename="filename.extension"]
		 * }
		 **/
		//get uploaded filename, is there a easy way in RESTEasy?
		private String getFileName(MultivaluedMap<String, String> header) {

			String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
			
			for (String filename : contentDisposition) {
				if ((filename.trim().startsWith("filename"))) {

					String[] name = filename.split("=");
					
					String finalFileName = name[1].trim().replaceAll("\"", "");
					return finalFileName;
				}
			}
			return "unknown";
		}

		//save to somewhere
		private void writeFile(byte[] content, String filename) throws IOException {

			File file = new File(filename);

			if (!file.exists()) {
				file.createNewFile();
			}

			FileOutputStream fop = new FileOutputStream(file);

			fop.write(content);
			fop.flush();
			fop.close();

		}

	@Path("/login")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject login(@QueryParam("usuario") String usuario) throws UnknownHostException, MongoException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("usuarios");
		BasicDBObject setUsu = new BasicDBObject();
		setUsu.put("usu.usuario",usuario);
		DBObject cursor = collection.findOne(setUsu);
		JSONObject documento = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("usu");
		documento.put("usu", obj);
		mongo.close();
		return documento;
	};
	@Path("/incluir/usuario")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String IncluirUsuario(Usuario usuario)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("usuarios");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(usuario);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			mapJson = mapper.readValue(jsonDocumento, HashMap.class);
			JSONObject documento = new JSONObject();
			documento.putAll(mapJson);
			DBObject insert = new BasicDBObject(documento);
			collection.insert(insert);
			//
			// 			atualiza o id interno até eu descobrir como não precisar dele
			//
			usuario.usu.id = insert.get("_id").toString();
			ObjectId _id = new ObjectId(insert.get("_id").toString());
			jsonDocumento = gson.toJson(usuario);
			mapJson = mapper.readValue(jsonDocumento, HashMap.class);
			documento.putAll(mapJson);
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
			BasicDBObject searchQuery = new BasicDBObject("_id",_id);
			DBObject cursor = collection.findAndModify(searchQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
			mongo.close();
			return insert.get("_id").toString();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			System.out.println("UnknownHostException");
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			System.out.println("MongoException");
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			System.out.println("JsonParseException");
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			System.out.println("JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("IOException");
			e.printStackTrace();
		}
		return "fail";
		
	};
	@Path("/atualizar/usuario")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String AtualizarDocumento(Usuario usuario) throws MongoException, JsonParseException, JsonMappingException, IOException {
		ObjectId _id = new ObjectId(usuario.usu.id.toString());
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("usuarios");
		Gson gson = new Gson();
		String jsonDocumento = gson.toJson(usuario);
		Map<String,String> mapJson = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		mapJson = mapper.readValue(jsonDocumento, HashMap.class);
		JSONObject documento = new JSONObject();
		documento.putAll(mapJson);
		BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
		DBObject cursor = collection.findAndModify(searchQuery,
                null,
                null,
                false,
                update,
                true,
                false);
		mongo.close();
		return cursor.get("_id").toString();
	};


	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterLista(@QueryParam("usuario") String usuario, @QueryParam("queryUsuario") String queryUsuario, @QueryParam("situacao") String situacao ) throws UnknownHostException, MongoException, ParseException {

		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put("documento.tipo", "dadosvistoria");
//		setQuery.append("documento.situacao", situacao);
		String teste = "documento.usuarios.codigo";
		setQuery.append(queryUsuario, usuario);
		DBCollection collection = db.getCollection("documentos");
		DBCursor cursor = collection.find(setQuery);
		cursor.sort(new BasicDBObject("documento.header[0].valor", 1));
		JSONArray documentos = new JSONArray();
		
		while (((Iterator<DBObject>) cursor).hasNext()) {
			JSONObject jsonObject; 
			JSONParser parser = new JSONParser(); 
			BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
			String _id = obj.getString("_id");
			String documento = obj.getString("documento");
			jsonObject = (JSONObject) parser.parse(documento);
			JSONArray header = (JSONArray) jsonObject.get("header");
			JSONObject jsonDocumento = new JSONObject();
			jsonDocumento.put("_id", _id);
			jsonDocumento.put("header", header);
			documentos.add(jsonDocumento);
		};
		mongo.close();
		return documentos;
	};
	
	@Path("/modelos")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterModelos(@QueryParam("tipoLista") String tipo) throws UnknownHostException, MongoException, ParseException {

		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put("documento.tipo", "modelovistoria");
		if(tipo.equals("validos")){
			setQuery.put("documento.situacao", "valido");	
		};
		DBCollection collection = db.getCollection("documentos");
		DBCursor cursor = collection.find(setQuery);
		JSONArray documentos = new JSONArray();
		
		while (((Iterator<DBObject>) cursor).hasNext()) {
			JSONObject jsonObject; 
			JSONParser parser = new JSONParser(); 
			BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
			String documento = obj.getString("documento");
			jsonObject = (JSONObject) parser.parse(documento);
			JSONObject jsonDocumento = new JSONObject();
			jsonDocumento.put("_id", obj.getString("_id"));
			jsonDocumento.put("modelo", jsonObject.get("modelo"));
			jsonDocumento.put("situacao", jsonObject.get("situacao"));
			documentos.add(jsonDocumento);
		};
		mongo.close();
		return documentos;
	};

	@Path("/obter")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterDocumento(@QueryParam("id") String id) throws UnknownHostException, MongoException {
		ObjectId _id = new ObjectId(id);
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("documentos");
		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
		DBObject cursor = collection.findOne(searchQuery);
		JSONObject documento = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("documento");
		documento.put("documento", obj);
		mongo.close();
		return documento;
	};
	
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Document doc) throws MongoException, JsonParseException, JsonMappingException, IOException {
		ObjectId _id = new ObjectId(doc.documento.id.toString());
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("documentos");
		Gson gson = new Gson();
		String jsonDocumento = gson.toJson(doc);
		Map<String,String> mapJson = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		mapJson = mapper.readValue(jsonDocumento, HashMap.class);
		JSONObject documento = new JSONObject();
		documento.putAll(mapJson);
		BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
		DBObject cursor = collection.findAndModify(searchQuery,
                null,
                null,
                false,
                update,
                true,
                false);
		mongo.close();
		return Response.status(200).entity(doc).build();
	};

	
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirDocumento(Document doc) throws MongoException, JsonParseException, JsonMappingException, IOException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("documentos");
		Gson gson = new Gson();
		String jsonDocumento = gson.toJson(doc);
		Map<String,String> mapJson = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		mapJson = mapper.readValue(jsonDocumento, HashMap.class);
		JSONObject documento = new JSONObject();
		documento.putAll(mapJson);
		DBObject insert = new BasicDBObject(documento);
		collection.insert(insert);
		mongo.close();
		return Response.status(200).entity(doc).build();
	};
	
	@Path("/excluir")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ExcluirDocumento(@QueryParam("id") String id) throws UnknownHostException, MongoException {
		ObjectId _id = new ObjectId(id);
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("documentos");
		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
		collection.remove(searchQuery);
		mongo.close();
		return Response.status(200).entity(id).build();
	};
};
