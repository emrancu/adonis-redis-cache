# AdonisJS Redis Cache

This package provides a Redis caching mechanism for AdonisJS applications using TypeScript. It allows you to set, get, and manage cache entries easily.

## Features

- **Connection Switching:** Supports switching between different Redis connections.
- **Cache Remember:** Caches data for a specified duration.
- **Cache Remember Forever:** Caches data indefinitely until manually deleted.
- **Cache Forget:** Removes cache entries.

## Installation

Install the package via npm or yarn:

```sh
npm install adonis-redis-cache
```

## Usage

```javascript
import Cache from 'adonis-redis-cache';

 
  await Cache.connection('custom');
  
// Cache data for 60 seconds
  const data = await Cache.remember('key', 60, async () => {
    return await method();
  });
//  OR
const data = await Cache.remember('key', 60, "any value");


 
const data = await Cache.rememberForever('key', async () => {
    return await anymethod();
});
//  OR
const data = await Cache.rememberForever('key', "any value");


await Cache.get('key', defalutValue);

await Cache.connection('main').get('key', defalutValue);

await Cache.forget('key');

const data = await Cache.connection('main').rememberForever('key', 'any value');
 

```




