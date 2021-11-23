const PROTO_PATH = __dirname + '/serverstreaming.proto';

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

function getServerResponse(call){
    send_messages(call)
    call.on('data',function(message){
        console.log(message.message.toString())
    });
    call.on('end',function(){

    })
}
function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.serverstreaming.ServerStreaming.service, 
    { getServerResponse: getServerResponse}
  );
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  console.log("Starting server. Listening on port 50051.")
  server.start();
}

main();