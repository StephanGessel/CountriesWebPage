import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data: {
        countries: [],
        countryInfo: {
            name: null,
            population: null,
            capital: null,
            flag: null,
            region: null,
            subRegion: null,
            area: null,
            timeZone: [],
            borders: [],
            currencies: [],
            languages: []

        },
        regions: ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
        selected: 'All',
        input: '',
        dropDown: false,
        displayCard: false
    },
    methods: {
        loadData: async function(url, method = 'GET', data = null) {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                }
                let body

                if (data) {
                    headers['Content-Type'] = 'application/json'
                    body = JSON.stringify(data)
                }

                const response = await fetch(url, {
                    method,
                    headers,
                    body
                })
                return response.json()
            } catch (e) {
                console.warn('Error: ', e.message)
            }
        },
        getData: async function() {
            try {
                const res = await fetch('https://restcountries.eu/rest/v2/all')
                this.countries = await res.json()
            } catch (e) {
                console.warn('Error: ', e.message)
            }

        },
        setRegion: function (region) {
            this.selected = region
        },
        toggleDrop: function () {
            this.dropDown = !this.dropDown
        },
        openCard: function (name) {
            let country = name
            for(let i = 0; i < this.countries.length; i++) {
                if(this.countries[i].name == country) {
                    this.countryInfo.name = this.countries[i].name
                    this.countryInfo.population = this.countries[i].population
                    this.countryInfo.capital = this.countries[i].capital
                    this.countryInfo.flag = this.countries[i].flag
                    this.countryInfo.region = this.countries[i].region
                    this.countryInfo.subRegion = this.countries[i].subregion
                    this.countryInfo.area = this.countries[i].area
                    for (let j = 0; j < this.countries[i].timezones.length; j++) {
                        this.countryInfo.timeZone[j] = this.countries[i].timezones[j]
                    }
                    for (let j = 0; j < this.countries[i].borders.length; j++) {
                        this.countryInfo.borders[j] = this.countries[i].borders[j]
                    }
                    for (let j = 0; j < this.countries[i].currencies.length; j++) {
                        this.countryInfo.currencies[j] = {}
                        this.countryInfo.currencies[j].name = this.countries[i].currencies[j].name
                        this.countryInfo.currencies[j].code = this.countries[i].currencies[j].code
                    }
                    for (let j = 0; j < this.countries[i].languages.length; j++) {
                        this.countryInfo.languages[j] = this.countries[i].languages[j].name
                    }
                }
            }
            this.displayCard = true
        },
        closeCard: function () {
            this.displayCard = false
        }
    },

    async mounted() {
        await this.getData()
    }
})

