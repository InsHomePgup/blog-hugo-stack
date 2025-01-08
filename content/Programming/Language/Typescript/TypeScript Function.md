```ts
function funA(numA:number,strA:string,booA:boolean):void{  
  
}  
  
function funB(numA:number):Promise<number>{  
    return new Promise((resolve,reject)=>{  
        resolve(numA);  
    })}

interface sumFunc{  
    (numA:number,strA:string,booA:boolean):void  
}
```