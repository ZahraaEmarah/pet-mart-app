export class Store {
    Name!: string;
    Logo!: string;
    Branches: string[];

    constructor(public storeName: string, public storeLogo:string, public storeBranches: string[]){
        this.Name = storeName;
        this.Logo = storeLogo;
        this.Branches = storeBranches;
    }
}