const PROTO_PATH = __dirname + '/hello.proto';

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
let hello_proto = grpc.loadPackageDefinition(packageDefinition)

function MyFunction(call, callback){
    callback(null, {value : call.request.value})
}
function main() {
  let server = new grpc.Server();
  server.addService(hello_proto.MyService.service, 
    { MyFunction: MyFunction}
  );
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  console.log("Starting server. Listening on port 50051.")
  server.start();
}

main();