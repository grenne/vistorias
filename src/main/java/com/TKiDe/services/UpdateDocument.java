package com.TKiDe.services;

import java.io.IOException;
import java.net.UnknownHostException;
import javax.inject.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@Singleton
// @Lock(LockType.READ)
@Path("/updatedocument")
public class UpdateDocument {

	@POST
	public JSONObject ObterVistoria(@QueryParam("id") String id) throws UnknownHostException, MongoException {
		ObjectId _id = new ObjectId(id);
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("vistoria");
		DBCollection collection = db.getCollection("vistorias");
		BasicDBObject searchQuery = new BasicDBObject("_id",_id);
		DBObject cursor = collection.findOne(searchQuery);
		JSONObject vistorias = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("vistoria");
		vistorias.put("vistoria", obj);
		mongo.close();
		return vistorias;
	};
	
};
