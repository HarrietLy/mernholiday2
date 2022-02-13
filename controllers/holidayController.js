const express = require("express")
const Holiday = require("../models/holidaysModel")
const router = express.Router()

//seed
router.get("/seed", async (req,res)=>{
    const seedHolidays =[
        {
            name: "Deepavali",
            celebrated: true,
            description:
              "Diwali is a festival of lights and one of the major festivals celebrated by Hindus, Jains, and Sikhs.",
            tags: ["festival", "celebration"],
          },
          {
            name: "Chinese New Year",
            celebrated: true,
            description:
              "Chinese New Year, also known as the Lunar New Year, is the festival that celebrates the beginning of a new year on the traditional lunisolar and solar Chinese calendar.",
            tags: ["oranges", "celebration"],
          },
          {
            name: "Hari Raya Puasa",
            celebrated: true,
            description:
              "Eid al-Fitr, is the earlier of the two official holidays celebrated within Islam. The religious holiday is celebrated by Muslims worldwide because it marks the end of the month-long dawn-to-sunset fasting of Ramadan.",
            tags: ["religious", "end of fast"],
          },
          {
            name: "St. Patrick's day",
            celebrated: false,
            description:
              "Saint Patrick's Day, or the Feast of Saint Patrick, is a cultural and religious celebration held on 17 March, the traditional death date of Saint Patrick, the foremost patron saint of Ireland.",
            tags: ["irish", "green"],
          },
    ]
    try {
        await Holiday.deleteMany({})
        const createdHolidays = await Holiday.create(seedHolidays)
        res.status(200).json({status:"ok", message:"holiday seeded", data:createdHolidays})
    } catch (error) {
        res.status(400).json({status:"not ok", error: error})
    }
})


router.get('/', async (req,res)=>{
    try {
        const allHolidays = await Holiday.find({})
        res.status(200).json({status:"ok", message:"all holidays fetched", data:allHolidays})
    } catch (error) {
        res.status(400).json({status:"not ok", error: error})
    }
})


router.post("/", async (req, res) => {
    const newHoliday = req.body;
    if (!newHoliday) {
      res.status(400).json({
        status: "not ok",
        message: "please add details for your holiday",
      });
    }
    try {
      const createdHoliday = await Holiday.create(newHoliday);
      res.status(200).json({
        status: "ok",
        message: "create holidays route is working",
        data: createdHoliday,
      });
    } catch (error) {
      console.log(error);
    }
  });


router.get('/:holidayID', async(req,res)=>{
    const {holidayID} = req.params
    try {
        const foundHoliday = await Holiday.findById(holidayID)
        res.status(200).json({status:"ok", message:"holiday found", data:foundHoliday})
    } catch (error) {
        console.log(error)
    }
})

// router.put()
router.put('/:holidayID', async(req,res)=>{
    const newHoliday = req.body
    const {holidayID} = req.params
    try {
        const updatedHoliday = await Holiday.findByIdAndUpdate(holidayID, newHoliday,{new:true})
        res.status(200).json({status:"ok", message:"holiday found", data:updatedHoliday})
    } catch (error) {
        console.log(error)
    }
})

// router.delete()
router.delete("/:holidayID", async(req,res)=>{
    const {holidayID} = req.params
    try {
        const deletedHoliday = await Holiday.findByIdAndDelete(holidayID)
        res.status(200).json({
            status: "ok",
            message: "delete individual holiday route is working",
            data: deletedHoliday
        })
    } catch (error) {
        res.json({error: error})
    }
})
module.exports = router