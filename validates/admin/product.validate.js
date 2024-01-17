module.exports.createPost = (req,res,next)=>{
    if(!req.body.title){
        req.flash("error",`vui lòng nhập tiêu đề`);
        res.redirect("back");
        return;
    }
    if(req.body.title.length<8){
        req.flash("error",`tiêu đề có ít nhất 8 kí tự` );
        res.redirect("back");
        return;
    }
    next();

}