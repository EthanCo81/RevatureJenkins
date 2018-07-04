package com.revaturesocialmedia.daos;

import java.util.List;

import com.revaturesocialmedia.beans.Client;

public interface ClientDAO {

	//CREATE
	int save(Client c);
	Client persist(Client c);
	
	//READ
	List<Client> getAllHQL();
	List<Client> getAllCriteria();
	Client getById(int i);
	Client loadById(int i);
	
	//UPDATE
	Client update(Client c);
	Client merge(Client c);
	void updateHQL();
	
	//DELETE
	void delete(Client c);

}
