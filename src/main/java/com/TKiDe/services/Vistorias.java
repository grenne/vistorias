package com.TKiDe.services;

import java.net.UnknownHostException;
import java.util.Iterator;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

import com.mongodb.MongoException;
import com.mongodb.util.JSON;

@Singleton
// @Lock(LockType.READ)
@Path("/lista")
public class Vistorias {

	@GET
	public JSONArray ObterLista() throws UnknownHostException, MongoException, ParseException {

		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("vistoria");
		DBCollection collection = db.getCollection("vistorias");
		BasicDBObject searchQuery = new BasicDBObject("vistoria.usuAtual", "Carlos");
		BasicDBObject fields = new BasicDBObject();
		DBCursor cursor = collection.find(searchQuery);
		JSONArray vistorias = new JSONArray();
		
		while (((Iterator<DBObject>) cursor).hasNext()) {
			JSONObject jsonObject; 
			JSONParser parser = new JSONParser(); 
			BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
			String _id = obj.getString("_id");
			String vistoria = obj.getString("vistoria");
			jsonObject = (JSONObject) parser.parse(vistoria);
			JSONArray header = (JSONArray) jsonObject.get("header");
			JSONObject jsonVistoria = new JSONObject();
			jsonVistoria.put("_id", _id);
			jsonVistoria.put("header", header);
			vistorias.add(jsonVistoria);
		};
		mongo.close();
		return vistorias;
	};
};
