package org.acme.redis;

//POJO de Task, onde o título da Task é também utilizado como "Key"
public class Task {
    public String key;      //Key, valor único também utilizado como título
    public String texto;    //Texto, texto que o usuário digitou na determinada task

    //Construtor de Task
    public Task(String key, String texto) {
        this.key = key;
        this.texto = texto;
    }

    //Construtor vazio
    public Task() {
    }
}
