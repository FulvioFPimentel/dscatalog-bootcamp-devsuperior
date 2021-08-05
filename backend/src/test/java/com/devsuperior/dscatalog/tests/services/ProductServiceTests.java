package com.devsuperior.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)           // Não carrega o contexto, mas permite usar os recursos do Spring com JUnit
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	@Mock
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private PageRequest pageRequest;
	private Product product;
	private ProductDTO productDTO;
	private PageImpl<Product> page;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;	
		product = ProductFactory.createProduct();
		productDTO = ProductFactory.createProductDTO();
		page = new PageImpl<>(List.of(product));		
		
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
		
		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
			.thenReturn(page);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(repository.getOne(existingId)).thenReturn(product);	
		Mockito.when(repository.getOne(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		Mockito.when(repository.save(product)).thenReturn(product);
		
	}
	
	@Test
	public void findAllPagedShouldReturnPage() {
		
		Long categoryId = 0L;
		String name = "";
		PageRequest pageRequest = PageRequest.of(0, 10);
		
		Page<ProductDTO> result = service.findAllPaged(categoryId, name, pageRequest);
		
		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
		Mockito.verify(repository, Mockito.times(1)).find(null, name, pageRequest);
	}
	
	@Test
	public void findAllPagedShouldReturnPaginationWhenExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.findAllPaged(existingId, "Phone", pageRequest);
		});
		
		Mockito.verify(repository, Mockito.times(1)).find(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any());
	}
	
	@Test
	public void updateShouldResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId,	productDTO);
			
		});
	}
	
	@Test
	public void updateShouldReturnDTOWhenIdExists() {
	
		ProductDTO result = service.update(existingId,	productDTO);
		Assertions.assertNotNull(result);
		
		Mockito.verify(repository, Mockito.times(1)).getOne(existingId);
	}
	
	@Test
	public void findByIdShouldResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		
		ProductDTO result = service.findById(existingId);
		Assertions.assertNotNull(result);
		
		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}
	
	@Test
	public void deleteShouldThrowsDatabaseExceptionWhenIdDependentId() {
		
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
	
	
}
