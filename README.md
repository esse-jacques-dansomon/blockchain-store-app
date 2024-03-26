# Angular Store DApp

This template uses following versions

* Angular 17
* NgRx 17
* Hardhat 2.8
* Ethers 5.5
* Solidity 0.8.4

## Getting started

1. Clone this repository 

```shell
git clone git@github.com:esse-jacques-dansomon/blockchain-store.git
```

2. Install dependencies

```shell
npm install
```

3. Start the hardhat node
  
```shell
  npx hardhat node
 ```

4. Compile the smart contract
  
```shell
  npx hardhat compile
```

5. Deploy the smart contract to the testnet

```shell
npm run deploy:localhost
```


6. Paste the contract address, you get on the command line, into src/environments/environment.ts

```typescript
export const environment = {
  // ...
  contractAddress: '0x04215C89a6af0f7ed9103c48BaF6A8e19f119470',
  // ...
};
```


7. Run angular

```shell
ng serve
```
`application and test the app under http://localhost:4200`

8. Run the tests

```shell
npx hardhat test
```


## Angular app


## Smart contract

