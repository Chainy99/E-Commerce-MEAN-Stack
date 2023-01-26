var express = require('express');
const flash = require('express-flash');
var router = express.Router()
var User = require('../models/user')
var Medicine = require('../models/medicine')
var Feedback = require('../models/feedback')
var Order = require('../models/order')
var multer = require('multer')
const jwt = require('jsonwebtoken')


router.get('/check', verifyToken, (req, res, next) => {
    res.json({ msg: "All ok" })
})


router.get('/getalluser', verifyToken, (req, res, next) => {
    User.find({ role: "customer" }, (err, users) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ msg: users })
    })
})

// admin side block user
router.delete("/blockuser/:id", verifyToken, (req, res, next) => {
    // console.log(req.params.id);
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: true }, function (err, user) {
        console.log(1);
        if (err) {
            console.log(err)
            res.status(500).json({ errmsg: err })
        }
        else {
            console.log("Blocked user");
            return res.status(201).json(user);
        }
    })

    // res.status(200).json({ msg: "ok" })
})

// admin side unblockuser
router.delete("/unblockuser/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    // console.log(req.params.id);
    User.updateOne({ _id: id }, { blocked: false }, function (err, user) {
        console.log(1);
        if (err) {
            console.log(err)
            res.status(500).json({ errmsg: err })
        }
        else {
            console.log("unblocked user");
            return res.status(201).json(user);
        }
    })
})
// admin side delete user
router.delete("/deleteuser/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    console.log(req.params.id);
    User.deleteOne({ _id: id }, (err) => {
        if (err)
            console.log("err in delete by admin");
    })
    res.status(200).json({ msg: "yes deleted user by admin" })
})





// addmedicine image

function getTime() {
    var today = new Date().toLocaleDateString()
    today = today.toString().replace('/', '-')
    today = today.replace('/', '-')

    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    today += '-' + h + '-' + m + '-' + s

    return today;
}
var storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, 'C:\\Users\\Chainy\\Desktop\\fullstack_project\\frontend\\src\\assets\\medicine')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage })


// addmedicine data
router.post("/addmedicine", verifyToken, upload.single('file'), (req, res, next) => {
    var file = req.file
    var medicine = new Medicine({
        medicinename: req.body.medicinename,
        medicinevolume: req.body.medicinevolume,
        medicineprice: req.body.medicineprice,
        medicineimage: file.filename
    })
    try {
        doc = medicine.save();
        console.log("Added a medicine");
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
})

router.get('/getallmedicine', verifyToken, (req, res, next) => {
    Medicine.find({}, (err, medicines) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ msg: medicines })
    })
})



router.delete("/deletemedicine/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    console.log(req.params.id);
    Medicine.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log("err  in medicine delete by admin");
        }
    })
    res.status(200).json({ msg: "yes deleted medicine by admin" })
})



// edit medicine with image
router.post("/editmedicinewithimage", verifyToken, upload.single('file'), (req, res, next) => {
    var file = req.file
    Medicine.updateOne({ _id: req.body.id }, {
        medicinename: req.body.medicinename,
        medicinevolume: req.body.medicinevolume,
        medicineprice: req.body.medicineprice,
        medicineimage: file.filename
    }, function (err, medicine) {
        console.log(1);
        if (err) {
            console.log(err)
            res.status(500).json({ errmsg: err })
        }
        else {
            console.log("Edited a medicine with image");
            return res.status(201).json(medicine);
        }
    })

})

// edit medicine without image
router.get("/editmedicinewithoutimage", verifyToken, (req, res, next) => {
    Medicine.updateOne({ _id: req.query.id }, {
        medicinename: req.query.medicinename,
        medicinevolume: req.query.medicinevolume,
        medicineprice: req.query.medicineprice
    }, function (err, medicine) {

        if (err) {
            console.log(err)
            res.status(500).json({ errmsg: err })
        }
        else {
            console.log("Edited medicine without image");
            return res.status(201).json(medicine);
        }
    })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    req.userId = payload.subject
    next()
}


router.get('/getallfeedbback', verifyToken, (req, res, next) => {
    Feedback.find({}, (err, feedbacks) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ msg: feedbacks })
    })
})



router.delete("/deletefeedback/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    // console.log(req.params.id);
    Feedback.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log("err in delete by admin");
            res.json({ msg: err })
        }
    })
    res.status(200).json({ msg: "yes deleted feedback by admin" })
})




router.get('/getallorder', verifyToken, (req, res, next) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ msg: orders })
    })
})

router.delete("/deleteorder/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    Order.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log("err in orderr delete by admin");
            res.json({ msg: err })
        }
    })
    res.status(200).json({ msg: "yes deleted order by admin" })
})



router.delete("/getonecartitem/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    Order.find({ _id: id }, (err, order) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        res.send(order)
    })
})

router.delete("/getonecartitemuser/:id", verifyToken, (req, res, next) => {
    var id = req.params.id
    console.log("yes in backend");
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            res.status(401).json.send({error:err})
       
        }
        else
        {
            res.status(200).json({ user: user })
        }
    })
})


module.exports = router