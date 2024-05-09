const slugify = (slugStr: string) => {
    const [lang, ...slug] = slugStr.split('/')
    return {
        lang: lang,
        slug: slug.join('/')
    }
}

const getPostUrl = (slug: string) => {
    const slugified = slugify(slug)
    return '/'+slugified.lang+'/post/'+slugified.slug+'/'
}

export { slugify, getPostUrl }