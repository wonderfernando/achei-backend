export interface IBaseRepository<T>{
    create: (data: T) => Promise<T>,
    update:(data: Partial<T>, id :string) => Promise<T|null>,
    delete:(id:string) => Promise<boolean>,
    list: () => Promise<T[]>,
    findById: (id : string) => Promise<T|null>,
}