class Product {
    constructor({ slug, title, description, type, filename } = {}) {
        this.slug = slug
        this.title = title
        this.description = description
        this.type = type
        this.filename = filename
        this.phone = this.phone
        this.metro = this.metro
        
        // this.price = this.price
        
        // this.photos = this.photos
        // this.address = this.address
        // this.time = this.time
        // this.documents = this.documents
        // this.website = this.website
        
        // GEO
    }

    toJson() {
        return {
            slug: this.slug,
            title: this.title,
            description: description,
            type: type,
            filename: filename
        }
    }
  }

module.exports = Product