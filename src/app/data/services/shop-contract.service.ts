import {Injectable} from '@angular/core';
import {ethers} from "ethers";
import {environment} from "../../../environments/environment";
import Store from '../../../../artifacts/contracts/Store.sol/Store.json'
import detectEthereumProvider from "@metamask/detect-provider";
import {Shop} from "../models/shop";
import {Product} from "../models/product";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class ShopContractService {

  private static async getContract(bySigner=true) {
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

  async getShop(account: string) {
    const contract = await ShopContractService.getContract(true)
    return await contract['getStore'](account)
  }

  async createShop(shop: Shop) {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    const transaction = await contract.connect(signer)['createStore'](shop.name, shop.location)
    return await transaction.wait()
  }

  async updateShop(shop: Shop) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['updateStore'](shop.name, shop.location)
    await transaction.wait()
  }

  public async getStoreProducts(account: string): Promise<any[]> {
    const contract = await ShopContractService.getContract(true)
    return await contract['getStoreProducts'](account)
  }

  public async createProduct(product: Product) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['createProduct'](product.name, product.image, product.price, product.availableQuantity, product.categoryId)
    return await transaction.wait()
  }

  public async updateProduct(product: Product) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['modifyProduct'](product.id, product.name, product.price, product.availableQuantity, product.categoryId)
   return  await transaction.wait()
  }

  public async deleteProduct(id: number) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['deleteProduct'](id)
    await transaction.wait()
  }


  public async getStoreCategories(account: string): Promise<Category[]> {
    const contract = await ShopContractService.getContract(true)
    return await contract['getStoreCategories'](account)
  }

  public async createCategory(category: Category) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['createCategory'](category.name, category.description)
    return await transaction.wait()
  }

  public async updateCategory(category: Category) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['updateCategory'](category.id, category.name, category.description)
    return await transaction.wait()
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

  async orderProduct(product: Product, quantity: number) {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    const transaction = await contract.connect(signer)['orderProduct'](product.id, quantity, {value:
        (`${product.price}`)} )
    await transaction.wait()
  }

  async getBuyerOrders(account: string) {
    const contract = await ShopContractService.getContract(true)
    return await contract['getBuyerOrders'](account)
  }
  async getStoreOrders(account: string) {
    const contract = await ShopContractService.getContract(true)
    return await contract['getStoreOrders'](account)
  }


  formatUnits(amount: string) {
    return ethers.utils.formatUnits(amount, 'ether')
  }



  async getContractInstance() {
    return await ShopContractService.getContract(false)
  }

}
