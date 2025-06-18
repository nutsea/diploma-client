class FormatPrice {
    static roundPrice(price) {
        const remainder = price % 100

        if (remainder < 50) {
            return price - remainder
        } else {
            return price + (100 - remainder)
        }
    }

    static roundPrice2(price) {
        const remainder = price % 25

        if (remainder < 12.5) {
            return price - remainder
        } else {
            return price + (25 - remainder)
        }
    }

    static formatPrice(price) {
        return Math.ceil(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    static formatPrice2(price) {
        return Math.ceil(this.roundPrice(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    static formatPrice3(price) {
        return Math.ceil(this.roundPrice(price) / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    static formatSplitPrice(price) {
        return Math.ceil(price / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    static formatSplitPrice2(price) {
        return Math.ceil(this.roundPrice2(price))
    }

    static formatNoCeil(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    static slowShipPrice(price, course, standartShip, fee) {
        let coursePrice = Math.ceil(price / 100 * course)
        coursePrice += standartShip + fee
        return coursePrice
    }

    static fastShipPrice(price, course, expressShip, fee) {
        let coursePrice = Math.ceil(price / 100 * course)
        coursePrice += expressShip + fee
        return coursePrice
    }

    static shipPrice(price, course, ship, standartShip, expressShip, fee) {
        if (ship === 'slow') return this.slowShipPrice(price, course, standartShip, fee)
        if (ship === 'fast') return this.fastShipPrice(price, course, expressShip, fee)
    }

    static slowSplitPrice(price, course, standartShip, fee) {
        return Math.ceil(this.slowShipPrice(price, course, standartShip, fee) / 2)
    }

    static fastSplitPrice(price, course, expressShip, fee) {
        return Math.ceil(this.fastShipPrice(price, course, expressShip, fee) / 2)
    }

    static formatSlowArray(cart, course, standartShip, fee, categoriesShips) {
        let sum = 0
        let splitSum = 0
        let shipSum = 0
        let splitShipSum = 0
        cart.forEach(item => {
            if (item.ship === 'slow') {
                if (item.category === 'shoes') {
                    sum += item.price
                    splitSum += this.slowSplitPrice(item.price, course, standartShip, fee)
                    shipSum += this.slowShipPrice(item.price, course, standartShip, fee)
                    splitShipSum += this.slowShipPrice(item.price, course, standartShip, fee) / 2
                }
                if (item.category === 'clothes') {
                    sum += item.price
                    splitSum += this.slowSplitPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee)
                    shipSum += this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee)
                    splitShipSum += this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee) / 2
                }
            }
        })
        return {
            sum,
            splitSum,
            shipSum,
            splitShipSum
        }
    }

    static formatFastArray(cart, course, expressShip, fee, categoriesShips) {
        let sum = 0
        let splitSum = 0
        let shipSum = 0
        let splitShipSum = 0
        cart.forEach(item => {
            if (item.ship === 'fast') {
                if (item.category === 'shoes') {
                    sum += item.price
                    splitSum += this.slowSplitPrice(item.price, course, expressShip, fee)
                    shipSum += this.slowShipPrice(item.price, course, expressShip, fee)
                    splitShipSum += this.slowShipPrice(item.price, course, expressShip, fee) / 2
                }
                if (item.category === 'clothes') {
                    sum += item.price
                    splitSum += this.slowSplitPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee)
                    shipSum += this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee)
                    splitShipSum += this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee) / 2
                }
            }
        })
        return {
            sum,
            splitSum,
            shipSum,
            splitShipSum
        }
    }

    static formatFullArray(cart, course, standartShip, expressShip, fee, categoriesShips) {
        let sum = 0
        let splitSum = 0
        let shipSum = 0
        let splitShipSum = 0
        cart.forEach(item => {
            sum += item.price
            if (item.category === 'shoes') {
                if (item.ship === 'fast') {
                    splitSum += this.fastSplitPrice(item.price, course, expressShip, fee)
                    shipSum += this.roundPrice(this.fastShipPrice(item.price, course, expressShip, fee))
                    splitShipSum += this.fastShipPrice(item.price, course, expressShip, fee) / 2
                }
                if (item.ship === 'slow') {
                    splitSum += this.slowSplitPrice(item.price, course, standartShip, fee)
                    shipSum += this.roundPrice(this.slowShipPrice(item.price, course, standartShip, fee))
                    splitShipSum += this.slowShipPrice(item.price, course, standartShip, fee) / 2
                }
            }
            if (item.category === 'clothes') {
                if (item.ship === 'fast') {
                    splitSum += this.fastSplitPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee)
                    shipSum += this.roundPrice(this.fastShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee))
                    splitShipSum += this.fastShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).express, fee) / 2
                }
                if (item.ship === 'slow') {
                    splitSum += this.slowSplitPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee)
                    shipSum += this.roundPrice(this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee))
                    splitShipSum += this.slowShipPrice(item.price, course, categoriesShips.find(i => i.name === item.brand).standart, fee) / 2
                }
            }
        })
        return {
            sum,
            splitSum,
            shipSum,
            splitShipSum
        }
    }

    static discountPrice(price, discount) {
        if (!discount) return Math.ceil(price)
        if (price > discount) return Math.ceil(price - discount)
        else return 1
    }

    static discountSplitPrice(price, discount) {
        if (!discount) return Math.ceil(price)
        if (price > discount) return Math.ceil(price - (discount / 2))
        else return 1
    }
}

export default FormatPrice;