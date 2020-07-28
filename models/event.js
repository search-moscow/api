class Event {
    constructor({ slug, title, description, type, filename } = {}) {
        this.slug = slug
        this.title = title
        this.description = description
        this.type = type
        this.filename = filename
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

module.exports = Event