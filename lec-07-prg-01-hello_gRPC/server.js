const message = require('./hello_pb')
const services = require("./hello_grpc_pb")

var grpc = require('@grpc/grpc-js');

function myFunction(call, callback){
    const reply = new message.MyNumber()
    reply.setValue(call.request.getValue())
    callback(null, reply)
}
function main(){
    const server = new grpc.Server()
    server.addService(services.MyServiceService, {myFunction : myFunction})
    server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), function(){
        console.log("Starting server. Listening on port 500051. ")
        server.start()
    })    
}

main()