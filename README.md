# betacrew_exchange_server_task

This repository contains the code for a Betacrew Exchange Server and a Node.js client for connecting to it. The server simulates a stock exchange environment, and the client retrieves stock ticker data from the server.


## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js (v16.17.0 or higher)
- Git
- TCP/IP Networking (for client-server communication)



## Setup and Installation

To run this project,

1.Clone the repository :
```bash
git clone https://github.com/vaibhxv11/betacrew_exchange_server_task.git

```

2.Navigate to the project  :

```bash
cd betacrew_exchange_server_task
```
3.Start the Betacrew Exchange Server :

```bash
node main.js

```

4.Open a new terminal window & Runthe Node.js client :
```bash

node client.js

```

## Result
A JSON file output.json will be generated in the directory. This file will contain an array of objects, where each object represents a packet of data with increasing sequences.


## Note
The code overwrites the existing JSON file instead of creating a new one each time node client.js is executed.
