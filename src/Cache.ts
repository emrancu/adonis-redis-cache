import CacheManager from "./CacheManager";

export default class Cache {

    private static instance: CacheManager|null = null;

    public static getInstance(): CacheManager
    {
        if(!this.instance){
            this.instance =  new CacheManager
        }

        return this.instance
    }


    public static connection(name: string): CacheManager
    {
        this.getInstance().connection(name)

        return this.getInstance()
    }

    public static async  remember(key: string, ttlInSecond: number, valueOrCallback: any){
        return  this.getInstance().remember(key, ttlInSecond, valueOrCallback)
    }


    public static async  rememberForever(key: string, valueOrCallback: any){
        return  this.getInstance().rememberForever(key, valueOrCallback)
    }

    public static async  forget(key: string){
        return  this.getInstance().forget(key)
    }

    public static async  get(key: string, defaultValue: any = null){
        return  this.getInstance().get(key, defaultValue)
    }

}
