export const usePreparedDataHub = (entities, type: string) => {
    return entities
        .sort((a, b) => type === 'track' ? b.listens - a.listens : b.favorites - a.favorites)
        .slice(0, 10)
        .map(entity => ({_id: entity._id, image: entity.image, name: entity.name, description: entity.description}))
}