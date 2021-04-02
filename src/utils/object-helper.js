export const updateObjectInArray = (items, itemsId, objPropName, newObjName) => {
    return items.map(u => {
        if (u[objPropName] === itemsId) {
            return { ...u, ...newObjName }
        }
        return u
    })
}
