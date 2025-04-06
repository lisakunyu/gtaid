    enemy: {
        bossMultiplier: 3
        bossHpBonus: 1000
        enemy: null,
    bossActive: false,
    enemyBullets: [],
    loadImage('enemy', 'images/enemy.png');
function spawnEnemy() {
// Spawn boss enemy
    game.bossActive = true;
// Spawn special enemy
// Spawn shooter enemy
// Spawn explosive enemy
// Shooter enemy fire
function shooterEnemyFire(enemy, timestamp) {
        game.enemyBullets.push({
            x: enemy.x + enemy.width / 2 - 2.5,
            y: enemy.y + enemy.height,
        enemy.lastShot = timestamp;
        game.enemy.spawnRate *= 2;
    if (game.score >= game.nextLevelScore && !game.bossActive) {
function moveEnemy(enemy) {
    if (enemy.isBoss) {
        switch (enemy.movePattern) {
                enemy.x += enemy.direction * 3;
                enemy.y += Math.sin(enemy.x * 0.05) * 2;
                if (enemy.x <= padding) enemy.direction = 1;
                if (enemy.x >= game.canvas.width - enemy.width - padding) enemy.direction = -1;
                enemy.x += enemy.direction * 2.5;
                enemy.y += Math.cos(enemy.x * 0.03) * 1.5;
                if (enemy.x <= padding || enemy.x >= game.canvas.width - enemy.width - padding) {
                    enemy.direction *= -1;
                enemy.x += enemy.direction * 2;
                enemy.y += 0.5;
                    enemy.direction = Math.random() > 0.5 ? 1 : -1;
                if (enemy.x <= padding) enemy.direction = 1;
                if (enemy.x >= game.canvas.width - enemy.width - padding) enemy.direction = -1;
        enemy.x = Math.max(padding, Math.min(game.canvas.width - enemy.width - padding, enemy.x));
        enemy.y = Math.max(padding, Math.min(maxY, enemy.y));
    } else if (enemy.isSpecial) {
        enemy.x += enemy.direction * enemy.speed;
        enemy.y += 2;
        if (enemy.x <= 0 || enemy.x >= game.canvas.width - enemy.width) {
            enemy.direction *= -1;
    } else if (enemy.isShooter) {
        enemy.y += enemy.speed;
        shooterEnemyFire(enemy, game.gameTime);
        enemy.y += enemy.speed;
    game.enemyBullets = [];
    game.bossActive = false;
        if (!game.bossActive) spawnEnemy();
                                game.bossActive = false;
                game.enemy.spawnRate = game.originalSpawnRate;
        for (let i = game.enemyBullets.length - 1; i >= 0; i--) {
            game.enemyBullets[i].y += game.enemyBullets[i].speed;
                game.enemyBullets.splice(i, 1);
            } else if (game.enemyBullets[i].y > game.canvas.height) {
                game.enemyBullets.splice(i, 1);
            const enemy = game.enemies[i];
            moveEnemy(enemy);
                if (checkCollision(game.bullets[j], enemy)) {
                    enemy.hp -= game.bullets[j].damage;
                    if (enemy.hp <= 0) {
                        if (!enemy.isBoss && !enemy.isShooter) {
                            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.isSpecial);
                        if (enemy.isBoss) {
                            game.bossActive = false;
                            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                        } else if (enemy.isExplosive) {
                            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, true);
            if (!enemy.isBoss && enemy.y > game.canvas.height) game.enemies.splice(i, 1);
                            game.bossActive = false;
function drawHealthBar(enemy) {
    if (!enemy.isBoss && !enemy.isSpecial && !enemy.isShooter && !enemy.isExplosive) return;
    const barWidth = enemy.width;
    const healthPercent = enemy.hp / enemy.maxHp;
    game.ctx.fillRect(enemy.x, enemy.y - barHeight - 2, barWidth, barHeight);
    game.ctx.fillRect(enemy.x, enemy.y - barHeight - 2, barWidth * healthPercent, barHeight);
    game.enemies.forEach(enemy => {
        if (game.assets.enemy) {
            game.ctx.drawImage(game.assets.enemy, enemy.x, enemy.y, enemy.width, enemy.height);
            game.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        drawHealthBar(enemy);
    game.enemyBullets.forEach(bullet => {