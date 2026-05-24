package com.example.back_end.dtos;

import com.example.back_end.enums.DealerStatus;
import com.example.back_end.models.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "dealer_requests")
public class DealerRequest extends BaseEntity {

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable=false, name = "tax_id")
    private String taxId;

    @Column(nullable = false, name = "address")
    private String address;

    @Column(name = "request_status")
    @Enumerated(EnumType.STRING)
    private DealerStatus requestStatus;

}
