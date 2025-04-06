    bullet: {
        bulletSpeed: 3,
        bulletDamage: 1,
        bulletColor: '#FF00FF',
        bulletDamage: 30,
        bulletSpeed: 8,
        bullet: null,
    bullets: [],
    loadImage('bullet', 'images/bullet.png');
                game.bullets.push({
    game.bullets = [];
        for (let i = game.bullets.length - 1; i >= 0; i--) {
            game.bullets[i].y -= game.bullets[i].speed;
            if (game.bullets[i].y < 0) game.bullets.splice(i, 1);
            for (let j = game.bullets.length - 1; j >= 0; j--) {
                if (checkCollision(game.bullets[j], powerUp)) {
                    game.bullets.splice(j, 1);
            for (let j = game.bullets.length - 1; j >= 0; j--) {
                if (checkCollision(game.bullets[j], obj)) {
                    game.bullets.splice(j, 1);
            for (let j = game.bullets.length - 1; j >= 0; j--) {
                    game.bullets.splice(j, 1);
    if (game.assets.bullet) {
        game.bullets.forEach(bullet => {
        game.bullets.forEach(bullet => {
    game.supportBullets.forEach(bullet => {
        game.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        game.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);