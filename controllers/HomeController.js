class HomeController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static index(req, res) {
        res.render("home/index");
    }

    /**
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static threads(req, res) {
        res.render("home/threads");
    }
}

export {HomeController};