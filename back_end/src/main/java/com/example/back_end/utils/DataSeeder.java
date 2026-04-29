package com.example.back_end.utils;

import com.example.back_end.enums.Role;
import com.example.back_end.models.User;
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

        User user = new User();
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("user@test.com");
        user.setRole(Role.USER);
        user.setPasswordHash(encoder.encode("password"));
        user.setUsername("test");
        user.setPhoneNumber("1234567890");

        UserAccount adminAccount = new UserAccount();
        adminAccount.setEmail("admin@test.com");
        adminAccount.setUsername("admin");
        adminAccount.setPasswordHash(encoder.encode("adminpassword"));
        adminAccount.setRole(Role.ADMIN);
        adminAccount.setPhoneNumber("2234567890");

        UserAccount dealerAccount = new UserAccount();
        dealerAccount.setEmail("dealer@test.com");
        dealerAccount.setUsername("dealer");
        dealerAccount.setPasswordHash(encoder.encode("dealerpassword"));
        dealerAccount.setRole(Role.DEALER);
        dealerAccount.setPhoneNumber("3234567890");

        repo.save(user);
        repo.save(adminAccount);
        repo.save(dealerAccount);

    }
}