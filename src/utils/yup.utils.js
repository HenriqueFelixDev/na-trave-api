export function formatErrors(exception) {
    const errorEntries = exception.inner.map(innerError => {
        const propertyName = innerError.path
        const errorMessages = innerError.errors
        
        return [ propertyName, errorMessages ]
    })
    const errors = Object.fromEntries(errorEntries)

    return errors
}