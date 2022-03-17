import mongoose from "mongoose";
import {Category} from "./models/Category.js";
import {User} from "./models/User.js";
import {Thread} from "./models/Thread.js";
import {Message} from "./models/Message.js";

const categories = [
    "ニュース", "学問", "食べ物", "趣味", "その他雑談",
];

try {
    await mongoose.connect("mongodb://localhost:27017/bbs");
    console.info("initialize database...");

    await Message.deleteMany().exec();
    console.info("All messages deleted!")

    await Thread.deleteMany().exec();
    console.info("All threads deleted!");

    await User.deleteMany().exec();
    console.info("All users deleted!");

    await Category.deleteMany().exec();
    console.info("All categories deleted!");

    await Promise.all(categories.map(((value, index) => {
        return Category.create({
            serial: index + 1,
            name: value,
        });
    })));
    const news = await Category.findOne({name: "ニュース"}).exec();
    console.info("Categories registered!!!");

    const temp = new User({username: "admin", view_name: "名無しの管理者"});
    const admin = await User.register(temp, "foobarhogepiyo");
    console.info("Default admin user registered!!!");

    const thread = await Thread.create({
        title: "ニュース テストスレ",
        category: news,
        owner: admin,
    });
    console.info("Test thread registered!!!");

    for (let i = 1; i <= 100; i++) {
        await Message.create({
            content: `コメント ${i}コメ目`,
            user: admin,
            thread: thread,
        });
    }
    console.info("Test messages registered!!!");

    console.info("seed.js completed!!!!!")
} catch (e) {
    console.error(e.message, e);
} finally {
    await mongoose.connection.close();
    process.exit(0);
}