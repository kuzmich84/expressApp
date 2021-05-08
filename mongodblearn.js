db.users.bulkWrite([
    {
        insertOne: {
            "document": {name: "Mike", age: 45, email: "test@mail.com"}
        }
    },
    {
        insertOne: {
            "document": {name: "Sam", age: 54, email: "sam@mail.com"}
        }
    },
    {
        deleteOne: {
            filter: {age: 20}
        }
    },
    {
        updateOne: {
            filter: {name:"Mike"},
            update: {$set:{email:"new_email@test.ru"}}
        }
    },
    {
        replaceOne: {
            filter: {name:"John"},
            replacement: {name: "Джон"}
        }
    }
]);

db.articles.insertMany([
    {
        title: "Акции компании растут",
        anons: "Компании стремительно набирают обороты",
        text: "Рост акций ро всем фронтам",
        date: new Date('2020-11-11')
    },
    {
        title: "Открытие кофейни",
        anons: "Новая кофейня была открыта в городе Чишки",
        text: "Все жителя города празднуют этот день!",
        date: new Date('2020-11-10')
    },
    {
        title: "Новости города",
        anons: "Подставки для компьютера",
        text: "Новые подставки для ПК были завезены в магазин",
        date: new Date('2020-11-11')
    },
])

db.articles.createIndex({title: "text", anons:"text", text:"text"})

db.articles.find({$text:{$search:"жители"}})