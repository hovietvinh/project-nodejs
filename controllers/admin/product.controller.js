const Product = require("../../models/Product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const systemsConfig = require("../../config/systems")

// [GET] /admin/products
module.exports.index = async (req,res)=>{

    // FILTERSTATUS 
    const filterStatus = filterStatusHelper(req,res);

    let find ={
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status
    }

    // SEARCH 
    const search = searchHelper(req);
    if(search.regex){
        find.title = search.regex
    }

    // SORT
    let sort={}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    }



    // PAGINATION
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper({
        limitItems:4,
        currentPage:1
    }, req,countProducts);

    const products = await Product.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
   
    const newProducts=products.map(item =>{
        item.priceNew= (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render("admin/pages/products/index",{
        title:"trang danh sach san pham",
        products:newProducts,
        filterStatus:filterStatus,
        keyword:search.keyword,
        pagination : objectPagination
    });
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id},{status:status});
    req.flash('success', 'cập nhật trạng thái thành công');
    res.redirect("back");
}

//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req,res)=>{
    const type =req.body.type;
    const ids =req.body.ids.split(", ");
    switch(type){
        case "active":
            await Product.updateMany({_id:{$in :ids}},{status:"active"})
            req.flash("success",`cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "inactive":
            await Product.updateMany({_id:{$in :ids}},{status:"inactive"})
            req.flash("success",`cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "deleted" :
            await Product.updateMany({_id:{$in:ids}},{deleted:"true",deletedAt:new Date()});
            req.flash("success",`xóa thành công ${ids.length} sản phẩm`)
            break;
        case "change-position":   
            for(const item of ids){
                const [id,position] = item.split("-");
                await Product.updateOne({_id:id},{position:position})
            } 
            req.flash("success",`đổi vị trí sản phẩm thành công`)

            break;
    }

    console.log(req.body);
    res.redirect("back");   
}


// [DELETE] /admin/products/delete/:id
module.exports.deleteItem =async (req,res)=>{
    const id = req.params.id;
    await Product.updateOne({_id:id},{deleted:true,deletedAt:new Date()});
    req.flash("success",`xóa sản phẩm thành công`)

    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = (req,res)=>{
    res.render("admin/pages/products/create",{
        title:"Thêm mới sản phẩm"
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req,res)=>{
    

    
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);

    if(req.body.position==""){
        const countProduct = await Product.find({deleted:false}).count();
        req.body.position = countProduct +1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }

    
    
    const product = new Product(req.body);
    await product.save()
    
    
    
    res.redirect(`${systemsConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req,res)=>{
    try{
        const find = {
            deleted: false,
            _id : req.params.id
        };
        const product = await Product.findOne(find);
        res.render("admin/pages/products/edit",{
            title:"chỉnh sửa sản phẩm",
            product:product
        });
    }catch(error){
        req.redirect(`${systemsConfig.prefixAdmin}/products`)
    }

}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);

    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    
    try{
        await Product.updateOne({ _id:id}, req.body);
        req.flash("success","cập nhật thành công");
    }catch(err){
        req.flash("error","cập nhật thất bại");

    }

    res.redirect("back");

}


// [GET] /admin/products/detail/:id
module.exports.detail =async (req,res)=>{
    try{
        const id = req.params.id;
        const find = {
            _id:id,
            deleted:false
        };
        const product = await Product.find(find); 
        const title = product[0].title
        res.render("admin/pages/products/detail",{
            title:title,
            product:product[0]
        })
    }catch(e){
        res.redirect(`${systemsConfig.prefixAdmin}/products`)
    }
    
}