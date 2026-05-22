package com.example.back_end.services;

import com.example.back_end.dtos.RegisterRequest;
import com.example.back_end.enums.Role;
import com.example.back_end.exceptions.EmailAlreadyExistsException;
import com.example.back_end.exceptions.PhoneNumberAlreadyExistsException;
import com.example.back_end.models.User;
import com.example.back_end.models.UserAccount;
import com.example.back_end.repositories.UserAccountRepository;
import com.example.back_end.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        if(userRepository.existsByPhoneNumber(request.getPhoneNumber())){
            throw new PhoneNumberAlreadyExistsException();
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    public Optional<UserAccount> findByEmail(String email) {
        return userAccountRepository.findByEmail(email);
    }

    public Optional<UserAccount> findById(Long id) {
        return userAccountRepository.findById(id);
    }
}
