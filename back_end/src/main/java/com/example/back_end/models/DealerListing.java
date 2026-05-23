package com.example.back_end.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dealer_listings")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DealerListing {

    @EmbeddedId
    private DealerListingId id;

}

