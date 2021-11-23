const PROTO_PATH = __dirname + '/bidirectional.proto';

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
let employee_proto = grpc.loadPackageDefinition(packageDefinition).bidirectional;

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
}

function main() {
  let client = new employee_proto.Bidirectional('localhost:4500',grpc.credentials.createInsecure());
  const call = client.GetServerResponse()
  send_messages(call)
  call.on('data',function(response){
    console.log("[server to client]", response.message.toString())
  });
}

main();