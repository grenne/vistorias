package com.TKiDe.services;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mongodb.MongoException;

@Singleton
// @Lock(LockType.READ)
@Path("/updatedocument")
public class UpdateDocument {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Document student) throws UnknownHostException, MongoException {
		System.out.println(student.documento.id.toString());
		System.out.println(student.documento.usuario.toString());
		System.out.println(student.documento.header[0].label.toString());
		System.out.println(student.documento.header[0].valor.toString());
		System.out.println(student.documento.panel[0].label.toString());
//		System.out.println(student.documento.panel[0].tipo.length());
		System.out.println(student.documento.panel[0].fields[0].label.toString());
//		System.out.println(student.documento.panel[0].fields[0].tipo.toString());
		System.out.println(student.documento.panel[0].fields[0].valor.toString());
//		ObjectId _id = new ObjectId(documento.get("id").toString());
//		Mongo mongo = new Mongo();
//		DB db = (DB) mongo.getDB("vistoria");
//		DBCollection collection = db.getCollection("vistorias");
//		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
//		DBObject cursor = collection.findOne(searchQuery);
//		JSONObject vistorias = new JSONObject();
//	d	BasicDBObject obj = (BasicDBObject) cursor.get("vistoria");
//		vistorias.put("vistoria", obj);
//		mongo.close();
		return Response.status(200).entity(student).build();
	};
	
};
