import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadsImageService {

	constructor(
		private  _httpClient: HttpClient
	) { }
	private api_cate: string = "https://apimean.herokuapp.com/api/category";
	private api_brand: string = "https://apimean.herokuapp.com/api/brand";
	private api_product: string = "https://apimean.herokuapp.com/api/product";
	// private api_cate: string = "http://localhost:3000/api/category";
	// private api_brand: string = "http://localhost:3000/api/brand";
	// private api_product: string = "http://localhost:3000/api/product";
	public uploadImagesDetail(event): Observable<any>{
		let fileList: FileList = event.nativeElement.files;
	   	if(fileList.length > 0) {
	    let file: FileList = fileList;
	    let formData: FormData = new FormData();
	    for(let i =0; i < file.length; i++){
	        formData.append("imageDetail", file[i], file[i]['name']);
	    }
		return this._httpClient.post(`${this.api_product}/upload-images-detail`, formData);
		}
	}
	public uploadImage(event, type): Observable<any>{
		let fileList: FileList = event.nativeElement.files;
		// let fileList: FileList = event.target.files;
	   	if(fileList.length > 0) {
	    let file: File = fileList[0];
	    let formData:FormData = new FormData();
	    formData.append('txtImage', file, file.name);
		    if(type==='brand'){
				return this._httpClient.post(`${this.api_brand}/uploadimage`, formData);
		    }
		    else if(type==='category'){
				return this._httpClient.post(`${this.api_cate}/uploadimage`, formData);
		    }else{
				return this._httpClient.post(`${this.api_product}/uploadimage`, formData);
		    }
		}
	}
	public deleteImage(nameImage, type): Observable<any>{
		if(type==='brand'){
			return this._httpClient.get<any>(`${this.api_brand}/delete-image/${nameImage}`);
	    }
	    else if(type==='category'){
			return this._httpClient.get<any>(`${this.api_cate}/delete-image/${nameImage}`);
	    }
	    else{
			return this._httpClient.get<any>(`${this.api_product}/delete-image/${nameImage}`);
	    }
	}
}
