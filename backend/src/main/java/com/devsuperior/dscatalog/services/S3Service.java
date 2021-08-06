package com.devsuperior.dscatalog.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import org.apache.commons.io.FilenameUtils;
import org.joda.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class S3Service {

	private static Logger LOG = LoggerFactory.getLogger(S3Service.class);

	@Autowired
	private AmazonS3 s3client;

	@Value("${s3.bucket}")
	private String bucketName;

	public URL uploadFile(MultipartFile file) {
		try {
			String originalName = file.getOriginalFilename();					   // Retorna o nome do arquivo original
			String extension = FilenameUtils.getExtension(originalName);		   // Pegar a extensão do arquivo
			String fileName = Instant.now().toDate().getTime() + "." + extension;  // Gerar o nome do arquivo com o instante que ele foi upado
			
			InputStream is = file.getInputStream();									// Retorne um InputStream para ler o conteúdo do arquivo.
			String contentType = file.getContentType();								// Retorne o tipo de conteúdo do arquivo.
			return uploadFile(is, fileName, contentType);
		} 
		catch(IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}
	
	private URL uploadFile(InputStream is, String fileName, String contentType) {
			ObjectMetadata meta = new ObjectMetadata();
			meta.setContentType(contentType);
			LOG.info("Upload start");
			s3client.putObject(bucketName, fileName, is, meta);
			LOG.info("Upload finish");
			return s3client.getUrl(bucketName, fileName);
		
	}
}
