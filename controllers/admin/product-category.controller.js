const ProductCategory = require("../../models/product-category.model");
const systemsConfig = require("../../config/systems");
const createTreeHelper =  require("../../helpers/createTree")

// [GET] /admin/products-category 
module.exports.index = async (req,res)=>{
    let find = {
        deleted:false
    }
    

    

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    // console.log(newRecords);
    // console.log(records);
    res.render("admin/pages/products-category/index",{
        title: "Danh muc san pham",
        records: newRecords
    })
}

// [GET] /admin/products-category/create
module.exports.create = async (req,res)=>{

    let find = {
        deleted:false
    }

    


    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    // console.log(newRecords);

    
    res.render("admin/pages/products-category/create",{
        title: "Tao danh muc",
        records : newRecords
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req,res)=>{
    // console.log(req.body);

    if(req.body.position ==''){
        const count = await ProductCategory.find({deleted:false}).count();
        req.body.position = count+1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }

    const record =  new ProductCategory(req.body);
    await record.save();

    req.flash('success', 'thêm danh mục thành công');
    res.redirect(`${systemsConfig.prefixAdmin}/products-category`);
    // res.render("admin/pages/products-category/create",{
    //     title: "Tao danh muc"
    // })
}

