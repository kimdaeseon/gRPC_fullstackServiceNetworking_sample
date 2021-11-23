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
let clientstreaming_proto = grpc.loadPackageDefinition(packageDefinition)

function getServerResponse(call, callback){
    let count = 0
    call.on('data',function(message){
        count += 1
        console.log(message.message.toString())
    });
    call.on('end',function(){
        callback(null,{
            value: count
        })
    })
}
function main() {
  let server = new grpc.Server();
  server.addService(clientstreaming_proto.clientstreaming.ClientStreaming.service, 
    { getServerResponse: getServerResponse}
  );
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  console.log("Starting server. Listening on port 50051.")
  server.start();
}

main();