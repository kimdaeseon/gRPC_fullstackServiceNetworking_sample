const PROTO_PATH = __dirname + '/clientstreaming.proto';

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
let employee_proto = grpc.loadPackageDefinition(packageDefinition).clientstreaming;

const generate_message = ()=>{
  return [
    "message #1",
    "message #2",
    "message #3",
    "message #4",
    "message #5"
  ]
}

const send_messages = (call)=>{
  const messages = generate_message()
  messages.map((message)=> {
    console.log("[client to server]", message)
    call.write({message:message})
  })
  call.end()
}

function main() {
  let client = new employee_proto.ClientStreaming('localhost:50051',grpc.credentials.createInsecure());
  const call = client.GetServerResponse(function(err,response){
    console.log(response.value)
  })
  send_messages(call)
  call.on('data',function(response){
    console.log("[server to client]", response.value.toString())
  });
}

main();