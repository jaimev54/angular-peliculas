import { HttpParams } from "@angular/common/http";

export  function construirQueryParams(objeto: any): HttpParams{
    let queryParams = new HttpParams();

    for(const propiedad in objeto){
        if(objeto.hasOwnProperty(propiedad)){
            queryParams = queryParams.append(propiedad, String(objeto[propiedad]));
        }   
    }
    return queryParams;
}