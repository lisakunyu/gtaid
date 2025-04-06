    player: {
        lives: 3
        player: null,
    player: {
    loadImage('player', 'images/player.png');
                y: game.player.y,
                    y: game.player.y - (s * 30),
        game.player.lastShot = timestamp;
    game.player.hasShield = false;
    document.getElementById('livesDisplay').textContent = `Lives: ${game.player.lives}`;
                        game.player.hasShield = true;
        if (game.player.hasShield && timestamp >= game.player.shieldEndTime) game.player.hasShield = false;
            if (checkCollision(game.enemyBullets[i], game.player)) {
                if (!game.player.hasShield) {
                    game.player.lives -= game.enemyBullets[i].damage;
                    document.getElementById('livesDisplay').textContent = `Lives: ${game.player.lives}`;
                    if (game.player.lives <= 0) {
            if (checkCollision(game.player, enemy) && !enemy.isBoss && !game.player.hasShield) {
                game.player.lives--;
                document.getElementById('livesDisplay').textContent = `Lives: ${game.player.lives}`;
                if (game.player.lives <= 0) {
    if (game.assets.player) {
    if (game.player.hasShield) {