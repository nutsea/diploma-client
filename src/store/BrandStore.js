import { makeAutoObservable } from 'mobx'

export default class BrandStore {
    constructor() {
        this._brand = ''
        this._model = ''
        this._search = ''
        makeAutoObservable(this)
    }

    async setBrand(brand) {
        this._brand = brand
    }

    async setModel(model) {
        this._model = model
    }

    async setSearch(search) {
        this._search = search
    }

    get brand() {
        return this._brand
    }

    get model() {
        return this._model
    }

    get search() {
        return this._search
    }
}