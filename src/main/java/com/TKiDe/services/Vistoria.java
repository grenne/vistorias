package com.TKiDe.services;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.json.simple.JSONObject;

@Singleton
//@Lock(LockType.READ)
@Path("/lista")
public class Vistoria {

    @GET
	public JSONObject ObterLista() { //Cria um Objeto JSON JSONObject 
		JSONObject jsonObject = new JSONObject(); 
		jsonObject.put("nome", "Allan"); 
		jsonObject.put("sobrenome", "Romanato"); 
		jsonObject.put("pais", "Brasil"); 
		jsonObject.put("estado", "SP"); 
		System.out.println("sa" + jsonObject);
		return jsonObject;
		
	}; 
};
