export async function handleErrors(action) {
    try {
        return await action()
    }
    catch (err) {
        return { error: err.toString() }
    }
}