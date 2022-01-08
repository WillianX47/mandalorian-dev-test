package org.acme.redis;

public class Task {
    public String key;
    public String texto;

    public Task(String key, String texto) {
        this.key = key;
        this.texto = texto;
    }

    public Task() {
    }
}
