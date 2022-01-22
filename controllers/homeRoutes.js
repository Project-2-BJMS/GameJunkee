
const router = require('express').Router();
const { Post, User, Comment, Game } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Game,
                },
            ],
            order: [
                ['date_created', 'DESC'],
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }))
        // console.log(posts)
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in

        })
        console.log(posts)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/menu', (req, res) => {
    res.render('menu', {
        logged_in: req.session.user_id

    })
})

router.get('/gamesearch', isAuth, (req, res) => {
    // const gameData = await Game.findAll({})
    // const games = gameData.map((game) => game.get({ plain: true }))
    // console.log(games)

    res.render('gamesearch', {
        logged_in: req.session.user_id
    })
})


router.get('/gameget', async (req, res) => {
    try {
        const gameData = await Game.findAll(req.params.title, {
            where: {
                title: req.params.title
            }
        })
        console.log(gameData, "HARRO")
        if (!gameData) {
            res.status(404).json({ message: 'No game found with that title!' });
            return
        }
        res.status(200).json(gameData)

    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/gameresult', (req, res) => {
//     res.render('gameresult')
// })

router.get('/profile', isAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Game }],
        });

        const user = userData.get({ plain: true })

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/:id', isAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Game,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        })

        const post = postData.get({ plain: true })

        res.render('post', {
            ...post,
            logged_in: true,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/profile', isAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Game }],
//         });

//         const user = userData.get({ plain: true })

//         res.render('profile', {
//             ...user,
//             logged_in: true
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get('/createpost/:id', isAuth, async (req, res) => {
    try {
        const gameData = await Game.findByPk(req.params.id);

        const game = gameData.get({ plain: true })

        res.render('makepost', {
            ...game,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/junkyard', isAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Game,
                    where: {
                        user_id: req.session.user_id
                    }
                }
            ],
        });

        const user = userData.get({ plain: true })

        res.render('junkyard', {
            ...user,
            logged_in: req.session.user_id
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/profile-posts', isAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Post,
                    include: [{
                        model: Game,
                    }]
             }
            ],
        });

        const user = userData.get({ plain: true })

        res.render('userposts', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('login')
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;














