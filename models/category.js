class Category {
    constructor({ slug, title, description } = {}) {
        this.slug = slug
        this.title = title
        this.description = description
    }

    toJson() {
        return {
            slug: this.slug,
            title: this.title,
            description: description
        }
    }
  }

module.exports = Category