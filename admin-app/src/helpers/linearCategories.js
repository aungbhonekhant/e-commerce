const lineatCategories = (categories, options = []) => {
    for (let category of categories) {
        // if (category.level !== 3) {
        //     options.push({ value: category._id, name: category.name, parentId: category.parentId });
        // }

        options.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
            level: category.level,
            type: category.type
        });

        if (category.children.length > 0) {
            lineatCategories(category.children, options);
        }
    }
    return options;
};

export default lineatCategories;