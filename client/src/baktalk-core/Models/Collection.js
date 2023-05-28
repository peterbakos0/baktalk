import emojiUnicodes from '../constants/emoji-unicodes';

class Collection extends Array {
    constructor(...args) {
        super(...args);

        this.save = this.save.bind(this);
        this.saveMany = this.saveMany.bind(this);
        this.find = this.find.bind(this);
        this.findOne = this.findOne.bind(this);
        this.findById = this.findById.bind(this);
        this.count = this.count.bind(this);
        this.exists = this.exists.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.removeById = this.removeById.bind(this);
        this.removeManyByIds = this.removeManyByIds.bind(this);
    }

    save(doc) {
        this.removeById(doc._id);
        this.push(doc);

        return doc;
    }

    saveMany(docs) {
        for(var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            this.save(doc);
        }

        return docs;
    }

    find(filter) {
        var keys = Object.keys(filter);

        var docs = Array.from(this).filter((doc) => {
            for(var i = 0; i < keys.length; i++) {
                var key = keys[i];

                var docValue = doc[key];
                var filterValue = filter[key];

                if((typeof filterValue === 'object') && (filterValue !== null)) {
                    if('$ne' in filterValue) {
                        if(docValue === filterValue.$ne) { return false; }
                    }

                    if('$in' in filterValue) {
                        var docValueIncludes = docValue.includes(filterValue.$in);
                        if(!docValueIncludes) { return false; }
                    }
                }
                else {
                    if(docValue !== filterValue) { return false; }
                }
            }

            return true;
        });

        docs.sort((doc1, doc2) => {
            var value1;
            var value2;

            if(doc1.emojiUnicode && doc2.emojiUnicode && (value1 === value2)) {
                value1 = emojiUnicodes.indexOf(doc1.emojiUnicode);
                value2 = emojiUnicodes.indexOf(doc2.emojiUnicode);
            }

            if(doc1.date && doc2.date && (value1 === value2)) {
                value1 = new Date(doc2.date);
                value2 = new Date(doc1.date);
            }

            if(value1 === value2) {
                value1 = parseInt(doc1._id, 16);
                value2 = parseInt(doc2._id, 16);
            }

            return (value1 - value2);
        });

        return docs;
    }

    findOne(filter) {
        var [doc] = this.find(filter);
        return (doc || null);
    }

    findById(id) {
        return this.findOne({
            _id: id
        });
    }

    count(filter) {
        var docs = this.find(filter);
        return docs.length;
    }

    exists(filter) {
        var doc = this.findOne(filter);
        return Boolean(doc);
    }

    removeOne(filter) {
        var doc = this.findOne(filter);
        if(!doc) { return null; }

        var docIndex = this.indexOf(doc);
        this.splice(docIndex, 1);

        return doc;
    }

    removeById(id) {
        return this.removeOne({
            _id: id
        });
    }

    removeManyByIds(ids) {
        for(var i = 0; i < ids.length; i++) {
            var id = ids[i];
            this.removeById(id);
        }
    }
}

export default Collection;
