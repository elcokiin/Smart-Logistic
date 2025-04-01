package com.dckl.smartlogistics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configuración que desactiva la seguridad para pruebas de desarrollo
        http
            .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF
            .authorizeHttpRequests(auth -> 
                auth.requestMatchers(AntPathRequestMatcher.antMatcher("/**")).permitAll() // Permitir todas las rutas
            )
            .httpBasic(Customizer.withDefaults()); // Mantener httpBasic para compatibilidad
            
        return http.build();
    }
}