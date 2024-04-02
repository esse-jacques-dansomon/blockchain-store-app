import { Injectable } from "@angular/core"
import { create } from "ipfs-http-client"
import { environment } from "../../../environments/environment"
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  constructor(
    private http: HttpClient
  ) { }

  async handleSubmission(selectedFile: File) {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const resData = await this.http.post<any>(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${environment.JWT}`,
          },
        }
      ).toPromise();
      console.log(resData);
      return resData;
    } catch (error) {
      console.log(error);
    }
}
  public  uploadFile(file: any) {
    let data = new FormData()
    data.append('file', file)
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    let url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    return  this.http.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${environment.JWT}`
      }
    })
  }
  public async uploadFileOLd(data: any): Promise<string> {
    let url = ''
    const client = IpfsService.getClient()

    try {
      const added = await client.add(data)
      url = `${environment.ipfs}/ipfs/${added.path}`
    } catch (error) {
      console.log(error)
    }

    return url
  }

  private static getClient(): any {
    // @ts-ignore
    return create(`${environment.ipfs}:5001/api/v0`)
  }
}
