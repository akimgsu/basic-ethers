require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID = process.env.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

const account1 = process.env.ACCOUNT_1;
const account2 = process.env.ACCOUNT_2;

const privateKey1 = process.env.PRIVATE_KEY_1
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1)
  const recieverBalanceBefore = await provider.getBalance(account2)

  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
  console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.025")
  });

  await tx.wait()
  console.log(tx)

  const senderBalanceAfter = await provider.getBalance(account1)
  const recieverBalanceAfter = await provider.getBalance(account2)

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
  console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()