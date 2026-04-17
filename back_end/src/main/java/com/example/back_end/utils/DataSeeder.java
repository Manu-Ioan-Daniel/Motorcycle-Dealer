package com.example.back_end.utils;

import com.example.back_end.enums.Role;
import com.example.back_end.models.UserAccount;
import com.example.back_end.repositories.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserAccountRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String @NonNull ... args) {

        if(repo.count() > 0) {
            return;
        }
        UserAccount user = new UserAccount(
                "test@test.com",
                "1234567890",
                "testuser",
                encoder.encode("password"),
                Role.USER
        );

        UserAccount user2 = new UserAccount(
                "test2@test.com",
                "2234567890",
                "testuser2",
                encoder.encode("password2"),
                Role.USER
        );


        repo.save(user);
        repo.save(user2);
    }
}