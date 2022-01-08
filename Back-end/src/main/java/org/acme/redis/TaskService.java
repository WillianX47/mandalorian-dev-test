package org.acme.redis;

import io.quarkus.redis.client.RedisClient;
import io.quarkus.redis.client.reactive.ReactiveRedisClient;
import io.smallrye.mutiny.Uni;

import io.vertx.mutiny.redis.client.Response;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;

//Classe TaskService, regra de negócio da aplicação
@Singleton
class TaskService {

    //Injeta o RedisClient
    @Inject
    RedisClient redisClient;

    //Injeta o ReactiveRedisClient
    @Inject
    ReactiveRedisClient reactiveRedisClient;

    //Função que recebe uma key e quando encontrada, deleta a task
    Uni<Void> del(String key) {
        return reactiveRedisClient.del(Arrays.asList(key))
                .map(response -> null);
    }

    //Função que recebe uma key e retorna com o valor dela
    String get(String key) {
        return redisClient.get(key).toString();
    }

    //Função que recebe uma key e um texto, salva no Redis a task
    void set(String key, String texto) {
        redisClient.set(Arrays.asList(key, texto));
    }

    //Função que busca todas as keys no banco de dados e retorna para quem a chamou
    //uma lista de keys
    Uni<List<String>> keys() {
        return reactiveRedisClient
                .keys("*")
                .map(response -> {
                    List<String> result = new ArrayList<>();
                    for (Response r : response) {
                        result.add(r.toString());
                    }
                    return result;
                });
    }
}

