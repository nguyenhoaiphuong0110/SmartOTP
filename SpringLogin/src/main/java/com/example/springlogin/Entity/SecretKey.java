package com.example.springlogin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "secretkey")
public class SecretKey {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "secretKey")
    private String secretKey;

    public SecretKey() {
    }

    public SecretKey(long id, String userId, String secretKey) {
        this.id = id;
        this.userId = userId;
        this.secretKey = secretKey;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String toString() {
        return "SecretKey{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", secretKey='" + secretKey + '\'' +
                '}';
    }
}
