import {registerServices} from './registerServices';

class ServiceNotFound extends Error {
    serviceKey: string;
    constructor(serviceKey: string) {
        super(`Service ${serviceKey} could not be located`);
        this.serviceKey = serviceKey;

        Object.setPrototypeOf(this, ServiceNotFound.prototype);
    }
}

class ServiceLocator {
    services: Map<string, any>;

    constructor() {
        this.services = new Map<string, any>();
    }

    register(key: string, value: any) {
        this.services.set(key, value);
    }

    get(key: string) {
        const service = this.services.get(key);
        if(!service) {
            throw new ServiceNotFound(key);
        }
        return service;
    }
}

export {ServiceNotFound, ServiceLocator, registerServices}