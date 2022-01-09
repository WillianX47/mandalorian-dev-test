package org.acme.redis;

import io.smallrye.mutiny.Uni;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

//Classe Resource/Conroller, onde possui todas as rotas necessárias
@Path("/task")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskResource {

    //Injeta a classe TaskService para chamada de funções
    @Inject
    TaskService service;

    //Encontra todas as keys no banco de dados
    @GET
    public Uni<List<String>> keys() {
        return service.keys();
    }

    //Recebe um parâmetro "Key" via URL e procura no Redis
    //Quando encontrado retorna uma Task nova com os valores
    @GET
    @Path("/{key}")
    public Task get(@PathParam("key") String key) {
        return new Task(key, String.valueOf(service.get(key)));
    }

    //Recebe um body e salva no Redis
    @POST
    @Path("/add")
    public Task create(Task task) {
        service.set(task.key, task.texto);
        return task;
    }

    //Recebe um parâmetro "Key" via URL e procura no Redis
    //Quando encontrado deleta a Task
    @DELETE
    @Path("/{key}")
    public Uni<Void> delete(@PathParam("key") String key) {
        return service.del(key);
    }
}
