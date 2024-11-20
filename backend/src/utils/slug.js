// Assuming we have a list of existing slugs
// const existingSlugs = ['example', 'test', 'sample', 'example-001', 'example-002'];

export const createSlug  = async (name,model) => {

    const slugs = await model.find({})
    const existingSlugs = slugs.map(
        (item) => item.slug,
    )

    let slug = name.toLowerCase().replace(/\s+/g, '-');

    let count = 1;
    let newSlug = slug;

    while (existingSlugs.includes(newSlug)) {
        // Append a three-digit number to the slug
        newSlug = `${slug}-${String(count).padStart(3, '0')}`;
        count++;
    }

    // Add the new slug to the existing slugs
    existingSlugs.push(newSlug);
    // console.log("ssssssssssllllluuuuuugs",existingSlugs)
     // Outputs: 'example-003' (if 'example' already exists)

    return newSlug;
}

// // Example usage
// const newSlug = createSlug('Example');
// console.log(newSlug);