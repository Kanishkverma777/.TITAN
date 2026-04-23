const Membership = require('../Modals/membership');

exports.addMembership = async (req,res)=>{
    try{
        const {months, price} = req.body;
        const memberShip = await Membership.findOne({gym:req.gym._id,months});
        if(memberShip){
            return res.status(409).json({error: "Membership with these months already exists"});
        }else{
            const nuwMembership = new Membership({price,months,gym:req.gym._id});
            await nuwMembership.save();
            res.status(201).json({message: "Membership added successfully", membership: nuwMembership});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.getmembership=async(req,res)=>{
    try{
        const loggedInId = req.gym._id;
        const memberships = await Membership.find({gym: loggedInId});
        res.status(200).json({memberships});

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}

exports.deleteMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const membership = await Membership.findOneAndDelete({ _id: id, gym: req.gym._id });
        if (!membership) {
            return res.status(404).json({ error: "Plan not found or unauthorized" });
        }
        res.status(200).json({ message: "Membership plan removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
}