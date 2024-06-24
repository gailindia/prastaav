export class Take {
    Serviceid?:string;
    S_Name?: string;
    Gender?:string;
    Age?:string;
    Profession?:string;
    Pincode?:string;
    State?:string;
    City?:string;
    Area?:string;
    Group?:string;
    GenderS?:string;
    AgeS?:string;
    Experience?:string;
    SpecialNote?:string;
    DocLink?:string;
    VideoLink?:string;
    LocationLink?:string;
    AnySpecialGroup?:string;
    Category?:string;
    Charges_paid?:number;
    MobileNo?:string;
    visibility?:boolean;
    }

    export class services{
        Sector?:String;
        Service?:String;
        Category?:String;
        CodeName?:String;
        ChargePerDay? : Number;
    }

    export class GetCart{
        Serviceid?:String;
        Category?:String;
        Charges?:number;
        S_Name?:String;
        Gender?:String;
        State?: String;
        City?:String;
        Area?:String;
        Pincode?:String;
        AcceptStatus? :String;
        RejectStatus?:String;
    }