new Vue({
    el: '#el',
    data() {
        return {
            _id: null,
            name: null,
            price: null,
            visible: true,
            search: "",
            products: []
        }
    },
    mounted() {
        const time = new Date().getTime();
        const products = [
            {
                _id: time,
                name: 'Lorem ipsum',
                price: 'Lorem ipsum',
                visible: true
            },
            {
                _id: time + 1,
                name: 'dolor',
                price: 'dolor',
                visible: true
            }
        ];

        this.setItem(products)
    },
    methods: {
        add(e) {
            const { _id, name, price, visible} = this;
            if (!name || !price) {
                alert('Kindly complete all fields.');
                e.preventDefault()
                return
            }
            const products = this.getItem()
            const key = products.findIndex(product => product._id === _id)
            if (key >= 0) {
                products[key] = {_id, name, price, visible}
            } else {
                products.push({
                    _id: new Date().getTime(),
                    name,
                    price,
                    visible
                })
            }
            this._id = null
            this.name = null
            this.price = null

            this.setItem(products)
            e.preventDefault()
        },
        edit(e, id) {
            const products = this.getItem()
            products.map(product => {
                if (product._id === id) {
                    this._id = id
                    this.name = product.name
                    this.price = product.price
                }
            })
            e.preventDefault()
        },
        remove(e, id) {
            let products = this.getItem();
            const key = products.findIndex(product => product._id === id)
            if (key >= 0) {
                delete products[key]
                products = products.filter(() => { return true })
                this.setItem(products)
            }

            e.preventDefault()
        },
        setItem(products, key = 'products') {
            this.products = products
            localStorage.setItem(key, JSON.stringify(products))
        },
        getItem(key = 'products') {
            return JSON.parse(localStorage.getItem(key))
        }
    },
    watch: {
        'search'(value) {
            const products = this.getItem()
            const pattern = new RegExp(value.replace(/\*/g, '.*') + '.*', 'i');
            const filteredProducts = products.map(product => {
                product.visible = (pattern.test(product.id) || pattern.test(product.name) || pattern.test(product.price))
                return product;
            })


            this.setItem(filteredProducts)
        }
    }
})
