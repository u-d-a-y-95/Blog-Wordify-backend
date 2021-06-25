const router=require('express').Router();
const BlogModel=require('../model/BlogModel')

router.get('/blogs',(req,res)=>{
    BlogModel.find()
    .then(result=>{
        let blogs=result.map(item=>{
            item.imgUrl=item.imgUrl.map(a=>{
                return `api/uploads/${a}`
            })
            return item
        })
        res.json(blogs)
    })
})

router.post('/blogs',(req,res)=>{
   let blog=new BlogModel(req.body)
   blog.save()
   .then(result=>{
       res.json(result)
   })
})

router.delete('/blogs/:id',(req,res)=>{
    BlogModel.deleteOne({_id:req.params.id})
    .then(result=>{
        res.json(result)
    })
})



module.exports=router