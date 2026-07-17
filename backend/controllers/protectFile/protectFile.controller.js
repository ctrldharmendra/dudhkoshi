const asyncHandler = require("../../utils/asyncHandler");



const path = require("path");
const fs = require("fs");
const getFile = asyncHandler(async (req, res) => {

    const filePath = req.params.path.join("/");

    // console.log(filePath, "file path");


    const absolutePath = path.join(
        process.cwd(),
        "uploads",
        filePath
    );


    // console.log(absolutePath, "abs path");

    // check if user hhas permission to access this file 



    if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({
            message: "File not found"
        });
    }


    return res.sendFile(absolutePath);
});


module.exports = {
    getFile,
};


module.exports = {
    getFile,
};
module.exports = {
    getFile,
}