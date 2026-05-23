package com.example.back_end.models;

import com.example.back_end.enums.Role;
import com.example.back_end.enums.Status;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_accounts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class UserAccount extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Status status;
}
