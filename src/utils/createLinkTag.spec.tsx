import { createLink } from './createLinkTag'

describe('createLinkTag', () => {
    it('should render a Facebook Icon link', () => {
        const link = createLink('Facebook', 'https://facebook.com', true)

        if (link) {
            expect(link.type).toBe('a')
            expect(link.props['href']).toBe('https://facebook.com')
            expect(link.props['target']).toBe('_blank')
            expect(link.props['rel']).toBe('noopener noreferrer')

            // Icon
            expect(link.props.children.props.icon.iconName).toBe('facebook')
        }
    })

    it('should render a LinkedIn Icon link', () => {
        const link = createLink('LinkedIn', 'https://linkedin.com', true)

        if (link) {
            expect(link.type).toBe('a')
            expect(link.props['href']).toBe('https://linkedin.com')
            expect(link.props['target']).toBe('_blank')
            expect(link.props['rel']).toBe('noopener noreferrer')

            // Icon
            expect(link.props.children.props.icon.iconName).toBe('linkedin-in')
        }
    })

    it('should render a Mail Icon link', () => {
        const link = createLink('Mail', 'mailto:info@test.com')

        if (link) {
            expect(link.type).toBe('a')
            expect(link.props['href']).toBe('mailto:info@test.com')
            expect(link.props['rel']).not.toBeDefined()
            expect(link.props['target']).not.toBeDefined()

            // Icon
            expect(link.props.children.props.icon.iconName).toBe('envelope')
        }
    })

    it('should render a Phone Icon link', () => {
        const link = createLink('Phone', 'tel:+0123456789')

        if (link) {
            expect(link.type).toBe('a')
            expect(link.props['href']).toBe('tel:+0123456789')
            expect(link.props['rel']).not.toBeDefined()
            expect(link.props['target']).not.toBeDefined()

            // Icon
            expect(link.props.children.props.icon.iconName).toBe('phone')
        }
    })

    it('should render null if no icons match', () => {
        const link = createLink('ET Phone Home', 'ABC 123')

        if (link) {
            expect(link).toBeNull()
        }
    })
})
