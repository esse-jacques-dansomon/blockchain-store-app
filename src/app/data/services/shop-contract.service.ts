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

  async getShop() {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStore'](signer.getAddress())
  }

  async createShop(shop: Shop) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['createStore'](shop.name, shop.location)
    let store = await transaction.wait()
    console.log(store)
    return store
  }

  async updateShop(shop: Shop) {
    const contract = await ShopContractService.getContract(true)
    const transaction = await contract['updateStore'](shop.name, shop.location)
    await transaction.wait()
  }

  public async getProducts(): Promise<any[]> {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStoreProducts'](signer.getAddress())
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


  public async getStoreCategories(): Promise<Category[]> {
    const contract = await ShopContractService.getContract(true)
    const signer = contract.signer
    return await contract['getStoreCategories'](signer.getAddress())
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

    const contract = await ShopContractService.getContract(true)
    const transaction = await contract.connect(signer)['buyProduct'](
      idProduct, 1
    )
    await transaction.wait()
  }

  async sellHandler() {
    const provider = await ShopContractService.getWebProvider()
    const signer = provider.getSigner()

    const contract = await ShopContractService.getContract(true)
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
    const contract = await ShopContractService.getContract(true)
    const orderCount = await contract['ordersCounter'](signer.getAddress())

    const orders = await contract['orders'](signer.getAddress(), orderCount)
    return orders.filter((order: any) =>{
      return order.product.id == id
    })
  }

}
