const ProductModel = require("../model/product.model")

const getAllProducts=async(req,res)=>{
    try {
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit)||5;
        const search=req.query.search||"";
        let sort=req.query.sort||" ";
        let category=req.query.category||"All";

        const categoryOptions=[
            "Personal Care",
            "Eyewear",
            "Covid Essentials",
            "Ayush",
            "Fitness",
            "Treatments",
            "Devices",
            "Mom & Baby",
            "Skin Care",
            "Surgical",
            "Tools & Appliances"
        ]
        category==="All"?(category=[...categoryOptions]):(category=req.query.category.split(","));
        
        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);

        let sortBy={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }else{
            sortBy[sort[0]]="asc";
        }

        const products =await ProductModel.find({title:{$regex:search,$options:'i'}})
            .where("category")
            .in([...category])
            .sort(sortBy)
            .skip(page*limit)
            .limit(limit);
        
        const total=await ProductModel.countDocuments({
            category:{$in:[...category]},
            title:{$regex:search,$options:'i'}
        })
        const response={
            status:"success",
            total,
            page:page+1,
            limit,
            products
        }
        return res.status(200).send(response)
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}
const getSingleProducts=async(req,res)=>{
    try {
        const{id}=req.params;
        const product =await ProductModel.findOne({_id:id});
        return res.status(200).send({
            status:"success",
            data:product
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}

const addNewProduct=async(req,res)=>{
    try {
        const data=req.body;
        const product = new ProductModel(data);
        await product.save();
        return res.status(200).send({
            status:"success",
            data:product
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}
const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const data= req.body;
        const updatedProduct=await ProductModel.findByIdAndUpdate(id,data,{new:true});
        return res.status(200).send({
            status:"status",
            data:updatedProduct
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}
const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).send({
            status:"success",
            msg:"Deleted successfully"
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}

module.exports={
    getAllProducts,getSingleProducts,addNewProduct,updateProduct,deleteProduct
}