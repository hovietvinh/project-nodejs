const Product = require("../../models/Product.model");

// [GET] /products
module.exports.index= async (req,res)=>{
    const products = await Product.find({
        status:"active",
        deleted:"false"
    }).sort({position:"desc"});
    const newProducts=products.map(item =>{
        item.priceNew= (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render("client/pages/products/index",{title:"trang san pham",products:newProducts});
};

// [GET] /products/:slug
module.exports.detail=  async (req,res)=>{


    try{
        const slug = req.params.slug;
        const find = {
            slug:slug,
            deleted:false,
            status:"active"
        };
        const product = await Product.find(find); 
        console.log(product);
        const title = product[0].title
        res.render("client/pages/products/detail",{
            title:title,
            product:product[0]
        })
    }catch(e){
        res.redirect(`/products`)
    }
    
};