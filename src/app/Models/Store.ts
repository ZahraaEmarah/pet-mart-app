export class Store {
    Name!: string;
    Logo!: string;
    Branches: string[];
    open: boolean = false;

    constructor(public storeName: string, public storeLogo:string, public storeBranches: string[], public Isopen: boolean){
        this.Name = storeName;
        this.Logo = storeLogo;
        this.Branches = storeBranches;
        this.open = Isopen;
    }
}