package org.acme.redis;

import io.smallrye.mutiny.Uni;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/task")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskResource {

    @Inject
    TaskService service;

    @GET
    public Uni<List<String>> keys() {
        return service.keys();
    }

    @GET
    @Path("/{key}")
    public Task get(@PathParam("key") String key) {
        return new Task(key, String.valueOf(service.get(key)));
    }

    @POST
    public Task create(Task task) {
        service.set(task.key, task.texto);
        return task;
    }

    @DELETE
    @Path("/{key}")
    public Uni<Void> delete(@PathParam("key") String key) {
        return service.del(key);
    }
}
