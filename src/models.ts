export interface IEnterprisesProducts {
    name: string
    desc: string
    price: number
    img: string
}

export interface IEnterprises {
    id?: number
    companyName: string
    desc: string
    leaderName : string
    years: number
    products: Array<IEnterprisesProducts>
}