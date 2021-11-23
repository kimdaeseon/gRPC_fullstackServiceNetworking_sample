const PROTO_PATH = __dirname + '/hello.proto';

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
let hello_proto = grpc.loadPackageDefinition(packageDefinition)

function main() {
  let client = new hello_proto.MyService('localhost:50051',grpc.credentials.createInsecure());
  const call = client.MyFunction({value:4},function(err,response){
    console.log(response.value)
  })
  
}

main()