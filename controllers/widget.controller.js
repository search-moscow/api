class WidgetController {

    static async index(req, res) {
        var datetime = new Date();
        console.log(datetime);
        // try {
        //     let response  = await RestaurantDAO.search(req.query.text)
        //     res.json(response)
        // } catch (error) {
        //     res.status(500).json(error);
        // }
    }

}

module.exports = WidgetController;