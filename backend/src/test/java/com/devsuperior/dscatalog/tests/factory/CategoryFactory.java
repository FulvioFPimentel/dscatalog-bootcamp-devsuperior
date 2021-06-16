package com.devsuperior.dscatalog.tests.factory;

import java.util.ArrayList;
import java.util.List;

import com.devsuperior.dscatalog.entities.Category;

public class CategoryFactory {
	
	public static List<Category> createCategory() {

		List<Category> categories = new ArrayList<>();
		categories.add(new Category(1L, "Livro"));
		categories.add(new Category(2L, "Eletronico"));
		
		return categories;
		
	}

}
