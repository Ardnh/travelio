export class StorageUtils {

    static setItem(key: string, value: any): void {
        localStorage.setItem(key, value)
    }

    static getStringItem(key: string): string {
        const result = localStorage.getItem(key)
        return result !== null ? result : ""
    }

    static getObjItem<T>(key: string): T | null {
        const result = localStorage.getItem(key);
        if (!result) return null;

        try {
            return JSON.parse(result) as T;
        } catch (error) {
            return null;
        }
    }


    static updateItem<T>(key: string, data: T): void {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Failed to serialize and store item:', error);
        }
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static removeAll(): void {
        localStorage.clear();
    }

}