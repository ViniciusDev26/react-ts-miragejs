import { createServer, Model, Server } from "miragejs"

class MakeServer {
  private static server: Server;

  private constructor() {
    MakeServer.server = createServer({
      models: {
        users: Model,
      },
  
      seeds(server) {
        server.db.createCollection('users', [
          { id: 1, name: "vinicius", email: "vinicius26092000@gmail.com", password: "123123" }
        ])
      },
  
      routes() {
        this.namespace = "api"
  
        this.get("/users", (schema) => {
          return schema.all('users')
        })

        this.post("/users", (schema, request) => {
          const data = JSON.parse(request.requestBody)
          data.id = Math.floor(Math.random() * 100);

          schema.create('users', data)
          return data
        })

        this.post("/auth", (schema, request) => {
          const {email, password} = JSON.parse(request.requestBody)

          const {models: [users]} = schema.all("users").filter((user: any) => {
            return user.attrs.email === email && user.attrs.password === password
          });

          if(!users) return new Response(JSON.stringify({error: "not authorized"}), {
            status: 401
          })

          const user = users.attrs       
          return user
        })
      },
    })
  }

  public static runServer() {
    if(!this.server) new MakeServer();

    return this.server 
  }
}

export { MakeServer }