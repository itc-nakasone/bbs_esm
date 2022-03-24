const index = (req, res) => {
    res.render("home/index");
}

const threads = (req, res) => {
    res.render("home/threads");
}

export const HomeController = {
    index, threads
};