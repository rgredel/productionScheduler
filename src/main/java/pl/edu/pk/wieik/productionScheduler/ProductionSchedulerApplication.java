package pl.edu.pk.wieik.productionScheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ProductionSchedulerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductionSchedulerApplication.class, args);
	}

}
