const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query
        const result = await ProductServices.getAllProductsFromDB(
            searchTerm as string,
        )
        res.status(200).json({
            succcess: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm} fetched successfully!`
                : 'Products fetched successfully!',
            data: result.length
                ? result
                : searchTerm
                    ? `No product available for '${searchTerm}'`
                    : 'No product available',
        })
    } catch (err: any) {
        res.status(500).json({
            succcess: false,
            message: 'Fail to get products',
            error: err.message,
        })
    }
}
















const getAllProductsFromDB = async (searchTerm: string) => {
    if (searchTerm) {
        const result = await Product.find({
            $or: [
                { name: { $regex: new RegExp(searchTerm, 'i') } },
                { category: { $regex: new RegExp(searchTerm, 'i') } },
                { description: { $regex: new RegExp(searchTerm, 'i') } },
            ],
        }).select('-__v')
        return result
    }
    const result = await Product.find().select('-__v')
    return result
}