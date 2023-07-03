export const usePreparedData = (entities, type: string) => {
    return entities
        .sort((a, b) => type === 'track' ? b.listens - a.listens : b.favorites - a.favorites)
        .slice(0, 5)
        .map(entity => ({image: entity.image, name: entity.name, description: entity.description}))
}