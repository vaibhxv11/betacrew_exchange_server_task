
const net = require('net'); 
const fs = require('fs'); 

const HOST = 'localhost'; 
const PORT = 3000; 

const packetsReceived = {}; 
let totalPackets = 0; 


function createRequest(callType, resendSeq = null) {
    const buffer = Buffer.alloc(6); 
    buffer.writeUInt8(callType, 0); 
    if (callType === 2) {
        buffer.writeUInt8(resendSeq, 1); 
    }
    return buffer; 
}

// Function to write the JSON file
function writeJSONFile(data) {
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2)); 
    console.log('Data written to output.json'); 
}


function processPacket(packet) {
    const symbol = packet.slice(0, 4).toString('ascii').trim(); 
    const buySellIndicator = String.fromCharCode(packet.readUInt8(4)); 
    const quantity = packet.readInt32BE(5); 
    const price = packet.readInt32BE(9); 
    const sequence = packet.readInt32BE(13); 

    packetsReceived[sequence] = {
        symbol,
        buySellIndicator,
        quantity,
        price,
        sequence,
    };

    totalPackets = Math.max(totalPackets, sequence); 
}



const client = new net.Socket(); 

client.connect(PORT, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORT}`); 
    client.write(createRequest(1)); 
});

client.on('data', (data) => {
    const packetSize = 17; 
    const numberOfPackets = data.length / packetSize; 

    for (let i = 0; i < numberOfPackets; i++) {
        const packet = data.slice(i * packetSize, (i + 1) * packetSize);
        processPacket(packet); 
    }
});

// Handle connection close
client.on('end', () => {
    console.log('Connection closed by server'); 
    const allPackets = []; 

    for (let i = 1; i <= totalPackets; i++) {
        if (packetsReceived[i]) {
            allPackets.push(packetsReceived[i]);
        } else {
            console.log(`Missing packet with sequence number: ${i}`); 
            client.write(createRequest(2, i)); 
        }
    }

    writeJSONFile(allPackets); // Write all packets to output.json
});

// Handle error events
client.on('error', (err) => {
    console.error(`Error: ${err.message}`); 
});
