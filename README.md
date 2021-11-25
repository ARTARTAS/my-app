# CRUD:

### DBwriter:

Takes an object and performs actions depending on "Name" value. Returns the id of created object.

Input:

JSON objext

```
    Name: string
    Data: string
```

<details>
<summary>Example:</summary>

```json
{ "Name" : "log", "Data" : "{"Id":0,"TransactionId":52,"BlockHash":"0x4c040f53fe1687880edba9bd8b4bb24000c498755630e8ad7e3dce62651fb34d","BlockNumber":"11659901","Removed":false,"TransactionIndex":"105"}"}
```

</details>

Output:

```
    Id in JSON string format
```

<details>
<summary>Example:</summary>

```json
    "{"234"}"
```

</pre>
</details>


### DBreader:

Takes an object and performs actions depending on "Name" value. Returns result in JSON string format.

Input:

JSON objext

```
    Name: string
    Data: string  **optional**
```

<details>
<summary>Example:</summary>

```json
{ "Name" : "SignUpList", "Data" : "" }
```
</details>

Output:

JSON string format

<details>
<summary>Example:</summary>

```json
"{"Id":380250,"LogId":169348,"Address":"0x41b56bf3b21c53f6394a44a2ff84f1d2bbc27841","LogIndex":"165","Data":"0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e01a7191d7cd6da08556c971231e27c8a435ff73","Topics":"0x5eec9f202a9e6fc1643a0887b641c182ed3700fcf82e98629b8d32ffd1d13308","LockDealCheck":0}"
```

</details>


### DBupdater:

Searches and updates an object by "Name" value in the database. If successful, returns the id of object in database.

Input:

JSON objext

```
    Name: string
    Data: string
```

<details>
<summary>example:</summary>

```json
{ "Name" : "log", "Data" : "{"Id":0,"TransactionId":52,"BlockHash":"0x4c040f53fe1687880edba9bd8b4bb24000c498755630e8ad7e3dce62651fb34d","BlockNumber":"11659901","Removed":false,"TransactionIndex":"105"}" }
```
</details>

Output:

```
    Id in JSON string format
```

<details>
<summary>Example:</summary>

```json
    "{"234"}"
```

</details>


### DBdeleter:

Searches the database for an object by "Name" value and deletes it.Returns the result of the operation.

Input:

JSON objext

```
    Name: string
    Data: string
```

<details>
<summary>example:</summary>

```json
{ "Name" : "log", "Data" : "{"Id":0,"TransactionId":52,"BlockHash":"0x4c040f53fe1687880edba9bd8b4bb24000c498755630e8ad7e3dce62651fb34d","BlockNumber":"11659901","Removed":false,"TransactionIndex":"105"}" }
```

</details>

Output:

JSON string format

```
    boolean
```

<details>
<summary>Example:</summary>

```json
    "{"true"}"
```

</pre>
</details>




# APIs:

### APICrawlerStatus:

When called takes contracts from the database, takes the status of the last block from the blockchain, and calculates the delta. Returns the result.

<details>
<summary>Example:</summary>

```json
{"Chains":[{"LastBlock":{"name":"etherscan","lastBlock":13683014},"Contracts":[{"chainId":1,"address":"0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23","lastRPCBlock":13683007,"delta":7},{"chainId":1,"address":"0x2cc4A6C6D5Ff183d7E3c7e33e9Bc10d55BDBaEA8","lastRPCBlock":13683010,"delta":4},{"chainId":1,"address":"0xdF496489095bE13293de875011f20c0C0e00321b","lastRPCBlock":13683008,"delta":6},{"chainId":1,"address":"0x70a3944215de6fa1463a098ba182634df90bb9f4","lastRPCBlock":13683013,"delta":1}]},{"LastBlock":{"name":"binance","lastBlock":12930246},"Contracts":[{"chainId":56,"address":"0x77018282fD033DAF370337A5367E62d8811Bc885","lastRPCBlock":12930242,"delta":4},{"chainId":56,"address":"0xCc8f6A82Ff034C15dFDAcBcab29F7Ea28C616EF7","lastRPCBlock":12930243,"delta":3},{"chainId":56,"address":"0x77214C209D15C903f9EF93c92f17f985eEeA832D","lastRPCBlock":12930242,"delta":4},{"chainId":56,"address":"0x41b56bF3b21C53F6394a44A2ff84f1d2bBC27841","lastRPCBlock":12930242,"delta":4},{"chainId":56,"address":"0x8BfAA473a899439d8E07BF86a8C6cE5De42fE54B","lastRPCBlock":12930243,"delta":3},{"chainId":56,"address":"0xc32Df92A0d8007b248Bed0DaBf93baCE6854C782","lastRPCBlock":12930244,"delta":2},{"chainId":56,"address":"0xCf218309DE82507C9CFeD38a75B1bA98DF917b0a","lastRPCBlock":9092601,"delta":3837645},{"chainId":56,"address":"0x537509C227b4F69F3871a665Ef25E85c92d39ed8","lastRPCBlock":9462516,"delta":3467730},{"chainId":56,"address":"0x5AAFD67BFe65CF0a0055549991D02557f49bDD6A","lastRPCBlock":10776417,"delta":2153829},{"chainId":56,"address":"0x2c9c19ce3b15ae77c6d80aec3c1194cfd6f7f3fa","lastRPCBlock":12930238,"delta":8}]}],"Counters":[{"name":"transactions","count":"357498"},{"name":"logs","count":"356875"}]}
```
</details>

# Crawler:


### CrawlerLoader:

When called, it checks the list of contracts in the database and the last block in the chain. If it is necessary to download the data (checks the delta), it launches the [CrawlerVerifier](#crawlerverifier), passes it an object with the last block in the chain, the number of blocks needed to be downloaded using RPC, the number of blocks needed to be downloaded using Covalent, the list of connections for RPC and the contract we are working with.

<details>
<summary>Example:</summary>

```
{
    int: LastBlock,
    int: RPCCount,
    int: CovalentCount,
    List<string>: Connections,
    Contract: contract
}
```
</details>

### CrawlerVerifier:

Calls [CrawlerDownloaderRPC](#crawlerdownloaderrpc-and-crawlerdownloadercovalent) and [CrawlerDownloaderCovalent](#crawlerdownloaderrpc-and-crawlerdownloadercovalent), passes them object containing the first and last blocks to download from, netlist and contract.

<details>
<summary>Example:</summary>

```
{
    int: from,
    int : to,
    List<string>: Connections,
    Contract: contract
}
```
</details>

After that, it expects logs from them. Creates a list of unique logs and passes it to the [CrawlerLogSaver](#crawlerlogsaver).

### CrawlerDownloaderRPC and CrawlerDownloaderCovalent:

Reads the necessary data from the blockchain using RPC / Covalent connection. Returns a list of read logs to the [CrawlerVerifier](#crawlerverifier).
<details>
<summary>Example:</summary>

```
{
    int Type
    Contract Contract
    string LogIndex
    string Data
    List<string> Topics
    string TransactionIndex
    bool Removed
    string BlockNumber
    string BlockHash
    string Hash
    string From
    string To
    string Value
}
```
</details>

### CrawlerLogSaver:

Receives a list of unique logs from the [CrawlerVerifier](#crawlerverifier), checks their presence in the database and adds them if necessary.
