const PROTO_PATH = __dirname + '/bidirectional.proto';

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

function getServerResponse(call){
  console.log("Server processing gRPC bidirectional streaming.")
  call.on('data', function(request){
    call.write({message: "recieve "+request.message.toString()})
  })
}

function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.bidirectional.Bidirectional.service, 
    { getServerResponse: getServerResponse}
  );
  server.bind('localhost:4500', grpc.ServerCredentials.createInsecure());
  console.log("Starting server. Listening on port 50051.")
  server.start();
}

main();