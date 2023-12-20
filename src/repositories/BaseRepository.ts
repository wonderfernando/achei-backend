export interface IBaseRepository<T>{
    create: (data: T) => Promise<T>,
    update:(data:T, id :string) => Promise<T|null>,
    delete:(id:string) => boolean,
    list: () => Promise<T[]>,
    findById: (id : string) => Promise<T|null>,
}