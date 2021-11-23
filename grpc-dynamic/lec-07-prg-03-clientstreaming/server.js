const PROTO_PATH = __dirname + '/clientstreaming.proto';

var grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let employee_proto = grpc.loadPackageDefinition(packageDefinition)

function getServerResponse(call, callback){

    call.on('data',function(message){
        console.log(message.message.toString())
    });
    call.on('end',function(){
        callback(null,{
            value: 5
        })
    })
}
function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.clientstreaming.ClientStreaming.service, 
    { getServerResponse: getServerResponse}
  );
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  console.log("Starting server. Listening on port 50051.")
  server.start();
}

main();