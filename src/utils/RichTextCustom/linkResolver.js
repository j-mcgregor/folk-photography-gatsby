export const linkResolver = doc => {
    if (doc.type === 'page') {
        return `/${doc.uid}`
    }

    if (doc.type === 'blog_post') {
        return `/blog/${doc.uid}`
    }

    return '/'
}
