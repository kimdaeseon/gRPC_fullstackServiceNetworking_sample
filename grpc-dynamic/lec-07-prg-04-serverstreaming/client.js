const PROTO_PATH = __dirname + '/serverstreaming.proto';

var grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let serverstreaming_proto = grpc.loadPackageDefinition(packageDefinition).serverstreaming;

function main() {
  let client = new serverstreaming_proto.ServerStreaming('localhost:50051',grpc.credentials.createInsecure());
  const call = client.GetServerResponse({message:"start"})
  call.on('data',function(response){
    console.log("[server to client]", response.message.toString())
  });
  
}

main();