package com.cts.authenticationmicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableEurekaClient
public class AuthenticationmicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationmicroserviceApplication.class, args);
	}

}
