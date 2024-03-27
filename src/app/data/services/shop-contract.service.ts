import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from "../../../environments/environment";
import Store from '../../../../artifacts/contracts/Store.sol/Store.json'
import detectEthereumProvider from "@metamask/detect-provider";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopContractService {

  async getShop() {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStore'](signer.getAddress())
  }

  public async getProducts(): Promise<any[]> {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStoreProducts'](signer.getAddress())
  }


  public async getStoreCategories(): Promise<any[]> {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStoreCategories'](signer.getAddress())
  }


  public async getImagesByAuthor(): Promise<any[]> {
    const contract = await ShopContractService.getContract(true)

    return await contract['retrieveImagesByAuthor']()
  }

  public async addImage(title: string, fileUrl: string): Promise<boolean> {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['store'](
      title,
      fileUrl
    )
    const tx = await transaction.wait()

    return tx.status === 1
  }

  private static async getContract(bySigner=false) {
    const provider = await ShopContractService.getWebProvider()
    const signer = provider.getSigner()
    return new ethers.Contract(
      environment.contractAddress,
      Store.abi,
      bySigner ? signer : provider
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
    const provider = await ShopContractService.getWebProvider(true)
    const signer = provider.getSigner()

    return await signer.getAddress()
  }

  async connect() {
    try {
      const provider: any = await detectEthereumProvider()
      return await provider.request({ method: 'eth_requestAccounts' })
    }catch (
      error
      ){
    }
  }

  async buyHandler(idProduct: any) {
    const provider = await ShopContractService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await ShopContractService.getContract()
    const transaction = await contract.connect(signer)['buyProduct'](
      idProduct, 1
    )
    await transaction.wait()
  }

  async sellHandler() {
    const provider = await ShopContractService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await ShopContractService.getContract()
    const transaction = await contract.connect(signer)['sell'](
      1
    )
    await transaction.wait()
  }

  formatUnits(amount: string) {
    return ethers.utils.formatUnits(amount, 'ether')
  }

  async fetchOrder(id: number) {
    const provider =  await ShopContractService.getWebProvider()
    const signer = provider.getSigner()
    const contract = await ShopContractService.getContract()
    const orderCount = await contract['ordersCounter'](signer.getAddress())

    const orders = await contract['orders'](signer.getAddress(), orderCount)
    return orders.filter((order: any) =>{
      return order.product.id == id
    })
  }

}
