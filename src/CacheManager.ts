// @ts-ignore
import redis from '@adonisjs/redis/services/main'
import { serialize, unserialize } from "php-serialize";

export default class CacheManager {

    private  defaultConnectionName: string = 'main';
    private  connectionName: string | undefined;
    private  withConnection: boolean = false;

    public  connection(name: string): CacheManager
    {
        this.connectionName =  name;
        this.withConnection =  true;

        return this;
    }

    public async  remember(key: string, ttlInSecond: number, valueOrCallback: any){

        const data: any = await redis.connection(this.withConnection ? this.connectionName : this.defaultConnectionName).get(key);
        if( data ){

            this.changeToDefault()

            return unserialize(data)
        }

        const originalValue = typeof valueOrCallback === 'function' ? await valueOrCallback() : valueOrCallback;

        await redis.set(key, serialize(originalValue), 'EX', ttlInSecond);

        this.changeToDefault()

        return originalValue;
    }


    public async  rememberForever(key: string, valueOrCallback: any){

        const data: any = await redis.connection(this.withConnection ? this.connectionName : this.defaultConnectionName).get(key);

        if( data ){

            this.changeToDefault()

            return unserialize(data)
        }

        const originalValue = typeof valueOrCallback === 'function' ? await valueOrCallback() : valueOrCallback;

        await redis.connection(this.withConnection ? this.connectionName : this.defaultConnectionName).set(key, serialize(originalValue));


        this.changeToDefault()


        return originalValue;
    }

    private changeToDefault()
    {
        this.withConnection =  false;
    }

    public async  forget(key: string){

        await redis.connection(this.withConnection ? this.connectionName : this.defaultConnectionName).del(key);

        this.changeToDefault()

        return true;
    }

    public async  get(key: string, defaultValue: any = null){

        const data: any = await redis.connection(this.withConnection ? this.connectionName : this.defaultConnectionName).get(key);

        this.changeToDefault()

        if( data ){
            return unserialize(data)
        }

        return defaultValue;
    }

}
