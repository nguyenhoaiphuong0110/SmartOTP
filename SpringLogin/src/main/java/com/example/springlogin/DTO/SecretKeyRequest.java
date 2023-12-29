package com.example.springlogin.DTO;

public class SecretKeyRequest {
    private String userId;
    private String secretKey;

    public SecretKeyRequest() {
    }

    public SecretKeyRequest(String userId, String secretKey) {
        this.userId = userId;
        this.secretKey = secretKey;
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
        return "SecretKeyRequest{" +
                "userId='" + userId + '\'' +
                ", secretKey='" + secretKey + '\'' +
                '}';
    }
}
