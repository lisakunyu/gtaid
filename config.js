// Game configuration
const config = {
        lives: config.player.lives,
    nextLevelScore: config.game.levelUpScore,
    originalSpawnRate: config.enemy.spawnRate,
    game.player.x = game.canvas.width / 2 - config.player.width / 2;
    game.player.y = game.canvas.height - config.player.height - 30;
                x: game.player.x + config.player.width / 2 - config.rocket.width / 2,
                width: config.rocket.width,
                height: config.rocket.height,
                speed: config.rocket.speed,
                damage: config.rocket.damage
    if (timestamp - game.player.lastShot > config.player.fireRate) {
        const damage = game.powerUpActive ? config.bullet.damage * config.powerUp.damageBoost : config.bullet.damage;
        const speed = game.powerUpActive ? (config.bullet.speed / 5) * config.powerUp.speedBoost : config.bullet.speed / 5;
        for (let s = 0; s < config.bullet.shotCount; s++) {
            for (let i = 0; i < config.bullet.count; i++) {
                const offset = (i - (config.bullet.count - 1) / 2) * 15;
                    x: game.player.x + config.player.width / 2 - config.bullet.width / 2 + offset,
                    width: config.bullet.width,
                    height: config.bullet.height,
    if (Math.random() < config.enemy.spawnRate) {
        const hp = config.enemy.baseHp * Math.pow(2, game.level - 1);
            x: Math.random() * (game.canvas.width - config.enemy.width),
            y: -config.enemy.height,
            width: config.enemy.width,
            height: config.enemy.height,
            speed: config.enemy.minSpeed + Math.random() * (config.enemy.maxSpeed - config.enemy.minSpeed),
    const sizeMultiplier = config.enemy.bossMultiplier;
    const baseHp = (config.enemy.baseHp * Math.pow(2, game.level - 1)) + config.game.bossHpBonus;
        x: game.canvas.width / 2 - (config.enemy.width * sizeMultiplier) / 2,
        y: -config.enemy.height * sizeMultiplier,
        width: config.enemy.width * sizeMultiplier,
        height: config.enemy.height * sizeMultiplier,
    if (timestamp - game.lastSpecialSpawn >= config.specialEnemy.spawnInterval) {
            x: Math.random() * (game.canvas.width - config.specialEnemy.width),
            y: -config.specialEnemy.height,
            width: config.specialEnemy.width,
            height: config.specialEnemy.height,
            speed: config.specialEnemy.speed,
            hp: config.specialEnemy.hp,
            maxHp: config.specialEnemy.hp,
    if (Math.random() < config.shooterEnemy.spawnRate && timestamp - game.lastShooterSpawn > 5000) {
            x: Math.random() * (game.canvas.width - config.shooterEnemy.width),
            y: -config.shooterEnemy.height,
            width: config.shooterEnemy.width,
            height: config.shooterEnemy.height,
            speed: config.shooterEnemy.speed,
            hp: config.shooterEnemy.hp,
            maxHp: config.shooterEnemy.hp,
    if (Math.random() < config.explosiveEnemy.spawnRate && timestamp - game.lastExplosiveSpawn > 6000) {
            x: Math.random() * (game.canvas.width - config.explosiveEnemy.width),
            y: -config.explosiveEnemy.height,
            width: config.explosiveEnemy.width,
            height: config.explosiveEnemy.height,
            speed: config.explosiveEnemy.speed,
            hp: config.explosiveEnemy.hp,
            maxHp: config.explosiveEnemy.hp,
    if (timestamp - enemy.lastShot > config.shooterEnemy.fireRate) {
            speed: config.shooterEnemy.bulletSpeed,
            damage: config.shooterEnemy.bulletDamage
    if (timestamp - game.lastPowerUpSpawn >= config.powerUp.spawnInterval) {
            x: Math.random() * (game.canvas.width - config.powerUp.width),
            y: -config.powerUp.height,
            width: config.powerUp.width,
            height: config.powerUp.height,
            speed: config.powerUp.speed,
    if (timestamp - game.lastShieldSpawn >= config.shieldPowerUp.spawnInterval) {
            x: Math.random() * (game.canvas.width - config.shieldPowerUp.width),
            y: -config.shieldPowerUp.height,
            width: config.shieldPowerUp.width,
            height: config.shieldPowerUp.height,
            speed: config.shieldPowerUp.speed,
    if (timestamp - game.lastSpecialObjectSpawn >= config.specialObject.spawnInterval) {
            x: Math.random() * (game.canvas.width - config.specialObject.width),
            y: -config.specialObject.height,
            width: config.specialObject.width,
            height: config.specialObject.height,
            speed: config.specialObject.speed
            x: game.player.x - config.supportShip.width - 10,
            y: game.player.y + config.player.height / 2 - config.supportShip.height / 2,
            width: config.supportShip.width,
            height: config.supportShip.height,
        game.supportEndTime = timestamp + config.supportShip.duration;
    if (game.supportShip && timestamp - game.supportShip.lastShot > config.supportShip.fireRate) {
            x: game.supportShip.x + config.supportShip.width / 2 - 2.5,
            speed: config.supportShip.bulletSpeed,
            damage: config.supportShip.bulletDamage
        game.nextLevelScore += config.game.levelUpScore;
        document.getElementById('dmgValue').textContent = config.bullet.damage;
        document.getElementById('cntValue').textContent = config.bullet.count;
        document.getElementById('shotCntValue').textContent = config.bullet.shotCount;
        config.bullet.damage += 10;
        document.getElementById('dmgValue').textContent = config.bullet.damage;
    } else if (stat === 'count' && game.score >= 1000 && config.bullet.count < 3) { // Maksimal 2 kali (1+2=3)
        config.bullet.count += 1;
        document.getElementById('cntValue').textContent = config.bullet.count;
    } else if (stat === 'shotCount' && game.score >= 500 && config.bullet.shotCount < 6) { // Maksimal 5 kali (1+5=6)
        config.bullet.shotCount += 1;
        document.getElementById('shotCntValue').textContent = config.bullet.shotCount;
    game.player.lives = config.player.lives;
    game.nextLevelScore = config.game.levelUpScore;
    config.bullet.damage = 50;  // Reset ke nilai awal
    config.bullet.count = 1;    // Reset ke nilai awal
    config.bullet.shotCount = 1;// Reset ke nilai awal
        if (game.leftPressed) game.player.x = Math.max(0, game.player.x - config.player.speed);
        if (game.rightPressed) game.player.x = Math.min(game.canvas.width - config.player.width, game.player.x + config.player.speed);
                        game.player.shieldEndTime = timestamp + config.shieldPowerUp.duration;
                        game.powerUpEndTime = timestamp + config.powerUp.duration;
                    game.score += config.specialObject.points;
                game.supportShip.x = game.player.x - config.supportShip.width - 10;
                game.supportShip.y = game.player.y + config.player.height / 2 - config.supportShip.height / 2;
                            let points = game.enemies[j].isBoss ? 500 : (game.enemies[j].isSpecial ? config.specialEnemy.points : 
                                (game.enemies[j].isExplosive ? config.explosiveEnemy.points : 10));
                                    if (k !== j && Math.hypot(game.enemies[j].x - game.enemies[k].x, game.enemies[j].y - game.enemies[k].y) < config.explosiveEnemy.explosionRadius) {
                                        game.enemies[k].hp -= config.explosiveEnemy.explosionDamage;
                        let points = enemy.isBoss ? 500 : (enemy.isSpecial ? config.specialEnemy.points : 
                            (enemy.isExplosive ? config.explosiveEnemy.points : 10));
                                if (k !== i && Math.hypot(enemy.x - game.enemies[k].x, enemy.y - game.enemies[k].y) < config.explosiveEnemy.explosionRadius) {
                                    game.enemies[k].hp -= config.explosiveEnemy.explosionDamage;
                        let points = game.enemies[j].isBoss ? 500 : (game.enemies[j].isSpecial ? config.specialEnemy.points : 
                            (game.enemies[j].isExplosive ? config.explosiveEnemy.points : 10));
                                if (k !== j && Math.hypot(game.enemies[j].x - game.enemies[k].x, game.enemies[j].y - game.enemies[k].y) < config.explosiveEnemy.explosionRadius) {
                                    game.enemies[k].hp -= config.explosiveEnemy.explosionDamage;
        document.getElementById('enemyHp').textContent = config.enemy.baseHp * Math.pow(2, game.level - 1);
        document.getElementById('bulletDmg').textContent = config.bullet.damage;
        document.getElementById('bulletSpd').textContent = Math.floor(config.bullet.speed / 5);
        document.getElementById('bulletCnt').textContent = config.bullet.count;
        document.getElementById('shotCnt').textContent = config.bullet.shotCount;
        game.ctx.drawImage(game.assets.player, game.player.x, game.player.y, config.player.width, config.player.height);
        game.ctx.fillRect(game.player.x, game.player.y, config.player.width, config.player.height);
        game.ctx.strokeRect(game.player.x - 5, game.player.y - 5, config.player.width + 10, config.player.height + 10);
            game.ctx.drawImage(game.assets.bullet, bullet.x, bullet.y, config.bullet.width, config.bullet.height);
        game.ctx.fillStyle = config.bullet.color;
            game.ctx.fillRect(bullet.x, bullet.y, config.bullet.width, config.bullet.height);
            game.ctx.drawImage(game.assets.rocket, rocket.x, rocket.y, config.rocket.width, config.rocket.height);
            game.ctx.fillStyle = config.rocket.color;
            game.ctx.fillRect(rocket.x, rocket.y, config.rocket.width, config.rocket.height);
            game.ctx.fillStyle = enemy.isBoss ? '#FF0' : (enemy.isSpecial ? config.specialEnemy.color : 
                (enemy.isExplosive ? config.explosiveEnemy.color : '#F44336'));
                game.ctx.fillStyle = config.shieldPowerUp.color;
                game.ctx.fillStyle = config.powerUp.color;
    game.ctx.fillStyle = config.shooterEnemy.bulletColor;