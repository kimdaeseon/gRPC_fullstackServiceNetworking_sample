const message = require('./hello_pb')
const services = require("./hello_grpc_pb")

var grpc = require('@grpc/grpc-js');

function main(){
    const client = new services.MyServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure())

    const request = new message.MyNumber()
    request.setValue(4)
    client.myFunction(request, function(err, response){
        console.log('gRPC result:', response.getValue())
    })
    

}

main()