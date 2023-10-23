const express = require("express");
const axios = require('axios');
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
cloudinary.config({
    cloud_name: "dmnlh52x4",
    api_key: "985118155375649",
    api_secret: "9me_XvHe7SjYDa9m1mqS6ROmW28",
});
const upload = multer({ dest: "uploads/" });


app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render("index");
});
const blogFilePath = path.join(__dirname, 'db/blog.json');
fs.readFile(blogFilePath, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const blogData = JSON.parse(data);

});

app.get("/blog", (req, res) => {
    const blogFilePath = path.join(__dirname, 'db/blog.json');
    fs.readFile(blogFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Blog verileri okunurken bir hata oluştu.');
            return;
        }

        const blogData = JSON.parse(data);

        res.render("blog", { blogData });
    });
});


app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/social", (req, res) => {
    res.render("social");
});
app.get("/share", (req, res) => {
    res.render("share");
});




app.post('/paylas', upload.single('blogImage'), (req, res) => {
    const blogData = req.body;
    const imagePath = req.file.path;

    cloudinary.uploader.upload(imagePath, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Resim Cloudinary\'ye yüklenirken bir hata oluştu.');
            return;
        }

        const publicId = result.public_id;
        const imageUrl = result.secure_url;

        blogData.image = imageUrl;

        const blogFilePath = path.join(__dirname, 'db/blog.json');

        fs.readFile(blogFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Blog verileri okunurken bir hata oluştu.');
                return;
            }

            let existingData = JSON.parse(data);

            existingData.push(blogData);

            fs.writeFile(blogFilePath, JSON.stringify(existingData, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Blog verileri yazılırken bir hata oluştu.');
                    return;
                }

                res.status(200).send('Blog başarıyla paylaşıldı.');
            });
        });
    });
});


const blogComments = {};

app.post('/blog/:blogTitle/comment', (req, res) => {
    const blogTitle = req.params.blogTitle;
    const { author, content } = req.body;

    const comment = { author, content, date: new Date() };

    const blogFilePath = path.join(__dirname, 'db/blog.json');
    fs.readFile(blogFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Blog verileri okunurken bir hata oluştu.');
            return;
        }
        const blogData = JSON.parse(data);

        const requestedBlog = blogData.find(blog => blog.blogTitle === blogTitle);
        if (!requestedBlog) {
            res.status(404).send('Blog bulunamadı');
            return;
        }

        if (!requestedBlog.comments) {
            requestedBlog.comments = [];
        }
        requestedBlog.comments.push(comment);


        fs.writeFile(blogFilePath, JSON.stringify(blogData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Yorum eklenirken bir hata oluştu.');
                return;
            }


            res.redirect(`/blog/${blogTitle}`);
        });
    });
});

app.get('/blog/:blogTitle', (req, res) => {
    const blogTitle = req.params.blogTitle;
    const blogFilePath = path.join(__dirname, 'db/blog.json');
    fs.readFile(blogFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Blog verileri okunurken bir hata oluştu.');
            return;
        }
        const blogData = JSON.parse(data);
        const requestedBlog = blogData.find(blog => blog.blogTitle === blogTitle);
        if (!requestedBlog) {
            res.status(404).send('Blog bulunamadı');
            return;
        }
        const comments = blogComments[blogTitle] || [];

        res.render('showblog', { blog: requestedBlog, comments });
    });
});

app.listen(port, () => {
    console.log(`Kişisel Blog Sitesi ${port} Adresinde Aktif 🟢`);
});

// TEST

app.get("/lg", (req, res) => {
    res.render("include/loading");
});