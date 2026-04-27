package com.example.back_end.models;

import com.example.back_end.enums.DealerStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dealers")
@NoArgsConstructor
@Setter
@Getter
public class Dealer extends UserAccount{

    @Column(nullable=false)
    private String taxId;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DealerStatus status;
}
