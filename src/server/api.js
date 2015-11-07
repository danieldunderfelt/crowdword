import mongo from 'mongodb'

const MongoClient = mongo.MongoClient
const url = 'mongodb://localhost:27017/crowdword'

class Api {

    constructor() {

    }

    exec(method, query, cb) {
        MongoClient.connect(url, (err, db) => {
            if(err) return err
            if(!this.hasOwnProperty(method)) return false

            this[method](db, query, (data) => {
                if(data === false) db.close()
                cb(data)
            })
        })
    }

    getAll(db, query = false, cb) {
        let useQuery = query ? query : undefined
        let cursor = db.collection('words').find(useQuery)

        cursor.each((err, doc) => {
            if(err) return err

            if(doc !== null) cb(doc)
            else cb(false)
        })
    }
}

export default new Api()