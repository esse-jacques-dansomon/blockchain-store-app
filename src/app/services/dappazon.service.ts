import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from "../../environments/environment";
import Dappazon from '../../../artifacts/contracts/Dappazon.sol/Dappazon.json'
import detectEthereumProvider from "@metamask/detect-provider";

@Injectable({
  providedIn: 'root'
})
export class DappazonService {
  public async getAllProducts(): Promise<any[]> {
    const contract = await DappazonService.getContract()
    return await contract['getProducts']()
  }

  public async getImagesByAuthor(): Promise<any[]> {
    const contract = await DappazonService.getContract(true)

    return await contract['retrieveImagesByAuthor']()
  }

  public async addImage(title: string, fileUrl: string): Promise<boolean> {
    const contract = await DappazonService.getContract(true)
    const transaction = await contract['store'](
      title,
      fileUrl
    )
    const tx = await transaction.wait()

    return tx.status === 1
  }

  private static async getContract(bySigner=false) {
    const provider = await DappazonService.getWebProvider()
    const signer = provider.getSigner()

    return new ethers.Contract(
      environment.contractAddress,
      Dappazon.abi,
      provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }

    return new ethers.providers.Web3Provider(provider)
  }

  public async getAccount() {
    const provider = await DappazonService.getWebProvider()
    const signer = provider.getSigner()

    return await signer.getAddress()
  }

  connect() {
    return DappazonService.getWebProvider()
  }

  async buyHandler(idProduct: any) {
    const provider = await DappazonService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await DappazonService.getContract()
    const transaction = await contract.connect(signer)['buyProduct'](
      idProduct, 1
    )
    await transaction.wait()
  }

  async sellHandler() {
    const provider = await DappazonService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await DappazonService.getContract()
    const transaction = await contract.connect(signer)['sell'](
      1
    )
    await transaction.wait()
  }

  formatUnits(amount: string) {
    return ethers.utils.formatUnits(amount, 'ether')
  }

  async fetchOrder(id: number) {
    const provider =  await DappazonService.getWebProvider()
    const signer = provider.getSigner()
    const contract = await DappazonService.getContract()
    console.log(contract)
    const orderCount = await contract['ordersCounter'](signer.getAddress())
    console.log('orderCount', orderCount.toString())

    const orders = await contract['orders'](signer.getAddress(), orderCount)
    console.log('orders', orders)
    return orders.filter((order: any) =>{
      console.log(order)
      return order.product.id == id
    })
  }
}
